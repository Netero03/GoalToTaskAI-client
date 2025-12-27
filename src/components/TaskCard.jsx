import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Edit } from "lucide-react";

export default function TaskCard({ id, task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const stopAll = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-3 rounded shadow-sm border cursor-grab active:cursor-grabbing select-none"
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-between items-start gap-3">

        <div className="flex-1">
          <div className="font-semibold">{task.title}</div>
          <div className="text-xs text-slate-500">{task.description}</div>
          <div className="text-xs mt-2 text-slate-400">
            Est: {task.estimatedHours || 0}h • {task.priority}
          </div>
        </div>

        <div className="flex flex-col gap-1 ml-2">

          <button
            title="Edit"
            className="p-1 rounded bg-slate-200 hover:bg-slate-100"
            onPointerDownCapture={stopAll}   
            onClick={(e) => {
              stopAll(e);                   
              onEdit?.(task);
            }}
          >
            <Edit size={16} />
          </button>

          <button
            title="Delete"
            className="p-1 rounded bg-slate-200 hover:bg-slate-100"
            onPointerDownCapture={stopAll}   
            onClick={(e) => {
              stopAll(e);                   
              onDelete?.(task);
            }}
          >
            <Trash2 size={16} />
          </button>

        </div>
      </div>
    </div>
  );
}
