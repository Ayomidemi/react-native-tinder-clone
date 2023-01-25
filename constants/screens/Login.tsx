import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const Login = () => {
  const { authGoogle }: Record<string, any> = useAuth();

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View className="flex-1">
      <ImageBackground
        source={{ uri: 'https://tinder.com/static/tinder.png' }}
        resizeMode="cover"
        className="flex-1"
      >
        <TouchableOpacity
          className="absolute bottom-40 w-52 bg-white p-4 rounded-xl"
          style={{ marginHorizontal: '25%' }}
          onPress={authGoogle}
        >
          <Text className="text-center font-semibold">Sign in & get swiping</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Login;
