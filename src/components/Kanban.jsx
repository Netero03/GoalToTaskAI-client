import React, { useEffect, useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  pointerWithin,
  DragOverlay,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal"; 
import { useDroppable } from "@dnd-kit/core";
import {
  bulkReorder,
  fetchProject,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from "../services/goalService";
import useStore from "../store/useStore";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import useConfirm from "../hooks/useConfirm.jsx";

const COLUMNS = ["todo", "inprogress", "done"];

function DroppableColumn({ id, children }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="bg-slate-50 p-3 rounded min-h-[400px]">
      {children}
    </div>
  );
}

export default function Kanban({ project, onUpdateProject }) {
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeTask, setActiveTask] = useState(null);
  const [board, setBoard] = useState({});
  const { updateProject } = useStore();
  const { confirmDialog, ConfirmModal } = useConfirm();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitial, setModalInitial] = useState({});
  const [modalDefaultStatus, setModalDefaultStatus] = useState("todo");

  // INIT BOARD
  useEffect(() => {
    const next = { todo: [], inprogress: [], done: [] };

    (project.tasks || []).forEach((task) => {
      next[task.status || "todo"].push(task);
    });

    COLUMNS.forEach((col) =>
      next[col].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    );

    setBoard(next);
  }, [project]);

  // DRAG START
  const handleDragStart = (event) => {
    const { active } = event;

    const id = active.id;
    for (const col of COLUMNS) {
      const found = board[col].find((t) => t._id === id);
      if (found) {
        setActiveTask(found);
        break;
      }
    }
  };

  // DRAG END
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    setActiveTask(null);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // find source column
    const sourceColumn = COLUMNS.find((col) =>
      board[col].some((t) => t._id === activeId)
    );

    // determine target column
    let targetColumn = null;

    if (overId.startsWith("column-")) {
      targetColumn = overId.replace("column-", "");
    } else {
      targetColumn = COLUMNS.find((col) =>
        board[col].some((t) => t._id === overId)
      );
    }

    if (!sourceColumn || !targetColumn) return;

    if (sourceColumn === targetColumn && overId === activeId) return;

    const updated = {
      todo: [...board.todo],
      inprogress: [...board.inprogress],
      done: [...board.done],
    };

    // remove from source
    const srcList = updated[sourceColumn];
    const srcIndex = srcList.findIndex((t) => t._id === activeId);
    const [movedTask] = srcList.splice(srcIndex, 1);

    // insert into target
    const targetList = updated[targetColumn];
    let insertIndex = targetList.length;

    if (!overId.startsWith("column-")) {
      const overIndex = targetList.findIndex((t) => t._id === overId);
      insertIndex = overIndex >= 0 ? overIndex : targetList.length;
    }

    movedTask.status = targetColumn;
    targetList.splice(insertIndex, 0, movedTask);

    setBoard(updated);

    // build reorder payload
    const orders = [];
    COLUMNS.forEach((col) => {
      updated[col].forEach((t, idx) => {
        orders.push({ taskId: t._id, order: idx, status: col });
      });
    });

    try {
      await bulkReorder({ projectId: project._id, orders });
      const refreshed = await fetchProject(project._id);
      updateProject(refreshed);
      onUpdateProject(refreshed);
    } catch {
      toast.error("Failed to save order");
    }
  };

  // -------------------------------
  // CREATE TASK
  // -------------------------------
  const handleOpenCreate = (col) => {
    setModalInitial({});
    setModalDefaultStatus(col);
    setModalOpen(true);
  };

  async function handleCreateTask(values) {
    try {
      const body = {
        projectId: project._id,
        ...values,
      };
      await apiCreateTask(body);

      const refreshed = await fetchProject(project._id);
      updateProject(refreshed);
      onUpdateProject(refreshed);

      toast.success("Task created");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to create task");
      throw err;
    }
  }

  // -------------------------------
  // EDIT TASK
  // -------------------------------
  const handleOpenEdit = (task) => {
    setModalInitial(task);
    setModalDefaultStatus(task.status || "todo");
    setModalOpen(true);
  };

  async function handleUpdateTask(taskId, values) {
    try {
      await apiUpdateTask(taskId, values);

      const refreshed = await fetchProject(project._id);
      updateProject(refreshed);
      onUpdateProject(refreshed);

      toast.success("Task updated");
    } catch (err) {
      toast.error("Failed to update task");
      throw err;
    }
  }

  // -------------------------------
  // DELETE TASK
  // -------------------------------
  async function handleDeleteTask(task) {
  const ok = await confirmDialog({
    title: "Delete Task?",
    message: `Are you sure you want to delete "${task.title}"?`
  });

  if (!ok) return;

  try {
    await apiDeleteTask(task._id);
    const refreshed = await fetchProject(project._id);
    updateProject(refreshed);
    onUpdateProject(refreshed);
    toast.success("Task deleted");
  } catch {
    toast.error("Failed to delete task");
  }
}

  // SAVE FROM MODAL (CREATE or UPDATE)
  async function handleSave(values) {
    if (modalInitial && modalInitial._id) {
      await handleUpdateTask(modalInitial._id, values);
    } else {
      await handleCreateTask({ ...values, status: modalDefaultStatus });
    }
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COLUMNS.map((col) => (
            <DroppableColumn key={col} id={`column-${col}`}>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium capitalize">
                  {col === "todo"
                    ? "To Do"
                    : col === "inprogress"
                    ? "In Progress"
                    : "Done"}
                </h4>

                {/* ➕ Add Task */}
                <button
                  onClick={() => handleOpenCreate(col)}
                  className="p-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  <Plus size={14} />
                </button>
              </div>

              <SortableContext
                items={board[col]?.map((t) => t._id) || []}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2 min-h-[50px]">
                  {(board[col] || []).map((task) => (
                    <TaskCard
                      key={task._id}
                      id={task._id}
                      task={task}
                      onEdit={() => handleOpenEdit(task)}
                      onDelete={() => handleDeleteTask(task)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DroppableColumn>
          ))}
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeTask ? (
            <div className="opacity-80">
              <TaskCard task={activeTask} id={activeTask._id} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Task Modal */}
      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initial={modalInitial}
        defaultStatus={modalDefaultStatus}
        onSave={handleSave}
      />
      {ConfirmModal}
    </>
  );
}
