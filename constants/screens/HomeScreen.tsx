import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';

import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const HomeScreen = () => {
  const { logout, user }: Record<string, any> = useAuth();
  const swipeRef: any = useRef();

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [profiles, setProfiles] = useState<any>([]);

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate('Modal');
        }
      }),

    [navigation, user.uid],
  );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      unsub = onSnapshot(collection(db, 'users'), (snapshot) => {
        setProfiles(
          snapshot.docs
            .filter((docc) => docc.id !== user.uid)
            .map((docc) => ({
              id: docc.id,
              ...docc.data(),
            })),
        );
      });
    };

    fetchCards();
    return unsub;
  }, [user.uid]);

  const swipeLeft = (cardIndex: number) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];

    setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id), userSwiped);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const swipeRight = async (cardIndex: number) => {};

  return (
    <SafeAreaView className="flex-1">
      <View className="items-center relative flex-row justify-between px-5 pt-2">
        <TouchableOpacity onPress={logout}>
          <Image source={{ uri: user.photoURL }} className="h-10 w-10 rounded-full" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
          <Image
            source={require('../../assets/images/tinder_logo.png')}
            className="h-12 w-12 rounded-full"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#ff5864" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 -mt-6">
        <Swiper
          cards={profiles}
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
          onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
          onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
          backgroundColor="#4fd0e9"
          renderCard={(card: any) =>
            card ? (
              <View key={card.id} className="bg-white h-3/4 rounded-xl relative">
                <Image
                  source={{ uri: card.photoURL }}
                  className="h-full w-full rounded-xl absolute top-0"
                />
                <View className="bg-white w-full h-20 absolute bottom-0 justify-between items-center flex-row px-6 py-2 rounded-b-xl shadow">
                  <View>
                    <Text className="text-xl font-semibold">{card.displayName}</Text>
                    <Text className="text-base">{card.occupation}</Text>
                  </View>

                  <Text className="text-2xl font-semibold">{card.age}</Text>
                </View>
              </View>
            ) : (
              <View className="relative bg-white h-3/4 rounded-xl justify-center items-center shadow">
                <Text className="font-semibold text-lg pb-5">No more profiles</Text>
                <Image
                  source={{
                    uri: 'https://links.papareact.com/6gb',
                  }}
                  className="h-20 w-full"
                  style={{
                    height: 100,
                    width: 100,
                  }}
                />
              </View>
            )
          }
        />
      </View>

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
