import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTasks } from '../hooks/useTasks';

export default function EditTaskScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { task } = route.params;
  const { handleUpdate } = useTasks();

  const [title, setTitle] = useState(task.title);

  const update = () => {
    handleUpdate(task.id, title);
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Cập nhật" onPress={update} />
    </View>
  );
}
