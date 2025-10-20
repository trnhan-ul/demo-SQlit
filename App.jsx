import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import EditTaskScreen from './screens/EditTaskScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Danh sách công việc' }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Thêm công việc' }} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Sửa công việc' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
