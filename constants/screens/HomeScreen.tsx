import { View, Text, Button, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';

const HomeScreen = () => {
  const { logout, user }: Record<string, any> = useAuth();

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  // console.log(user);

  return (
    <SafeAreaView>
      {/* Header */}

      <View className="items-center relative">
        <TouchableOpacity className="absolute left-5 top-3">
          <Image source={{ uri: user.photoURL }} className="h-10 w-10 rounded-full" />
        </TouchableOpacity>

        <TouchableOpacity className="">
          <Image
            source={require('../../assets/images/tinder_logo.png')}
            className="h-12 w-12 rounded-full"
          />
        </TouchableOpacity>
      </View>

      {/* Enf of Header */}
      {/* 
      <Text className="text-red-500">HomeScreen</Text>
      <Button title="go to chat" onPress={() => navigation.navigate('Chat')} />

      <Button title="logout" onPress={logout} /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
