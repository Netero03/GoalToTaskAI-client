import React, { useState } from 'react';
import GoalForm from '../components/GoalForm';
import ProjectList from '../components/ProjectList';
import Kanban from '../components/Kanban';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [activeProject, setActiveProject] = useState(null);
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-background)" }}>
      <Navbar />
      <header className="max-w-8xl mx-auto mb-6 px-6 pt-6">
        <h1 className="text-3xl font-semibold" style={{ color: "var(--color-text)" }}>
          GoalToTasks - AI Planner
        </h1>
        <p className="text-sm" style={{ color: "var(--color-textSecondary)" }}>
          Describe a goal, generate tasks with Gemini, and manage on Kanban.
        </p>
      </header>

      <main className="max-w-8xl mx-auto grid gap-6 md:grid-cols-3 px-6 pb-6">
        <section className="md:col-span-1 space-y-4">
          <div className="p-4 rounded-lg border" style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-soft)" }}>
            <GoalForm onGenerated={(aiProject) => {
              setActiveProject(aiProject);
            }} />
          </div>

          <div className="p-4 rounded-lg border" style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-soft)" }}>
            <ProjectList onOpen={(project) => setActiveProject(project)} />
          </div>
        </section>

        <section className="md:col-span-2 ">
          <div className="p-4 rounded-lg border min-h-[500px]" style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-soft)" }}>
            {activeProject ? (
              <Kanban project={activeProject} onUpdateProject={setActiveProject} />
            ) : (
              <div className="text-center py-20" style={{ color: "var(--color-textSecondary)" }}>
                Open a goal from left or generate one using the form.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
