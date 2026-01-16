
export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface Budget {
  category: string;
  limit: number;
  spent: number;
}

export interface Habit {
  id: string;
  name: string;
  completed: boolean[];
  streak: number;
  targetDays: number;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Completed';
  source: 'Local' | 'Calendar';
}

export interface Project {
  id: string;
  name: string;
  progress: number;
  status: 'Active' | 'Paused' | 'Completed';
  tasks: string[];
}

export interface ValueReflection {
  id: string;
  valueName: string;
  score: number; // 1-10
  reflection: string;
  date: string;
}

export enum AppSection {
  Dashboard = 'Dashboard',
  Finance = 'Finance',
  Schedule = 'Schedule',
  Habits = 'Habits',
  Projects = 'Projects',
  Values = 'Values',
  Settings = 'Settings'
}
