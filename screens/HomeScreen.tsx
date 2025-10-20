import React, { useCallback } from 'react';
import { View, Button, FlatList, ActivityIndicator } from 'react-native';
import TaskItem from '../components/TaskItem';
import { useTasks } from '../hooks/useTasks';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { tasks, isReady, handleDelete, handleToggle, fetchTasks } = useTasks();

  // 🔹 Khi màn hình Home được focus lại → fetch dữ liệu
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Thêm công việc" onPress={() => navigation.navigate('AddTask')} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={(task) => navigation.navigate('EditTask', { task })}
          />
        )}
        ListEmptyComponent={<View><Button title="Không có công việc" onPress={fetchTasks} /></View>}
      />
    </View>
  );
}
