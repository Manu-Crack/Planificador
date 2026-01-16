import React, { useState, useEffect } from 'react';
import {
  Plus,
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Bell,
  Calculator,
  Download,
  Calendar,
  X,
  Zap,
  Check,
  AlertCircle,
  Coins
} from 'lucide-react';
import { CATEGORIES, MOCK_BUDGETS } from '../constants';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area
} from 'recharts';

interface Transaction {
  id: string;
  source: string;
  amount: number;
  date: string; // ISO date
  type: 'income' | 'expense';
  category?: string;
}

const Finance: React.FC = () => {
  // --- Global State ---
  const [viewType, setViewType] = useState<'mensual' | 'semanal'>('mensual');
  const [showIncomeSettings, setShowIncomeSettings] = useState(false);

  // --- Income State ---
  const [baseIncome, setBaseIncome] = useState(3500); // Default base monthly income
  const [extraIncomes, setExtraIncomes] = useState<Transaction[]>([
    { id: '1', source: 'Freelance Design', amount: 450, date: new Date().toISOString(), type: 'income', category: 'Extra' },
  ]);
  const [quickInput, setQuickInput] = useState('');

  // --- Budget/Expense State ---
  const [budgets, setBudgets] = useState(MOCK_BUDGETS);

  // --- Modal States ---
  const [isEditBudgetOpen, setIsEditBudgetOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<{ category: string; limit: number } | null>(null);

  // --- Computed Values ---
  const totalExtraIncome = extraIncomes.reduce((acc, curr) => acc + curr.amount, 0);
  const totalMonthlyIncome = baseIncome + totalExtraIncome;

  // Adjust for view mode
  const displayedIncome = viewType === 'mensual' ? totalMonthlyIncome : totalMonthlyIncome / 4;

  const totalMonthlySpent = budgets.reduce((a, b) => a + b.spent, 0);
  const displayedSpent = viewType === 'mensual' ? totalMonthlySpent : totalMonthlySpent / 4;

  const totalMonthlyLimit = budgets.reduce((a, b) => a + b.limit, 0);
  const displayedLimit = viewType === 'mensual' ? totalMonthlyLimit : totalMonthlyLimit / 4;

  const remainingBalance = displayedIncome - displayedSpent;
  const savingsRate = ((totalMonthlyIncome - totalMonthlySpent) / totalMonthlyIncome) * 100;

  // --- Handlers ---

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;

    // Regex to parse "Text Amount" (e.g., "Yape 20", "Venta 50.5")
    // Supports: "Name 100", "Name 100.50", "100 Name" (flexible)
    const match = quickInput.match(/([a-zA-Z\s]+)\s*(\d+(\.\d{1,2})?)|\s*(\d+(\.\d{1,2})?)\s*([a-zA-Z\s]+)/);

    if (match) {
      // Logic to determine which group is text and which is number
      let source = '';
      let amount = 0;

      // Check if the first format matched (Text Number)
      if (match[1] && match[2]) {
        source = match[1].trim();
        amount = parseFloat(match[2]);
      }
      // Check if second format matched (Number Text)
      else if (match[4] && match[6]) {
        amount = parseFloat(match[4]);
        source = match[6].trim();
      }

      if (amount > 0 && source) {
        const newIncome: Transaction = {
          id: Date.now().toString(),
          source: source,
          amount: amount,
          date: new Date().toISOString(),
          type: 'income',
          category: 'Extra'
        };
        setExtraIncomes([newIncome, ...extraIncomes]);
        setQuickInput('');
        // Show ephemeral success visual (could be a toast, but keeping it simple for now)
      }
    }
  };

  const handleUpdateBaseIncome = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) setBaseIncome(val);
  };

  const openEditModal = (budget: typeof budgets[0]) => {
    setEditingBudget({ category: budget.category, limit: budget.limit });
    setIsEditBudgetOpen(true);
  };

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBudget) return;
    setBudgets(budgets.map(b => b.category === editingBudget.category ? { ...b, limit: editingBudget.limit } : b));
    setIsEditBudgetOpen(false);
  };

  // --- Chart Data Preparation ---
  const chartData = budgets.map(b => ({
    name: b.category,
    spent: viewType === 'mensual' ? b.spent : b.spent / 4,
    limit: viewType === 'mensual' ? b.limit : b.limit / 4,
    percent: (b.spent / b.limit) * 100
  }));

  const darkModeSupported = () => document.documentElement.classList.contains('dark');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">

      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white uppercase flex items-center gap-3">
            Finanzas <span className="text-indigo-600 dark:text-indigo-400">Master</span>
          </h2>
          <p className="text-slate-500 font-medium mt-1">Gestión inteligente de flujos de capital y presupuestos.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex">
            <button
              onClick={() => setViewType('mensual')}
              className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase transition-all ${viewType === 'mensual'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setViewType('semanal')}
              className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase transition-all ${viewType === 'semanal'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
            >
              Semanal
            </button>
          </div>

          <button
            onClick={() => setShowIncomeSettings(!showIncomeSettings)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-black text-xs uppercase border-2 transition-all ${showIncomeSettings
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-500/50 dark:text-emerald-400'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500'
              }`}
          >
            <Coins size={18} />
            <span>Ajustar Ingresos</span>
          </button>
        </div>
      </div>

      {/* Income Settings Panel (Collapsible) */}
      {showIncomeSettings && (
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <TrendingUp size={300} />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-indigo-400">Ingreso Base Recurrente</h3>
              <p className="text-slate-400 text-sm mb-6">Tu salario o ingreso fijo mensual.</p>
              <div className="relative max-w-xs group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">S/.</span>
                <input
                  type="number"
                  value={baseIncome}
                  onChange={handleUpdateBaseIncome}
                  className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-2xl font-black text-white focus:border-indigo-500 focus:bg-slate-800 transition-all outline-none group-hover:border-slate-600"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-emerald-400">Ingresos Extra Rápidos</h3>
              <p className="text-slate-400 text-sm mb-6 max-w-md">
                Escribe <span className="text-white font-mono bg-slate-800 px-1 rounded">concepto cantidad</span> (ej: "Yape 20") para sumar al instante.
              </p>

              <form onSubmit={handleQuickAdd} className="relative max-w-lg">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400">
                  <Zap size={20} className="animate-pulse" />
                </div>
                <input
                  type="text"
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  placeholder="Ej: Yape 50, Freelance 200..."
                  className="w-full bg-white text-slate-900 border-none rounded-2xl py-4 pl-12 pr-14 text-lg font-bold shadow-lg focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={!quickInput.trim()}
                  className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 text-white px-4 rounded-xl font-bold transition-all flex items-center justify-center"
                >
                  <ArrowRight size={20} />
                </button>
              </form>

              {/* Recent Extras */}
              <div className="mt-6 flex flex-wrap gap-2">
                {extraIncomes.slice(0, 3).map(inc => (
                  <div key={inc.id} className="bg-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2 border border-slate-700">
                    <span className="text-xs font-bold text-slate-300">{inc.source}</span>
                    <span className="text-xs font-black text-emerald-400">+S/.{inc.amount}</span>
                  </div>
                ))}
                {extraIncomes.length > 3 && (
                  <div className="px-3 py-1.5 text-xs text-slate-500 font-bold">+{extraIncomes.length - 3} más</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
            <Wallet size={120} />
          </div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Ingreso {viewType}</p>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
            S/. {displayedIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-full" />
            </div>
            <span className="text-xs font-bold text-emerald-500">100% Capac.</span>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
            <TrendingDown size={120} />
          </div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Gasto {viewType}</p>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
            S/. {displayedSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${(displayedSpent / displayedIncome) > 0.9 ? 'bg-rose-500' : 'bg-indigo-500'
                  }`}
                style={{ width: `${Math.min((displayedSpent / displayedIncome) * 100, 100)}%` }}
              />
            </div>
            <span className={`text-xs font-bold ${(displayedSpent / displayedIncome) > 0.9 ? 'text-rose-500' : 'text-indigo-500'
              }`}>
              {Math.round((displayedSpent / displayedIncome) * 100)}% Usado
            </span>
          </div>
        </div>

        {/* Net/Savings Card */}
        <div className={`p-8 rounded-3xl border shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-300 ${remainingBalance > 0
            ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border-indigo-500'
            : 'bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-900'
          }`}>
          <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
            <Zap size={120} />
          </div>
          <p className={`text-xs font-black uppercase tracking-widest mb-2 ${remainingBalance > 0 ? 'text-indigo-200' : 'text-slate-400'}`}>
            Disponible Neto
          </p>
          <h3 className={`text-4xl font-black mb-4 ${remainingBalance > 0 ? 'text-white' : 'text-rose-500'}`}>
            S/. {remainingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2 py-1 rounded bg-white/20`}>
              {remainingBalance > 0 ? `+${savingsRate.toFixed(1)}% Ahorro` : ' Déficit Crítico'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Budget Categories List */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">Distribución de Gastos</h3>
              <p className="text-xs text-slate-400 font-medium">Gestiona los límites por categoría para mantener el balance.</p>
            </div>
            <button className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-bold text-xs uppercase tracking-wide">
              Ver reporte detallado
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgets.map((budget) => {
              const currentSpent = viewType === 'mensual' ? budget.spent : budget.spent / 4;
              const currentLimit = viewType === 'mensual' ? budget.limit : budget.limit / 4;
              const percent = (currentSpent / currentLimit) * 100;
              const isWarning = percent > 90;

              return (
                <div
                  key={budget.category}
                  onClick={() => openEditModal(budget)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${isWarning
                      ? 'bg-rose-50 border-rose-100 dark:bg-rose-900/10 dark:border-rose-900/30'
                      : 'bg-slate-50 border-slate-100 dark:bg-slate-800/50 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800'
                    }`}
                >
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${isWarning ? 'bg-rose-100 text-rose-600 dark:bg-rose-800 dark:text-rose-100' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm'
                        }`}>
                        {budget.category.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{budget.category}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          {isWarning ? 'CUIDADO' : 'NORMAL'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-900 dark:text-white text-sm">S/. {currentSpent.toFixed(0)}</p>
                      <p className="text-[10px] text-slate-400 font-medium">de S/. {currentLimit.toFixed(0)}</p>
                    </div>
                  </div>

                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative z-10">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${isWarning ? 'bg-rose-500' : 'bg-indigo-500'
                        }`}
                      style={{ width: `${Math.min(percent, 100)}%` }}
                    />
                  </div>

                  {isWarning && (
                    <div className="absolute top-2 right-2 animate-pulse">
                      <AlertCircle size={16} className="text-rose-500" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Analytics & Insights */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-black uppercase tracking-tight mb-4">Análisis AI</h3>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400">
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-300">Proyección de Ahorro</p>
                    <p className="text-sm">Si mantienes este ritmo, ahorrarás <span className="text-emerald-400 font-bold">S/. {(remainingBalance * (viewType === 'semanal' ? 4 : 1)).toFixed(2)}</span> este mes.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="bg-rose-500/20 p-2 rounded-lg text-rose-400">
                    <AlertCircle size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-300">Puntos de Dolor</p>
                    <p className="text-sm">El gasto en <span className="text-white font-bold">Alimentación</span> es 15% mayor al promedio.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/30 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-64">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">Tendencia de Gasto</h3>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <Bar dataKey="spent" fill={darkModeSupported() ? '#818cf8' : '#4f46e5'} radius={[4, 4, 0, 0]} />
                  <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{
                      background: darkModeSupported() ? '#1e293b' : '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

      {/* Edit Budget Modal */}
      {isEditBudgetOpen && editingBudget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-sm p-6 space-y-6 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase">Ajustar Límite</h3>
                <p className="text-xs text-slate-500 font-bold">{editingBudget.category}</p>
              </div>
              <button onClick={() => setIsEditBudgetOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveBudget} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">Nuevo Límite {viewType === 'semanal' ? '(Semanal)' : '(Mensual)'}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">S/.</span>
                  <input
                    type="number"
                    required
                    autoFocus
                    value={editingBudget.limit}
                    onChange={e => setEditingBudget({ ...editingBudget, limit: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg text-slate-900 dark:text-white focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-2 text-center">
                  Al ajustar el límite, recalculemos tu capacidad de ahorro automáticamente.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditBudgetOpen(false)}
                  className="flex-1 py-3 text-slate-500 font-bold text-xs uppercase hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white font-bold text-xs uppercase py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;
