import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  task: any;
  onToggle: (id: number, completed: number) => void;
  onEdit: (task: any) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onToggle(task.id, task.completed)}>
        <Text style={[styles.title, task.completed ? styles.completed : null]}>
          {task.title}
        </Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(task)}>
          <Text style={styles.edit}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Text style={styles.delete}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  title: { fontSize: 18 },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
  actions: { flexDirection: 'row', gap: 10 },
  edit: { fontSize: 18 },
  delete: { fontSize: 18, color: 'red' },
});
