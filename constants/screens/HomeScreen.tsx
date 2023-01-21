import { View, Text, Button } from 'react-native';
import React from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <View>
      <Text className="text-red-500">HomeScreen</Text>
      <Button title="go to chat" onPress={() => navigation.navigate('Chat')} />
    </View>
  );
};

export default HomeScreen;
