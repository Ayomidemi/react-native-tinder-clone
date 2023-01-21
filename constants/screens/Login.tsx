import { View, Text, Button } from 'react-native';
import React from 'react';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { authGoogle, request }: Record<string, any> = useAuth();

  return (
    <View>
      <Text>Login now yoo </Text>
      <Button title="login" onPress={authGoogle} disabled={!request} />
    </View>
  );
};

export default Login;
