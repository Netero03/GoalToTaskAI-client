import React, { useState } from 'react';
import GoalForm from '../components/GoalForm';
import ProjectList from '../components/ProjectList';
import Kanban from '../components/Kanban';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [activeProject, setActiveProject] = useState(null);
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <header className="max-w-8xl mx-auto mb-6 px-6 pt-6">
        <h1 className="text-3xl font-semibold">GoalToTasks — AI Project Planner</h1>
        <p className="text-sm text-slate-600">Describe a goal, generate tasks with Gemini, and manage on Kanban.</p>
      </header>

      <main className="max-w-8xl mx-auto grid gap-6 md:grid-cols-3 px-6 pb-6">
        <section className="md:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <GoalForm onGenerated={(aiProject) => {
              setActiveProject(aiProject);
            }} />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <ProjectList onOpen={(project) => setActiveProject(project)} />
          </div>
        </section>

        <section className="md:col-span-2 ">
          <div className="bg-white p-4 rounded-lg shadow min-h-[500px]">
            {activeProject ? (
              <Kanban project={activeProject} onUpdateProject={setActiveProject} />
            ) : (
              <div className="text-center text-slate-500 py-20">
                Open a project from left or generate one using the form.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
