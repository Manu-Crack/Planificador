
import React from 'react';

export const CATEGORIES = [
  'Transporte',
  'Alimentación',
  'Educación',
  'Ocio',
  'Salud',
  'Servicios',
  'Otros'
];

export const VALUE_PILLARS = [
  'Integridad',
  'Consistencia',
  'Generosidad',
  'Disciplina',
  'Gratitud',
  'Paciencia'
];

// Datos Mock Iniciales
export const MOCK_BUDGETS = [
  { category: 'Alimentación', limit: 400, spent: 320 },
  { category: 'Transporte', limit: 150, spent: 145 },
  { category: 'Educación', limit: 200, spent: 50 },
  { category: 'Ocio', limit: 100, spent: 85 }
];

export const MOCK_TASKS = [
  { id: '1', title: 'Revisión de Arquitectura Life OS', dueDate: '2026-01-20', priority: 'Alta', status: 'Pendiente', source: 'Local' },
  { id: '2', title: 'Almuerzo con el Equipo (Sincronizado)', dueDate: '2026-01-18', priority: 'Media', status: 'Pendiente', source: 'Calendar' },
  { id: '3', title: 'Refactorizar Servicio de Auth', dueDate: '2026-01-19', priority: 'Alta', status: 'Completada', source: 'Local' }
];

export const MOCK_HABITS = [
  { id: 'h1', name: 'Meditación Matutina', completed: [true, true, false, true, true], streak: 2, targetDays: 30 },
  { id: 'h2', name: 'Programar 2 Horas', completed: [true, true, true, true, true], streak: 5, targetDays: 30 },
  { id: 'h3', name: 'Hacer Ejercicio', completed: [false, true, true, false, true], streak: 1, targetDays: 20 }
];
