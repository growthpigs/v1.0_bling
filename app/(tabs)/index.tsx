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
import PropertyCardStack from '../../components/PropertyCardStack'; // Import the new stack component

// Define ChatItem union type
type ChatItem =
  | { type: 'message'; id: string; text: string; sender: 'user' | 'ai'; }
  | { type: 'propertyStack'; id: string; /* Add other props later if needed */ };

// Define TagData type
interface TagData {
  id: string;
  text: string;
  gradient: { colors: string[]; locations: number[] };
}

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatItem[]>([
    { type: 'message', id: '1', text: 'Salut ! Prêt à trouver ton nouveau chez-toi ?', sender: 'ai' },
    { type: 'message', id: '2', text: 'Oui! Je cherche à acheter.', sender: 'user' },
    { type: 'message', id: '3', text: 'Super! Dans quelle ville ou quartier ?', sender: 'ai' },
    { id: 'stack-1', type: 'propertyStack' }
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

    // Create user message with the new type
    const userMessage: ChatItem = { type: 'message', id: userMsgId, text: sentText, sender: 'user' };

    // Update state
    setMessages(prevMessages => [
      ...prevMessages,
      userMessage
    ]);

    setMessage('');

    try {
      const aiResponseText = await sendChatMessage(sentText);
      const aiMsgId = (Date.now() + 1).toString();

      // Create AI message with the new type
      const aiMessage: ChatItem = { type: 'message', id: aiMsgId, text: aiResponseText, sender: 'ai' };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error sending message or receiving AI reply:", error);
      const errorMsgId = (Date.now() + 2).toString();

      // Create error message with the new type
      const errorMessage: ChatItem = {
        type: 'message',
        id: errorMsgId,
        text: "Sorry, I encountered an error. Please try again.",
        sender: 'ai'
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

  const renderChatItem = ({ item }: { item: ChatItem }) => {
    switch (item.type) {
      case 'message':
        return item.sender === 'ai' ? (
          <AIMessageBubble messageText={item.text} />
        ) : (
          <UserMessageBubble messageText={item.text} />
        );
      case 'propertyStack':
        // Wrap PropertyCardStack in a View to apply margin
        return (
          <View style={{ marginTop: 16 }}>
            <PropertyCardStack />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.mainContainer}>
          <FlatList
            data={messages} // Use the messages state (now ChatItem[])
            renderItem={renderChatItem} // Use the new render function
            keyExtractor={(item: ChatItem) => item.id} // Update type hint
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
            ListHeaderComponent={() => (
              <Text style={styles.dateHeader}>01 RECHERCHE :: 8 AVRIL | 10:54</Text>
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
    fontSize: 12,
    color: '#ACACAC',
    fontFamily: 'SF-Pro-Regular',
    textTransform: 'uppercase',
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