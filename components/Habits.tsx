import React, { useState } from 'react';
import { useHabits } from '../hooks/useData';
import { Flame, CheckCircle2, Circle, Trash2, TrendingUp, Info, Plus, X } from 'lucide-react';

const Habits: React.FC = () => {
  const { habits, loading, addHabit, toggleDay, deleteHabit } = useHabits();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');

  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const fullWeekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const handleToggleDay = (habitId: string, dayIndex: number, currentCompleted: boolean[]) => {
    toggleDay(habitId, dayIndex, currentCompleted);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    addHabit(newHabitName);
    setNewHabitName('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Construcción de Hábitos</h2>
          <p className="text-slate-500 mt-1">La consistencia es la clave del cambio duradero.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
          <Plus size={20} />
          <span>Nuevo Hábito</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {loading && <div className="text-center py-10 text-slate-400">Cargando hábitos...</div>}

          {!loading && habits.map(habit => (
            <div key={habit.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-indigo-100 group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${habit.streak > 3 ? 'bg-orange-100 text-orange-600' : 'bg-indigo-100 text-indigo-600'}`}>
                    {habit.streak > 3 ? <Flame size={24} /> : <CheckCircle2 size={24} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{habit.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-orange-500">RACHA DE {habit.streak} DÍAS</span>
                      <span className="text-xs font-medium text-slate-400">• Meta: {habit.targetDays} días</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="p-2 text-slate-300 hover:text-rose-500 rounded-full hover:bg-rose-50 transition-colors"
                  title="Eliminar Hábito"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {habit.completed.map((done, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase hidden sm:block">{fullWeekDays[i]}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase sm:hidden">{weekDays[i]}</span>
                    <button
                      onClick={() => handleToggleDay(habit.id, i, habit.completed)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${done ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100 scale-110' : 'bg-slate-50 text-slate-300 border border-slate-200 hover:border-emerald-300 hover:bg-white'}`}
                    >
                      {done ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                    +12
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-medium italic">¡Únete a otros 15 en este hábito!</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Consistencia Global</h3>
            <p className="text-5xl font-black text-slate-900 mb-2">
              {habits.length > 0 ? Math.round((habits.reduce((acc, h) => acc + h.completed.filter(Boolean).length, 0) / (habits.length * 7)) * 100) : 0}%
            </p>
            <p className="text-sm text-slate-400 font-medium px-4 leading-relaxed">Tu consistencia es clave. ¡Mantén el ritmo!</p>
            <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Activos</p>
                <p className="text-xl font-bold text-slate-900">{habits.length}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Archivados</p>
                <p className="text-xl font-bold text-slate-900">0</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Fallidos</p>
                <p className="text-xl font-bold text-slate-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-indigo-400 mb-3">
                <Info size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Tip Científico</span>
              </div>
              <h4 className="font-bold mb-3 leading-snug">La Regla de los 2 Minutos</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Si un hábito toma menos de dos minutos, empiézalo de inmediato. La parte más difícil suele ser simplemente comenzar.
              </p>
              <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-all">
                Leer Artículo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Nuevo Hábito */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Nuevo Hábito</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nombre del Hábito</label>
                <input
                  type="text"
                  required
                  value={newHabitName}
                  onChange={e => setNewHabitName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="Ej: Leer 30 minutos"
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                  Crear Hábito
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Habits;
