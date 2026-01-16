
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MOCK_HABITS } from '../constants';

export interface Habit {
    id: string;
    name: string;
    streak: number;
    targetDays: number;
    completed: boolean[];
}

export const useHabits = () => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchHabits = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('habits')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching habits:', error);
            // Fallback
            setHabits(MOCK_HABITS.map(h => ({
                ...h,
                completed: [...h.completed, ...Array(7 - h.completed.length).fill(false)].slice(0, 7)
            })));
        } else {
            const formattedHabits = data.map((h: any) => ({
                id: h.id,
                name: h.name,
                streak: h.streak,
                targetDays: h.target_days,
                completed: h.completed_days || Array(7).fill(false)
            }));
            setHabits(formattedHabits.length ? formattedHabits : MOCK_HABITS.map(h => ({
                ...h,
                completed: [...h.completed, ...Array(7 - h.completed.length).fill(false)].slice(0, 7)
            })));
        }
        setLoading(false);
    };

    const addHabit = async (name: string) => {
        const newHabit = { name, streak: 0, target_days: 21, completed_days: Array(7).fill(false) };
        const { data, error } = await supabase.from('habits').insert([newHabit]).select();

        if (error) console.error(error);
        if (data) fetchHabits();
    };

    const deleteHabit = async (id: string) => {
        // Optimistic update
        setHabits(habits.filter(h => h.id !== id));
        await supabase.from('habits').delete().eq('id', id);
    };

    const toggleDay = async (id: string, dayIndex: number, currentCompleted: boolean[]) => {
        const newCompleted = [...currentCompleted];
        newCompleted[dayIndex] = !newCompleted[dayIndex];

        // Calculate streak (simple logic)
        let currentStreak = 0;
        for (const done of newCompleted) {
            if (done) currentStreak++;
        }

        // Optimistic update
        setHabits(habits.map(h => h.id === id ? { ...h, completed: newCompleted, streak: currentStreak } : h));

        await supabase.from('habits').update({
            completed_days: newCompleted,
            streak: currentStreak
        }).eq('id', id);
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    return { habits, loading, addHabit, toggleDay, deleteHabit };
};

export const useProjects = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (error) console.error(error);
        else setProjects(data.map((p: any) => ({
            id: p.id,
            name: p.name,
            progress: p.progress,
            status: p.status,
            category: p.category
        })));
        setLoading(false);
    };

    const addProject = async (name: string, category: string) => {
        await supabase.from('projects').insert([{ name, category, progress: 0, status: 'Activo' }]);
        fetchProjects();
    };

    const deleteProject = async (id: string) => {
        setProjects(projects.filter(p => p.id !== id));
        await supabase.from('projects').delete().eq('id', id);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return { projects, loading, addProject, deleteProject };
};
