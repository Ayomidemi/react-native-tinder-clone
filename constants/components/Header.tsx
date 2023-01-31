import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

type Props = {
  title: string;
  callEnabled?: any;
};

const Header = ({ title, callEnabled }: Props) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <View className="p-2 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={34} color="#ff5864" />
        </TouchableOpacity>
        <Text className="text-2xl font-semibold pl-2">{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity className="rounded-full mr-4 p-3 bg-red-200">
          <Foundation name="telephone" size={20} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
