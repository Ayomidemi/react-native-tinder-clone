import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React, { useRef } from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';

import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';

const HomeScreen = () => {
  const { logout, user }: Record<string, any> = useAuth();
  const swipeRef: any = useRef();

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  // console.log(user);

  return (
    <SafeAreaView className="flex-1">
      {/* Header */}

      <View className="items-center relative flex-row justify-between px-5 pt-2">
        <TouchableOpacity onPress={logout}>
          <Image source={{ uri: user.photoURL }} className="h-10 w-10 rounded-full" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('../../assets/images/tinder_logo.png')}
            className="h-12 w-12 rounded-full"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#ff5864" />
        </TouchableOpacity>
      </View>

      {/* Enf of Header */}

      {/* Cards */}
      <View className="flex-1 -mt-6">
        <Swiper
          cards={profileData}
          ref={swipeRef}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          containerStyle={{ backgroundColor: 'transparent' }}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  textAlign: 'right',
                  color: '#FF7276',
                },
              },
            },
            right: {
              title: 'MATCH',
              style: {
                label: {
                  color: '#90EE90',
                },
              },
            },
          }}
          onSwipedLeft={() => console.log('swipe nope')}
          onSwipedRight={() => console.log('swipe match')}
          backgroundColor="#4fd0e9"
          renderCard={(card) => (
            <View key={card.id} className="bg-white h-3/4 rounded-xl relative">
              <Image
                source={{ uri: card.photoURL }}
                className="h-full w-full rounded-xl absolute top-0"
              />
              <View className="bg-white w-full h-20 absolute bottom-0 justify-between items-center flex-row px-6 py-2 rounded-b-xl shadow">
                <View>
                  <Text className="text-xl font-semibold">
                    {card.firstName} {card.lastName}
                  </Text>
                  <Text className="text-base">{card.occupation}</Text>
                </View>

                <Text className="text-2xl font-semibold">{card.age}</Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* Enf of Cards */}

      <View className="flex-row justify-evenly">
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          className="items-center justify-center rounded-full w-16 h-16 bg-red-200"
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const profileData = [
  {
    id: 123,
    firstName: 'David',
    lastName: 'Ade',
    occupation: 'Model',
    age: '26',
    photoURL:
      'https://images.pexels.com/photos/936119/pexels-photo-936119.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 385,
    firstName: 'Pease',
    lastName: 'Clay',
    occupation: 'Writer',
    age: '24',
    photoURL:
      'https://images.pexels.com/photos/227294/pexels-photo-227294.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 567,
    firstName: 'Scott',
    lastName: 'Patterson',
    occupation: 'Lawyer',
    age: '22',
    photoURL:
      'https://images.pexels.com/photos/3183824/pexels-photo-3183824.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];
