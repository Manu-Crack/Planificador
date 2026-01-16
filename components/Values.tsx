
import React, { useState } from 'react';
import { Heart, ShieldCheck, Star, MessageSquare, Plus, ArrowRight, X } from 'lucide-react';
import { VALUE_PILLARS } from '../constants';

const Values: React.FC = () => {
  const [activeReflections, setActiveReflections] = useState([
    { id: '1', value: 'Consistencia', score: 8, text: 'Logré programar todos los días de esta semana hasta ahora.' },
    { id: '2', value: 'Paciencia', score: 4, text: 'Perdí la calma durante la reunión de hoy. Debo trabajar en mi respiración.' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newRef, setNewRef] = useState({ value: VALUE_PILLARS[0], score: 5, text: '' });

  const handleAddReflection = () => {
    if (!newRef.text) return;
    const item = {
      id: Date.now().toString(),
      ...newRef
    };
    setActiveReflections([item, ...activeReflections]);
    setShowModal(false);
    setNewRef({ value: VALUE_PILLARS[0], score: 5, text: '' });
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Valores e Integridad</h2>
          <p className="text-slate-500 mt-1">Reflexiona sobre tu carácter y crecimiento interior.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          <span>Nueva Reflexión</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* 10 Commandments Section */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-indigo-400" size={28} />
                <h3 className="text-xl font-bold uppercase tracking-widest">Los 10 Mandamientos Life OS</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {[
                  "1. Amarás a Dios sobre todas las cosas.",
                  "2. No tomarás el nombre de Dios en vano.",
                  "3. Santificarás las fiestas.",
                  "4. Honrarás a tu padre y a tu madre.",
                  "5. No matarás.",
                  "6. No cometerás actos impuros.",
                  "7. No robarás.",
                  "8. No dirás falso testimonio ni mentirás.",
                  "9. No consentirás pensamientos ni deseos impuros.",
                  "10. No codiciarás los bienes ajenos."
                ].map((cmd, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-indigo-400 font-bold mt-0.5">•</span>
                    <span className="font-medium text-slate-200">{cmd}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Star size={180} />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck className="text-indigo-600" size={28} />
              <h3 className="text-xl font-bold text-slate-900">Chequeo Moral Semanal</h3>
            </div>

            <div className="space-y-8">
              {activeReflections.map(ref => (
                <div key={ref.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg text-slate-800">{ref.value}</h4>
                      <p className="text-sm text-slate-500 mt-2 italic font-medium leading-relaxed">"{ref.text}"</p>
                    </div>
                    <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="text-sm font-black text-slate-900">{ref.score}/10</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                      style={{ width: `${ref.score * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4">Reflexión Life OS</h3>
              <p className="text-indigo-200 mb-8 leading-relaxed max-w-lg">
                La integridad no es solo lo que hacemos cuando la gente mira. Es la consistencia entre nuestros valores y nuestras acciones. ¿Cómo te alineaste hoy?
              </p>
              <div className="flex gap-4">
                <button onClick={() => setShowModal(true)} className="flex-1 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-all">
                  Iniciar Auditoría Diaria
                </button>
                <button className="flex-1 py-3 bg-indigo-800 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all border border-indigo-700">
                  Ver Diario
                </button>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-10">
              <Heart size={240} />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Star size={18} className="text-amber-400" />
              Pilares Fundamentales
            </h3>
            <div className="space-y-3">
              {VALUE_PILLARS.map(pillar => (
                <div
                  key={pillar}
                  onClick={() => {
                    setNewRef({ ...newRef, value: pillar });
                    setShowModal(true);
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-100"
                >
                  <span className="font-bold text-slate-700 group-hover:text-indigo-600">{pillar}</span>
                  <ArrowRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-slate-200 text-slate-500 font-bold text-sm rounded-xl hover:bg-slate-50 transition-all">
              Gestionar Pilares
            </button>
          </div>

          <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100">
            <div className="flex items-center gap-3 mb-4 text-amber-700">
              <MessageSquare size={20} />
              <h4 className="font-bold text-sm uppercase tracking-wider">Frase de la Semana</h4>
            </div>
            <p className="text-amber-900 font-medium italic text-lg leading-relaxed mb-4">
              "Somos lo que hacemos repetidamente. La excelencia, entonces, no es un acto, sino un hábito."
            </p>
            <p className="text-amber-600 text-xs font-bold">— ARISTÓTELES</p>
          </div>
        </div>
      </div>

      {/* Modal de Nueva Reflexión */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Nueva Reflexión</h3>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pilar del Valor</label>
                <select
                  value={newRef.value}
                  onChange={(e) => setNewRef({ ...newRef, value: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
                >
                  {VALUE_PILLARS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Puntuación de Alineación (1-10)</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range" min="1" max="10"
                    value={newRef.score}
                    onChange={(e) => setNewRef({ ...newRef, score: parseInt(e.target.value) })}
                    className="flex-1 accent-indigo-600"
                  />
                  <span className="w-10 text-center font-black text-indigo-600 text-lg">{newRef.score}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tu Reflexión</label>
                <textarea
                  placeholder="¿Cómo actuaste hoy respecto a este valor?"
                  rows={4}
                  value={newRef.text}
                  onChange={(e) => setNewRef({ ...newRef, text: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                />
              </div>
              <button
                onClick={handleAddReflection}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all"
              >
                Guardar en el Registro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Values;
