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
// Import the API service
import { sendChatMessage } from '../../services/api';

// Define Message type
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

// Define TagData type
interface TagData {
  id: string;
  text: string;
  gradient: { colors: string[]; locations: number[] };
}

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Salut ! Prêt à trouver ton nouveau chez-toi ?', sender: 'ai' },
    { id: '2', text: 'Oui! Je cherche à acheter.', sender: 'user' },
    { id: '3', text: 'Super! Dans quelle ville ou quartier ?', sender: 'ai' }
  ]);

  // State for Smart Tags
  const [displayedTags, setDisplayedTags] = useState<TagData[]>([
    {
      id: 'tag-1',
      text: "Acheter",
      gradient: { colors: ["#8DE473", "#5BCFBC"], locations: [0, 1] }
    },
    {
      id: 'tag-2',
      text: "Paris, 12th",
      gradient: { colors: ["#6BD0BA", "#75E8DB"], locations: [0, 1] }
    },
    {
      id: 'tag-3',
      text: "3 Pieces",
      gradient: { colors: ["#80E4D9", "#6BD8F7"], locations: [0, 1] }
    }
  ]);

  const handleSend = async () => {
    const sentText = message.trim();
    if (!sentText) {
      return;
    }

    const userMsgId = Date.now().toString();

    // Add user message optimistically
    setMessages(prevMessages => [
      ...prevMessages,
      { id: userMsgId, text: sentText, sender: 'user' }
    ]);

    // Clear input
    setMessage('');

    // Call API service and handle response/error
    try {
      const aiResponseText = await sendChatMessage(sentText);
      const aiMsgId = (Date.now() + 1).toString(); // Ensure unique ID
      const aiMessage: Message = { id: aiMsgId, text: aiResponseText, sender: 'ai' };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error sending message or receiving AI reply:", error);
      // Optionally add an error message bubble to the chat
      const errorMsgId = (Date.now() + 2).toString();
      const errorMessage: Message = {
        id: errorMsgId,
        text: "Sorry, I encountered an error. Please try again.",
        sender: 'ai' // Display error as an AI message
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  // Function to remove a tag
  const handleRemoveTag = (tagIdToRemove: string) => {
    setDisplayedTags(currentTags =>
      currentTags.filter(tag => tag.id !== tagIdToRemove)
    );
    console.log(`Removing tag with id: ${tagIdToRemove}`); // Optional log
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
            renderItem={({ item }: { item: Message }) =>
              item.sender === 'ai' ? (
                <AIMessageBubble messageText={item.text} />
              ) : (
                <UserMessageBubble messageText={item.text} />
              )
            }
            keyExtractor={(item: Message) => item.id}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
            ListHeaderComponent={() => (
              <Text style={styles.dateHeader}>01 Récherche :: April 8, 2025 08:03</Text>
            )}
          />

          {/* Smart Tags Area - Render from state */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.smartTagsScrollView}
            contentContainerStyle={styles.smartTagsContainer}
          >
            {displayedTags.map(tag => (
              <SmartTag
                key={tag.id} // Use tag.id as key
                text={tag.text}
                gradient={tag.gradient}
                onRemove={() => handleRemoveTag(tag.id)} // Pass remove handler
              />
            ))}
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
              onSubmitEditing={handleSend}
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
  dateHeader: {
    textAlign: 'center',
    paddingVertical: 15,
    fontSize: 16,
    color: '#ACACAC',
    fontFamily: 'SF-Pro-Regular',
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