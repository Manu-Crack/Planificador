import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Mail, CheckCircle2, MoreHorizontal, Plus, Link as LinkIcon, X, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';

const Schedule: React.FC = () => {
  // Use persistent tasks from hook
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks();

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Jan 2026 default
  const [selectedDay, setSelectedDay] = useState<number>(19);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'Media', dueDate: '2026-01-20' });

  // Calendar Logic
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const monthName = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 is Sunday

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTask(newTask.title, newTask.dueDate, newTask.priority);
    setIsModalOpen(false);
    setNewTask({ title: '', priority: 'Media', dueDate: '2026-01-20' });
  };

  return (
    <div className="space-y-8 relative animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Agenda y Tiempo</h2>
          <p className="text-slate-500 mt-1">Sincronizado con Google Calendar y notificaciones de Gmail.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <LinkIcon size={18} />
            <span className="hidden sm:inline">Sincronizar Calendario</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all"
          >
            <Plus size={20} />
            <span>Nueva Tarea</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Lado Izquierdo: Mini Vista Calendario Dinámico */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold capitalize text-slate-900 dark:text-white">
                {monthName}
              </h3>
              <div className="flex gap-1">
                <button onClick={prevMonth} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  <ChevronLeft size={20} className="text-slate-400" />
                </button>
                <button onClick={nextMonth} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  <ChevronRight size={20} className="text-slate-400" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">
              <span>D</span><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {/* Espaciadores para dias vacios al inicio */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Dias del mes */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDay === day;
                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`aspect-square flex items-center justify-center rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 
                      ${isSelected
                        ? 'bg-indigo-600 text-white shadow-md scale-110'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-500/20 rounded-3xl p-6">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 mb-3">
              <Mail size={18} />
              <h4 className="font-bold text-sm">Integración Gmail</h4>
            </div>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 leading-relaxed mb-4">
              Tienes 3 correos sin leer con posibles tareas de acción.
            </p>
            <div className="space-y-2">
              <div className="bg-white dark:bg-slate-900 p-2 rounded-lg shadow-sm border border-indigo-100 dark:border-indigo-500/20 flex items-center gap-3">
                <div className="w-1 h-6 bg-orange-400 rounded-full" />
                <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300 truncate">Feedback Proyecto - CEO</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2 rounded-lg shadow-sm border border-indigo-100 dark:border-indigo-500/20 flex items-center gap-3">
                <div className="w-1 h-6 bg-indigo-400 rounded-full" />
                <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300 truncate">Renovación de Suscripción</span>
              </div>
            </div>
          </div>
        </div>

        {/* Centro: Lista Principal de Tareas */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white">Tareas Activas</h3>
              <div className="flex gap-2">
                <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700">TODAS</span>
                <span className="text-xs font-bold px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-md cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/30">TRABAJO</span>
                <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700">PERSONAL</span>
              </div>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <div className="p-8 text-center text-slate-400 text-sm animate-pulse">Sincronizando tareas desde la nube...</div>
              ) : tasks.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">No hay tareas activas.</div>
              ) : (
                tasks.map(task => (
                  <div key={task.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors gap-4">
                    <div className="flex items-start gap-4 cursor-pointer flex-1" onClick={() => toggleTask(task.id, task.status)}>
                      <button
                        className={`shrink-0 mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 
                          ${task.status === 'Completada'
                            ? 'bg-emerald-500 border-emerald-500 text-white scale-110'
                            : 'border-slate-300 dark:border-slate-600 text-transparent hover:border-indigo-400'}`}
                      >
                        <CheckCircle2 size={14} />
                      </button>
                      <div>
                        <h4 className={`font-bold transition-all duration-300 select-none ${task.status === 'Completada' ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-slate-100'}`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                            <CalendarIcon size={12} />
                            {task.dueDate}
                          </span>
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${task.priority === 'Alta' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}`}>
                            {task.priority}
                          </span>
                          {task.source === 'Calendar' && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-500">
                              <Clock size={12} />
                              Sincronizado
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                        title="Eliminar tarea"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex justify-center border-t border-slate-100 dark:border-slate-800">
              <button className="text-sm font-bold text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Cargar tareas completadas anteriores
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 dark:bg-black text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">Sesión de Enfoque</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">Mejora tu productividad usando un ciclo Pomodoro de 25/5.</p>
                <button className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all">
                  Iniciar Temporizador
                </button>
              </div>
              <div className="absolute top-0 right-0 p-4 text-indigo-800 opacity-20">
                <Clock size={100} />
              </div>
            </div>

            <div className="bg-emerald-600 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">Resumen Semanal</h3>
                <p className="text-emerald-100 text-sm mb-6 leading-relaxed">Has completado 18 tareas esta semana. ¡Es un 15% más que la semana pasada!</p>
                <button className="px-6 py-2.5 bg-white text-emerald-700 font-bold rounded-xl shadow-lg transition-all">
                  Ver Reporte
                </button>
              </div>
              <div className="absolute bottom-0 right-0 p-4 text-emerald-800 opacity-20">
                <TrendingUpIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Nueva Tarea */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md p-6 space-y-6 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nueva Tarea</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Título</label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="Ej: Revisar presupuesto"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={newTask.dueDate}
                    onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Prioridad</label>
                  <select
                    value={newTask.priority}
                    onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  >
                    <option>Alta</option>
                    <option>Media</option>
                    <option>Baja</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
                  Crear Tarea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const TrendingUpIcon = () => (
  <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 7l-8.5 8.5L9 11l-7 7" />
    <path d="M16 7h6v6" />
  </svg>
);

export default Schedule;
