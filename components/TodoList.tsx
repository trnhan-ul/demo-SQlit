import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useTasks } from "../hooks/useTasks";
import { useFocusEffect } from "@react-navigation/native";

const TodoList = () => {
  const { tasks, isReady, handleDelete, handleToggle, fetchTasks } = useTasks();

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  if (!isReady) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Đang tải danh sách...</Text>
      </View>
    );
  }

  const renderItem = ({ item }: any) => (
    <View style={styles.taskContainer}>
      {/* ✅ Nút đánh dấu hoàn thành */}
      <TouchableOpacity
        style={styles.completeButton}
        onPress={() => handleToggle(item.id, item.completed)}
      >
        <Text style={styles.checkbox}>
          {item.completed ? "✅" : "⬜"}
        </Text>
      </TouchableOpacity>

      {/* ✅ Hiển thị tên công việc */}
      <View style={styles.taskTextWrapper}>
        <Text
          style={[styles.taskText, item.completed ? styles.completed : null]}
        >
          {item.title}
        </Text>
      </View>

      {/* 🗑️ Xóa */}
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={styles.delete}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📋 Danh sách công việc</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.empty}>Chưa có công việc nào</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  completeButton: {
    marginRight: 10,
  },
  checkbox: {
    fontSize: 20,
  },
  taskTextWrapper: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  delete: {
    color: "red",
    fontSize: 18,
    marginLeft: 10,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },
});

export default TodoList;
