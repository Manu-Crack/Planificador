import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MOCK_TASKS } from '../constants';

export interface Task {
    id: string;
    title: string;
    dueDate: string;
    priority: string;
    status: 'Pendiente' | 'Completada';
    source: string;
}

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        setLoading(true);
        // Check if Supabase key is present
        if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
            console.warn("Supabase Key not found, using Mock data");
            setTasks(MOCK_TASKS.map(t => ({
                ...t,
                status: t.status as 'Pendiente' | 'Completada' // Ensure type match
            })));
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching tasks:', error);
            // Fallback
            setTasks(MOCK_TASKS.map(t => ({
                ...t,
                status: t.status as 'Pendiente' | 'Completada'
            })));
        } else {
            setTasks(data.map((t: any) => ({
                id: t.id,
                title: t.title,
                dueDate: t.due_date ? new Date(t.due_date).toLocaleDateString() : 'Sin Fecha',
                priority: t.priority,
                status: t.status,
                source: t.source || 'Local'
            })));
        }
        setLoading(false);
    };

    const addTask = async (title: string, dueDate: string, priority: string) => {
        if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
            const newTask: Task = {
                id: Date.now().toString(),
                title,
                dueDate,
                priority,
                status: 'Pendiente',
                source: 'Local'
            };
            setTasks([newTask, ...tasks]);
            return;
        }

        const { data, error } = await supabase.from('tasks').insert([
            { title, due_date: new Date(dueDate), priority, status: 'Pendiente', source: 'Local' }
        ]).select();

        if (error) {
            console.error(error);
            return;
        }

        if (data) {
            fetchTasks(); // Reload to get processed format
        }
    };

    const toggleTask = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'Pendiente' ? 'Completada' : 'Pendiente';

        // Optimistic update
        setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));

        if (import.meta.env.VITE_SUPABASE_ANON_KEY) {
            await supabase.from('tasks').update({ status: newStatus }).eq('id', id);
        }
    };

    const deleteTask = async (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
        if (import.meta.env.VITE_SUPABASE_ANON_KEY) {
            await supabase.from('tasks').delete().eq('id', id);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return { tasks, loading, addTask, toggleTask, deleteTask };
};
