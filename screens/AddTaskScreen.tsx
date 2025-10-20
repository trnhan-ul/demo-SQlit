import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { useNavigation } from '@react-navigation/native';


export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const { handleAdd } = useTasks();
  const navigation = useNavigation();

const add = () => {
  handleAdd(title);
  if (navigation.canGoBack()) {
    navigation.goBack();
  } else {
    navigation.navigate("HomeScreen" as never);
  }
};

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nhập công việc..."
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Lưu" onPress={add} />
    </View>
  );
}
