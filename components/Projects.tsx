import React, { useState } from 'react';
import { useProjects } from '../hooks/useData';
import { Briefcase, ChevronRight, Plus, Target, Layers, ArrowUpRight, X, Trash2 } from 'lucide-react';

const Projects: React.FC = () => {
  const { projects, loading, addProject, deleteProject } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectCategory, setNewProjectCategory] = useState('Desarrollo');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    addProject(newProjectName, newProjectCategory);
    setNewProjectName('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Motor de Proyectos</h2>
          <p className="text-slate-500 mt-1">Gestiona grandes metas y divídelas en hitos accionables.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2">
          <Plus size={20} />
          <span>Crear Proyecto</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && <div className="col-span-3 text-center py-10 text-slate-400">Cargando proyectos...</div>}

        {!loading && projects.map(project => (
          <div key={project.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity`}>
              {project.category === 'Desarrollo' ? <Layers size={120} /> : <Target size={120} />}
            </div>

            <div className="flex justify-between items-start mb-6">
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${project.status === 'Completado' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                {project.status}
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                  <ArrowUpRight size={18} />
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                  title="Eliminar Proyecto"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{project.name}</h3>
            <p className="text-sm text-slate-400 font-medium mb-8">Categoría: {project.category}</p>

            <div className="space-y-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs font-bold text-slate-400">PROGRESO</span>
                <span className="text-sm font-black text-slate-900">{project.progress}%</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${project.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
              <div className="flex items-center gap-2">
                <Briefcase size={14} />
                <span>8 Hitos</span>
              </div>
              <div className="flex items-center gap-1 group-hover:text-indigo-600 transition-colors cursor-pointer">
                <span>VER DETALLES</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        ))}

        <div onClick={() => setIsModalOpen(true)} className="bg-slate-50 rounded-3xl p-6 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-indigo-300 hover:bg-white transition-all min-h-[300px]">
          <div className="w-16 h-16 bg-white border border-slate-100 shadow-sm rounded-full flex items-center justify-center text-slate-400 mb-4 group-hover:scale-110 transition-transform">
            <Plus size={32} />
          </div>
          <h3 className="font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">Iniciar nuevo proyecto</h3>
          <p className="text-xs text-slate-400 mt-2 px-8">Define tu visión y divídela en pasos accionables.</p>
        </div>
      </div>

      {/* Modal Nuevo Proyecto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Nuevo Proyecto</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nombre del Proyecto</label>
                <input
                  type="text"
                  required
                  value={newProjectName}
                  onChange={e => setNewProjectName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="Ej: Aprender Python"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Categoría</label>
                <select
                  value={newProjectCategory}
                  onChange={e => setNewProjectCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                >
                  <option value="Desarrollo">Desarrollo</option>
                  <option value="Finanzas">Finanzas</option>
                  <option value="Salud">Salud</option>
                  <option value="Aprendizaje">Aprendizaje</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                  Lanzar Proyecto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
