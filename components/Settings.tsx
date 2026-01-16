
import React from 'react';
import { Shield, Database, Bell, User, Key, Globe, LogOut, Check } from 'lucide-react';

interface SettingsProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ darkMode, setDarkMode }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className={`text-3xl font-black tracking-tight uppercase ${darkMode ? 'text-white' : 'text-slate-900'}`}>Configuración Base</h2>
        <p className="text-slate-500 mt-1">Control de infraestructura y personalización del Superusuario.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className={`${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'} rounded-3xl border shadow-sm overflow-hidden`}>
            <div className={`p-6 border-b flex items-center gap-3 ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <User size={20} className="text-slate-400" />
              <h3 className="font-bold">Perfil del Superusuario</h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-black shadow-lg">SU</div>
                <div>
                  <button className={`${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} px-4 py-2 rounded-xl font-bold text-xs uppercase transition-all`}>Cambiar Avatar</button>
                  <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">Formato recomendado: JPG, PNG (Max 2MB)</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nombre de Identidad</label>
                  <input type="text" defaultValue="Administrador" className={`${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'} w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium`} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email de Notificaciones</label>
                  <input type="email" defaultValue="admin@lifeos.core" className={`${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'} w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium`} />
                </div>
              </div>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'} rounded-3xl border shadow-sm overflow-hidden`}>
            <div className={`p-6 border-b flex items-center gap-3 ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <Key size={20} className="text-slate-400" />
              <h3 className="font-bold">Integraciones y API</h3>
            </div>
            <div className="p-8 space-y-4">
              <div className={`${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'} flex items-center justify-between p-4 rounded-2xl border hover:border-indigo-500 transition-all group`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl shadow-sm flex items-center justify-center font-black ${darkMode ? 'bg-slate-700 text-indigo-400' : 'bg-white text-indigo-600'}`}>G</div>
                  <div>
                    <h4 className="font-bold text-sm">Google Workspace</h4>
                    <p className="text-xs text-slate-400 font-medium">Sincronización de Calendar y Gmail activa.</p>
                  </div>
                </div>
                <button className="text-xs font-black text-rose-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Desvincular</button>
              </div>
              <div className={`${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'} flex items-center justify-between p-4 rounded-2xl border`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl shadow-sm flex items-center justify-center ${darkMode ? 'bg-slate-700 text-white' : 'bg-white text-slate-900'}`}>
                    <Database size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Base de Datos Local</h4>
                    <p className="text-xs text-slate-400 font-medium">Backup automático cada 24 horas.</p>
                  </div>
                </div>
                <button className={`px-4 py-1.5 rounded-lg font-black text-[10px] uppercase transition-all ${darkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-900 text-white hover:bg-indigo-600'}`}>Backup Ahora</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'} rounded-3xl p-6 border shadow-sm`}>
            <h3 className="font-bold mb-4 flex items-center gap-2 text-indigo-500">
              <Globe size={18} />
              Preferencias Globales
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between group cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
                <span className="text-sm font-bold text-slate-400 group-hover:text-indigo-400 transition-colors">Modo Oscuro</span>
                <div className={`w-12 h-6 rounded-full relative transition-all duration-300 border ${darkMode ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-200 border-slate-300'}`}>
                  <div className={`absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-md transition-all duration-300 ${darkMode ? 'left-6' : 'left-1'}`} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-400">Moneda por Defecto</span>
                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${darkMode ? 'bg-slate-800 text-indigo-400' : 'bg-slate-100 text-slate-900'}`}>Soles (S/.)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-400">Idioma Interfaz</span>
                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${darkMode ? 'bg-slate-800 text-indigo-400' : 'bg-slate-100 text-slate-900'}`}>Español</span>
              </div>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-rose-900/10 border-rose-900/50' : 'bg-rose-50 border-rose-100'} rounded-3xl p-6 border shadow-sm`}>
             <h3 className="font-bold text-rose-500 flex items-center gap-2 mb-4">
               <Shield size={18} />
               Zona de Peligro
             </h3>
             <p className={`text-xs font-medium mb-6 leading-relaxed ${darkMode ? 'text-rose-400' : 'text-rose-700'}`}>Estas acciones son irreversibles y afectarán a todos los módulos del Life OS.</p>
             <div className="space-y-3">
               <button className={`w-full py-3 border rounded-xl font-black text-[10px] uppercase transition-all ${darkMode ? 'bg-transparent border-rose-900/50 text-rose-400 hover:bg-rose-900/20' : 'bg-white border-rose-200 text-rose-600 hover:bg-rose-100'}`}>Limpiar Caché Gemini</button>
               <button className="w-full py-3 bg-rose-600 text-white rounded-xl font-black text-[10px] uppercase shadow-lg shadow-rose-900/20 hover:bg-rose-700 transition-all">Resetear Sistema</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
