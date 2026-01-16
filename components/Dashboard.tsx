import React, { useState } from 'react';
import { TrendingUp, Clock, Target, ShieldCheck, Zap, Heart, RefreshCw, Quote } from 'lucide-react';
import { MOCK_BUDGETS } from '../constants';
import { generateInspirationalQuote } from '../services/geminiService';
import { AppSection } from '../types';
import { useTasks } from '../hooks/useTasks';

interface DashboardProps {
  setActiveSection: (section: AppSection) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveSection }) => {
  const [quote, setQuote] = useState("La fortuna favorece a los valientes. - Virgilio");
  const [loadingQuote, setLoadingQuote] = useState(false);

  // Persistent Tasks
  const { tasks, loading: loadingTasks } = useTasks();

  const handleNewQuote = async () => {
    setLoadingQuote(true);
    const newQuote = await generateInspirationalQuote();
    setQuote(newQuote);
    setLoadingQuote(false);
  };

  const totalSpent = MOCK_BUDGETS.reduce((acc, curr) => acc + curr.spent, 0);
  const totalLimit = MOCK_BUDGETS.reduce((acc, curr) => acc + curr.limit, 0);
  const taskCompletion = tasks.length > 0 ? (tasks.filter(t => t.status === 'Completada').length / tasks.length) * 100 : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Status del Sistema</h2>
          <p className="text-slate-500 mt-1">Control de superusuario activo para Lima, Perú.</p>
        </div>
        <div className="text-sm font-bold bg-white dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-2 shadow-sm">
          <Clock size={16} className="text-indigo-500" />
          <span>{new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Presupuesto Mensual" value={`S/. ${totalSpent}`} subtitle={`de S/. ${totalLimit}`} progress={(totalSpent / totalLimit) * 100} color="indigo" icon={TrendingUp} onClick={() => setActiveSection(AppSection.Finance)} />
        <StatCard title="Eficiencia de Tareas" value={`${Math.round(taskCompletion)}%`} subtitle="Rendimiento Global" progress={taskCompletion} color="blue" icon={Target} onClick={() => setActiveSection(AppSection.Schedule)} />
        <StatCard title="Racha Habitual" value="5 días" subtitle="Dedicación focalizada" progress={85} color="emerald" icon={Zap} onClick={() => setActiveSection(AppSection.Habits)} />
        <StatCard title="Estado Ético" value="9.2/10" subtitle="Consistencia Admin" progress={92} color="rose" icon={ShieldCheck} onClick={() => setActiveSection(AppSection.Values)} />
      </div>

      {/* Inspirational Quote Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl group">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Quote size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
              <Zap size={18} />
              <h3 className="text-xs font-black uppercase tracking-widest">Rincón del Pensador</h3>
            </div>
            <p className={`text-xl md:text-2xl font-serif italic leading-relaxed transition-opacity duration-500 ${loadingQuote ? 'opacity-50' : 'opacity-100'}`}>
              "{quote}"
            </p>
          </div>
          <button
            onClick={handleNewQuote}
            disabled={loadingQuote}
            className="shrink-0 flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-xs uppercase transition-all backdrop-blur-sm"
          >
            <RefreshCw size={16} className={loadingQuote ? 'animate-spin' : ''} />
            Nueva Sabiduría
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center justify-between text-slate-900 dark:text-white">
                Línea de Tiempo
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">{tasks.length} ACTIVAS</span>
              </h3>
              <div className="space-y-3">
                {loadingTasks ? (
                  <div className="text-center py-4 text-xs text-slate-400">Cargando tareas...</div>
                ) : tasks.slice(0, 3).map(task => (
                  <div key={task.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className={`w-2 h-2 rounded-full ${task.status === 'Completada' ? 'bg-emerald-500' : 'bg-slate-900 dark:bg-slate-400'}`} />
                    <div className="flex-1">
                      <p className={`text-sm font-bold ${task.status === 'Completada' ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-slate-100'}`}>{task.title}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{task.dueDate}</p>
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && !loadingTasks && (
                  <div className="text-center py-4 text-slate-400 text-xs">No hay tareas pendientes</div>
                )}
              </div>
            </div>
            <div className="bg-slate-900 dark:bg-black text-white rounded-3xl p-6 border border-slate-800 shadow-xl overflow-hidden relative group">
              <div className="relative z-10">
                <h3 className="font-bold mb-2">Monitor de Proyectos</h3>
                <p className="text-xs text-slate-400 mb-6">Operando con recursos ilimitados</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-1 uppercase tracking-widest text-indigo-300">
                      <span>LIFE OS CORE</span>
                      <span>90%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400 w-[90%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-1 uppercase tracking-widest text-emerald-300">
                      <span>FINANZAS PERSONALES</span>
                      <span>40%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[40%]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <ShieldCheck size={120} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Flujo de Soles (S/.)</h3>
            <div className="space-y-5">
              {MOCK_BUDGETS.slice(0, 3).map(budget => (
                <div key={budget.category}>
                  <div className="flex justify-between text-xs mb-2 font-bold uppercase tracking-tight">
                    <span className="text-slate-500 dark:text-slate-400">{budget.category}</span>
                    <span className="text-slate-900 dark:text-white">S/. {budget.spent} / {budget.limit}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${budget.spent / budget.limit > 0.9 ? 'bg-rose-500' : 'bg-slate-900 dark:bg-indigo-500'}`}
                      style={{ width: `${Math.min(100, (budget.spent / budget.limit) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => setActiveSection(AppSection.Finance)}
                className="w-full py-3 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 dark:shadow-none uppercase tracking-widest"
              >
                CENTRO DE FINANZAS
              </button>
            </div>
          </div>

          <div className="bg-indigo-600 text-white rounded-3xl p-6 shadow-xl shadow-indigo-100 dark:shadow-none relative overflow-hidden group cursor-pointer" onClick={() => setActiveSection(AppSection.Values)}>
            <div className="relative z-10">
              <ShieldCheck className="mb-4 text-white" size={32} />
              <h3 className="font-black text-lg mb-2 uppercase tracking-tight">Núcleo Ético</h3>
              <p className="text-indigo-100 text-xs mb-6 leading-relaxed font-medium">Sincronización de valores pendiente. ¿Ejecutar auditoría de comportamiento?</p>
              <button className="px-6 py-2 bg-white text-indigo-700 font-bold text-xs rounded-xl hover:shadow-2xl transition-all uppercase tracking-widest">
                AUDITAR
              </button>
            </div>
            <div className="absolute -bottom-8 -right-8 opacity-20 transform rotate-12 group-hover:scale-110 transition-transform">
              <Heart size={160} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, progress, color, icon: Icon, onClick }: any) => {
  const colors: any = {
    indigo: 'bg-indigo-500',
    blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
    rose: 'bg-rose-500',
  };

  return (
    <div onClick={onClick} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-slate-900 dark:hover:border-indigo-400 hover:shadow-xl transition-all cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-slate-900 dark:group-hover:bg-indigo-600 group-hover:text-white transition-all`}>
          <Icon size={24} />
        </div>
        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-black text-xs">
          <TrendingUp size={14} />
          <span>OPTIMAL</span>
        </div>
      </div>
      <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{title}</h4>
      <p className="text-2xl font-black mt-1 text-slate-900 dark:text-white">{value}</p>
      <p className="text-[10px] text-slate-400 mt-1 font-bold">{subtitle}</p>
      <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${colors[color]} rounded-full transition-all duration-1000`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default Dashboard;
