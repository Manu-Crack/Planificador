
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Calendar, 
  CheckCircle2, 
  Briefcase, 
  Heart, 
  Settings as SettingsIcon,
  Bell,
  Search,
  Plus,
  ShieldCheck,
  Sparkles,
  Moon,
  Sun
} from 'lucide-react';
import { AppSection } from './types';
import Dashboard from './components/Dashboard';
import Finance from './components/Finance';
import Schedule from './components/Schedule';
import Habits from './components/Habits';
import Projects from './components/Projects';
import Values from './components/Values';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.Dashboard);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(prev => ["Alerta Crítica: Has alcanzado el 90% del límite en Alimentación", ...prev]);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.Dashboard: return <Dashboard setActiveSection={setActiveSection} />;
      case AppSection.Finance: return <Finance />;
      case AppSection.Schedule: return <Schedule />;
      case AppSection.Habits: return <Habits />;
      case AppSection.Projects: return <Projects />;
      case AppSection.Values: return <Values />;
      case AppSection.Settings: return <Settings darkMode={darkMode} setDarkMode={setDarkMode} />;
      default: return <Dashboard setActiveSection={setActiveSection} />;
    }
  };

  const navItems = [
    { id: AppSection.Dashboard, label: 'Control Total', icon: LayoutDashboard },
    { id: AppSection.Finance, label: 'Finanzas (S/.)', icon: Wallet },
    { id: AppSection.Schedule, label: 'Agenda Central', icon: Calendar },
    { id: AppSection.Habits, label: 'Hábitos Pro', icon: CheckCircle2 },
    { id: AppSection.Projects, label: 'Proyectos', icon: Briefcase },
    { id: AppSection.Values, label: 'Ética y Moral', icon: Heart },
  ];

  return (
    <div className={`${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} flex h-screen w-full overflow-hidden font-feature-settings transition-colors duration-300`}>
      <div 
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside className={`fixed lg:static z-50 h-full w-64 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-r transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className={`w-10 h-10 ${darkMode ? 'bg-indigo-600' : 'bg-slate-900'} rounded-xl flex items-center justify-center text-white`}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">Life OS</h1>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Admin Superuser</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeSection === item.id ? (darkMode ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900 text-white shadow-lg shadow-slate-200') : (darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-50')}`}
              >
                <item.icon size={20} className={activeSection === item.id ? 'text-white' : 'text-slate-400'} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
             <button 
              onClick={() => setActiveSection(AppSection.Settings)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeSection === AppSection.Settings ? (darkMode ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white') : (darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-50')}`}
             >
              <SettingsIcon size={20} className={activeSection === AppSection.Settings ? 'text-white' : 'text-slate-400'} />
              <span>Configuración Base</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-indigo-600 text-white rounded-2xl p-4 relative overflow-hidden group shadow-xl shadow-indigo-100 dark:shadow-none">
            <p className="text-xs text-indigo-200 mb-1">Estado de CPU Core</p>
            <p className="text-sm font-bold">Sistema Optimizado</p>
            <div className="mt-2 h-1 w-full bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white w-full animate-pulse" />
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className={`${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'} h-20 backdrop-blur-md border-b flex items-center justify-between px-6 lg:px-10 shrink-0`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <LayoutDashboard size={24} />
            </button>
            <div className={`${darkMode ? 'bg-slate-800' : 'bg-slate-100'} hidden sm:flex items-center rounded-full px-4 py-2 gap-2 w-64 border border-transparent focus-within:border-indigo-300 transition-all`}>
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Comando rápido..." className="bg-transparent border-none outline-none text-sm w-full" />
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors ${darkMode ? 'text-amber-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            <div className="relative">
              <button className={`p-2 transition-colors relative rounded-full ${darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}>
                <Bell size={22} />
                {notifications.length > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                )}
              </button>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-3 p-1 pr-3">
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold border-2 border-white dark:border-slate-700 shadow-sm">
                SU
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">Administrador</p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Activo Pro</p>
              </div>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </section>

        <button 
          onClick={() => setNotifications(prev => ["Nueva entrada de registro creada", ...prev])}
          className={`fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-14 h-14 ${darkMode ? 'bg-indigo-600 shadow-indigo-900/20' : 'bg-slate-900 shadow-slate-200'} text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 z-40 transition-all`}
        >
          <Plus size={28} />
        </button>
      </main>
    </div>
  );
};

export default App;
