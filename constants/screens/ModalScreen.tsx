import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const ModalScreen = () => {
  const { user }: Record<string, any> = useAuth();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [updateProfile, setUpdateProfile] = useState({
    occupation: '',
    image: '',
    age: '',
  });

  const incompleteForm = !updateProfile.image || !updateProfile.occupation || !updateProfile.age;

  const updateUserProfile = () => {
    setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: updateProfile.image,
      occupation: updateProfile.occupation,
      age: updateProfile.age,
      timeStamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((err) => console.log(err));
  };

  return (
    <View className="flex-1 items-center pt-1">
      <Image
        source={require('../../assets/images/tinder_logo_text.png')}
        className="h-20 w-full"
        resizeMode="contain"
      />

      <Text className="text-xl text-gray-500 p-2 font-semibold">Welcome {user.displayName}</Text>

      <Text className="text-center p-4 font-semibold text-red-400 text-base">
        Step 1: Profile pic
      </Text>
      <TextInput
        className="text-center pb-2 text-lg"
        placeholder="Enter the profile pic url"
        value={updateProfile.image}
        onChangeText={(text) => setUpdateProfile({ ...updateProfile, image: text })}
      />

      <Text className="text-center p-4 font-semibold text-red-400 text-base">
        Step 2: Occupation
      </Text>
      <TextInput
        className="text-center pb-2 text-lg"
        placeholder="Enter your occupation"
        value={updateProfile.occupation}
        onChangeText={(text) => setUpdateProfile({ ...updateProfile, occupation: text })}
      />

      <Text className="text-center p-4 font-semibold text-red-400 text-base">Step 3: Age</Text>
      <TextInput
        className="text-center pb-2 text-lg"
        placeholder="Enter your age"
        maxLength={2}
        keyboardType="numeric"
        value={updateProfile.age}
        onChangeText={(text) => setUpdateProfile({ ...updateProfile, age: text })}
      />

      <TouchableOpacity
        className={`w-64 p-3 rounded-xl absolute bottom-10 ${
          incompleteForm ? `bg-gray-400` : `bg-red-400`
        }`}
        disabled={incompleteForm}
        onPress={updateUserProfile}
      >
        <Text className="text-center text-white text-lg">Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
