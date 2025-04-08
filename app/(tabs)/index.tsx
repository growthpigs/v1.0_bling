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
import * as api from '../../services/api';
import PropertyCardStack from '../../components/PropertyCardStack'; // Import the new stack component

// Define PropertyData based on PropertyCardStack mock data
interface PropertyData {
  id: string;
  addressLine1: string;
  addressLine2: string;
  price: string;
  area: number;
  rooms: number;
  imageUrl: string;
}

// Define ChatItem union type
interface ChatItem {
  id: string;
  type: 'userMessage' | 'aiMessage' | 'propertyStack';
  text?: string;
  properties?: PropertyData[];
}

// Define TagData type
interface TagData {
  id: string;
  text: string;
  gradient: { colors: string[]; locations: number[] };
}

const ChatScreen = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatItem[]>([]);

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
    const currentInput = inputText.trim();
    if (!currentInput) {
      return;
    }

    const userMsgId = Date.now().toString();

    // Create user message with the new type
    const userMessage: ChatItem = { type: 'userMessage', id: userMsgId, text: currentInput };

    // Update messages state immediately with user message
    setMessages(prevMessages => [
      ...prevMessages,
      userMessage
    ]);

    // Clear input field
    setInputText('');

    try {
      // Assume api.sendChatMessage returns an object like { aiMessage?: string, properties?: PropertyData[] }
      const response = await api.sendChatMessage(currentInput);
      const responseId = (Date.now() + 1).toString();

      if (response.properties && response.properties.length > 0) {
        // If properties are returned, add a propertyStack item
        const propertyStackItem: ChatItem = {
            id: responseId,
            type: 'propertyStack',
            properties: response.properties
        };
        setMessages(prev => [...prev, propertyStackItem]);
      } else if (response.aiMessage) {
         // If only an AI text message is returned
        const aiMessageItem: ChatItem = { 
            id: responseId, 
            type: 'aiMessage', 
            text: response.aiMessage 
        };
        setMessages(prev => [...prev, aiMessageItem]);
      } else {
        // Handle cases where the API might return nothing (optional)
        console.log("API returned no message or properties.");
      }

    } catch (error) {
      console.error("Error sending message or receiving API reply:", error);
      const errorMsgId = (Date.now() + 2).toString();
      // Create error message item
      const errorMessage: ChatItem = {
        id: errorMsgId,
        type: 'aiMessage', // Display error as an AI message
        text: "Désolé, une erreur s'est produite. Veuillez réessayer.",
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
      case 'userMessage':
        return <UserMessageBubble messageText={item.text || ''} />;
      case 'aiMessage':
        return <AIMessageBubble messageText={item.text || ''} />;
      case 'propertyStack':
        // Pass properties to the stack component
        // NOTE: PropertyCardStack needs to be updated to accept/use this prop
        return (
          <View style={{ width: '100%', alignItems: 'center', marginVertical: 16 }}>
            <PropertyCardStack properties={item.properties || []} /> 
          </View>
        );
      default:
        // Ensure exhaustive check or return null
        // const _exhaustiveCheck: never = item;
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
            data={messages}
            renderItem={renderChatItem}
            keyExtractor={(item: ChatItem) => item.id}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
            ListHeaderComponent={() => {
              if (messages.length > 1) {
                return (
                    <Text style={styles.dateHeader}>01 RECHERCHE :: 8 AVRIL | 10:54</Text>
                );
              }
              return null;
            }}
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
              value={inputText}
              onChangeText={setInputText}
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
    marginBottom: 5,
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