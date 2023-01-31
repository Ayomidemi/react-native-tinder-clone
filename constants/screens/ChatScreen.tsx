import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import ChatList from '../components/ChatList';

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Header title="Chat" />
        <ChatList />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
