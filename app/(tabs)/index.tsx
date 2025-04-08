import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ScrollView,
} from 'react-native';
// Import message bubble components
import AIMessageBubble from '../../components/AIMessageBubble';
import UserMessageBubble from '../../components/UserMessageBubble';
// Import SmartTag using alias
import SmartTag from '@/components/SmartTag';

// Define Message type
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Salut ! Prêt à trouver ton nouveau chez-toi ?', sender: 'ai' },
    { id: '2', text: 'Oui! Je cherche à acheter.', sender: 'user' },
    { id: '3', text: 'Super! Dans quelle ville ou quartier ?', sender: 'ai' }
  ]);

  const handleSend = () => {
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.mainContainer}>
          {/* Chat Feed Area - Using FlatList */}
          <FlatList
            data={messages}
            renderItem={({ item }: { item: Message }) => (
              <Text style={{
                color: 'black',
                padding: 10,
                alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                marginVertical: 4,
                backgroundColor: item.sender === 'user' ? '#D0E0FF' : '#EEEEEE',
                borderRadius: 10,
                transform: [],
                fontFamily: 'SF-Pro-Regular'
              }}>
                {item.text}
              </Text>
            )}
            keyExtractor={(item: Message) => item.id}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
          />

          {/* Smart Tags Area */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.smartTagsScrollView}
            contentContainerStyle={styles.smartTagsContainer}
          >
            <SmartTag
              text="Acheter"
              gradient={{ colors: ["#8DE473", "#5BCFBC"], locations: [0, 1] }}
              onRemove={() => console.log('Remove Acheter')}
            />
            <SmartTag
              text="Paris, 12th"
              gradient={{ colors: ["#6BD0BA", "#75E8DB"], locations: [0, 1] }}
              onRemove={() => console.log('Remove Paris')}
            />
            <SmartTag
              text="3 Pieces"
              gradient={{ colors: ["#80E4D9", "#6BD8F7"], locations: [0, 1] }}
              onRemove={() => console.log('Remove Pieces')}
            />
          </ScrollView>

          {/* Input Bar Area */}
          <View style={styles.inputBarContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Message Barak..."
              placeholderTextColor="#ACACAC"
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>↑</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: 5,
  },
  smartTagsScrollView: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexGrow: 0,
  },
  smartTagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: '#FFF',
    color: '#222',
    fontFamily: 'SF-Pro-Regular',
    fontSize: 17,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#000',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFF',
    fontFamily: 'SF-Pro-Regular',
    fontSize: 18,
    lineHeight: 20,
  },
});

export default ChatScreen;