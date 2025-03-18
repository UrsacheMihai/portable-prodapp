import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Task, TimeTableEntry, Event, DailyRoutine } from '../types';
import { pushDataToGitHub } from '../githubApi'; // Import the GitHub API function

interface Store {
    tasks: Task[];
    timetable: TimeTableEntry[];
    events: Event[];
    routines: DailyRoutine[];

    addTask: (task: Task) => void;
    removeTask: (id: string) => void;
    toggleTask: (id: string) => void;

    addTimetableEntry: (entry: TimeTableEntry) => void;
    removeTimetableEntry: (id: string) => void;
    updateTimetableEntry: (id: string, entry: Partial<TimeTableEntry>) => void;

    addEvent: (event: Event) => void;
    removeEvent: (id: string) => void;
    updateEvent: (id: string, event: Partial<Event>) => void;

    addRoutine: (routine: DailyRoutine) => void;
    removeRoutine: (id: string) => void;
    toggleRoutine: (id: string) => void;
}

const storage = createJSONStorage(() => localStorage);

export const useStore = create<Store>()(
    persist(
        (set) => ({
            tasks: [],
            timetable: [],
            events: [],
            routines: [],

            addTask: (task) => set((state) => {
                const updatedTasks = [...state.tasks, task];
                // Push updated data to GitHub
                pushDataToGitHub({
                    tasks: updatedTasks,
                    timetable: state.timetable,
                    events: state.events,
                    routines: state.routines,
                });
                return { tasks: updatedTasks };
            }),

            removeTask: (id) => set((state) => {
                const updatedTasks = state.tasks.filter((task) => task.id !== id);
                // Push updated data to GitHub
                pushDataToGitHub({
                    tasks: updatedTasks,
                    timetable: state.timetable,
                    events: state.events,
                    routines: state.routines,
                });
                return { tasks: updatedTasks };
            }),

            toggleTask: (id) => set((state) => {
                const updatedTasks = state.tasks.map((task) =>
                    task.id === id ? { ...task, completed: !task.completed } : task
                );
                // Push updated data to GitHub
                pushDataToGitHub({
                    tasks: updatedTasks,
                    timetable: state.timetable,
                    events: state.events,
                    routines: state.routines,
                });
                return { tasks: updatedTasks };
            }),

            addTimetableEntry: (entry) => set((state) => {
                const updatedTimetable = [...state.timetable, entry];
                // Push updated data to GitHub
                pushDataToGitHub({
                    tasks: state.tasks,
                    timetable: updatedTimetable,
                    events: state.events,
                    routines: state.routines,
                });
                return { timetable: updatedTimetable };
            }),

            removeTimetableEntry: (id) => set((state) => {
                const updatedTimetable = state.timetable.filter((entry) => entry.id !== id);
                // Push updated data to GitHub
                pushDataToGitHub({
                    tasks: state.tasks,
                    timetable: updatedTimetable,
                    events: state.events,
                    routines: state.routines,
                });
                return { timetable: updatedTimetable };
            }),

            updateTimetableEntry: (id, updatedEntry) => set((state) => {
                const updatedTimetable = state.timetable.map((entry) =>
                    entry.id === id ? { ...entry, ...updatedEntry } : entry
                );
                // Push updated data to GitHub
                pushDataToGitHub({
                    tasks: state.tasks,
                    timetable: updatedTimetable,
                    events: state.events,
                    routines: state.routines,
                });
                return { timetable: updatedTimetable };
            }),

            addEvent: (event) => set((state) => {
                const updatedEvents = [...state.events, event];
                // Push updated data to GitHub
                pushDataToGitHub({
                    tasks: state.tasks,
                    timetable: state.timetable,
                    events: updatedEvents,
                    routines: state.routines,
                });
                return { events: updatedEvents };
            }),

            removeEvent: (id) => set((state) => {
                const updatedEvents = state.events.filter((event) => event.id !== id);
                // Push updated data to GitHub
                pushDataToGitHub({
                    tasks: state.tasks,
                    timetable: state.timetable,
                    events: updatedEvents,
                    routines: state.routines,
                });
                return { events: updatedEvents };
            }),

            updateEvent: (id, updatedEvent) => set((state) => {
                const updatedEvents = state.events.map((event) =>
                    event.id === id ? { ...event, ...updatedEvent } : event
                );
                // Push updated data to GitHub
                pushDataToGitHub({
                    tasks: state.tasks,
                    timetable: state.timetable,
                    events: updatedEvents,
                    routines: state.routines,
                });
                return { events: updatedEvents };
            }),

            addRoutine: (routine) => set((state) => {
                const updatedRoutines = [...state.routines, routine];
                // Push updated data to GitHub
                pushDataToGitHub({
                    tasks: state.tasks,
                    timetable: state.timetable,
                    events: state.events,
                    routines: updatedRoutines,
                });
                return { routines: updatedRoutines };
            }),

            removeRoutine: (id) => set((state) => {
                const updatedRoutines = state.routines.filter((routine) => routine.id !== id);
                // Push updated data to GitHub
                pushDataToGitHub({
                    tasks: state.tasks,
                    timetable: state.timetable,
                    events: state.events,
                    routines: updatedRoutines,
                });
                return { routines: updatedRoutines };
            }),

            toggleRoutine: (id) => set((state) => {
                const updatedRoutines = state.routines.map((routine) =>
                    routine.id === id
                        ? {
                            ...routine,
                            completed: !routine.completed,
                            lastCompleted: !routine.completed ? new Date().toISOString() : routine.lastCompleted,
                        }
                        : routine
                );
                // Push updated data to GitHub
                pushDataToGitHub({
                    tasks: state.tasks,
                    timetable: state.timetable,
                    events: state.events,
                    routines: updatedRoutines,
                });
                return { routines: updatedRoutines };
            }),

        }),
        {
            name: 'productivity-storage',
            storage, // Use our enhanced storage handler
            version: 1, // Add versioning for future migrations
            partialize: (state) => ({ // Only persist these fields
                tasks: state.tasks,
                timetable: state.timetable,
                events: state.events,
                routines: state.routines,
            }),
        }
    )
);
