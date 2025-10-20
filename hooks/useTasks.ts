import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

interface Task {
  id: number;
  title: string;
  completed: number;
}

const db = SQLite.openDatabaseSync('tasks.db');

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isReady, setIsReady] = useState(false);

  const fetchTasks = async () => {
    const result = (await db.getAllAsync('SELECT * FROM tasks')) as Task[];
    setTasks(result);
    setIsReady(true);
  };

  const handleAdd = async (title: string) => {
    if (!title.trim()) {
      console.log('❌ Không thể thêm công việc trống');
      return;
    }
    await db.runAsync('INSERT INTO tasks (title, completed) VALUES (?, ?)', [title, 0]);
    await fetchTasks();
  };

  const handleDelete = async (id: number) => {
    await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
    await fetchTasks();
  };

  const handleUpdate = async (id: number, title: string) => {
    if (!title.trim()) return;
    await db.runAsync('UPDATE tasks SET title = ? WHERE id = ?', [title, id]);
    await fetchTasks();
  };

  const handleToggle = async (id: number, completed: number) => {
    await db.runAsync('UPDATE tasks SET completed = ? WHERE id = ?', [completed ? 0 : 1, id]);
    await fetchTasks();
  };

  useEffect(() => {
    (async () => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          completed INTEGER
        );
      `);
      await fetchTasks();
    })();
  }, []);

  return {
    tasks,
    isReady,
    handleAdd,
    handleDelete,
    handleUpdate,
    handleToggle,
    fetchTasks,
  };
}
