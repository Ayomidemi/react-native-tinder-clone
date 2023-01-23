import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './constants/screens/HomeScreen';
import ChatScreen from './constants/screens/ChatScreen';
import Login from './constants/screens/Login';
import useAuth from './constants/hooks/useAuth';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user }: Record<string, string> = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
