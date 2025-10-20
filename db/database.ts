import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('tasks.db');

export const initDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    );
  `);
};

export const getTasks = async () => {
  const result = await db.getAllAsync('SELECT * FROM tasks ORDER BY id DESC;');
  return result;
};

export const addTask = async (title: string) => {
  await db.runAsync('INSERT INTO tasks (title, completed) VALUES (?, ?);', [title, 0]);
};

export const updateTask = async (id: number, title: string) => {
  await db.runAsync('UPDATE tasks SET title = ? WHERE id = ?;', [title, id]);
};

export const deleteTask = async (id: number) => {
  await db.runAsync('DELETE FROM tasks WHERE id = ?;', [id]);
};

export const toggleTask = async (id: number, completed: number) => {
  const newStatus = completed ? 0 : 1;
  await db.runAsync('UPDATE tasks SET completed = ? WHERE id = ?;', [newStatus, id]);
};
