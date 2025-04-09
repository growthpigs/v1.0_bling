import React, { useState, useEffect } from 'react';
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
  Button,
  Alert,
} from 'react-native';
// Import message bubble components
import AIMessageBubble from '../../components/AIMessageBubble';
import UserMessageBubble from '../../components/UserMessageBubble';
// Import SmartTag using alias
import SmartTag from '@/components/SmartTag';
// Import the API service
import * as api from '../../services/api';
import PropertyCardStack from '../../components/PropertyCardStack'; // Import the new stack component
import { Ionicons } from '@expo/vector-icons'; // Make sure Ionicons is imported

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

  // Initialize Smart Tags state as empty array
  const [displayedTags, setDisplayedTags] = useState<TagData[]>([]);

  const handleSend = async () => {
    const currentInput = inputText.trim();
    if (!currentInput) {
      return;
    }

    const userMsgId = Date.now().toString();

    // Create user message
    const userMessage: ChatItem = { type: 'userMessage', id: userMsgId, text: currentInput };

    // Update messages state immediately with user message
    setMessages(prevMessages => [
      ...prevMessages,
      userMessage
    ]);

    // **Call API *before* clearing input**
    let response;
    try {
      response = await api.sendChatMessage(currentInput);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMsgId = (Date.now() + 2).toString();
      const errorMessage: ChatItem = {
        id: errorMsgId,
        type: 'aiMessage',
        text: "Désolé, une erreur s'est produite lors de l'envoi. Veuillez réessayer.",
      };
      setMessages(prev => [...prev, errorMessage]);
      return; // Exit if sending failed
    }

    // Clear input field **after** API call starts/succeeds
    setInputText('');

    // Process the response (if successful)
    const responseId = (Date.now() + 1).toString();
    if (response) { // Check if response exists (API call didn't throw error)
        console.log('[handleSend] Processing successful API response:', response);
        if (response.properties && response.properties.length > 0) {
          const propertyStackItem: ChatItem = {
              id: responseId,
              type: 'propertyStack',
              properties: response.properties
          };
          console.log('[handleSend] Adding property stack item to state');
          setMessages(prev => {
             console.log('[setMessages] Adding propertyStack. Prev state length:', prev.length);
             const newState = [...prev, propertyStackItem];
             console.log('[setMessages] New state length:', newState.length);
             return newState;
          });
        } else if (response.aiMessage) {
          const aiMessageItem: ChatItem = { 
              id: responseId, 
              type: 'aiMessage', 
              text: response.aiMessage 
          };
          console.log('[handleSend] Adding AI message item to state:', aiMessageItem);
          setMessages(prev => {
             console.log('[setMessages] Adding aiMessage. Prev state length:', prev.length);
             const newState = [...prev, aiMessageItem];
             console.log('[setMessages] New state length:', newState.length);
             return newState;
          });
        } else {
          console.log("[handleSend] API returned no message or properties, adding default.");
          // Optionally add a default AI message if response is empty but successful
          const emptySuccessMsg: ChatItem = {
            id: responseId,
            type: 'aiMessage',
            text: "J'ai bien reçu votre message.", // Example message
          };
          setMessages(prev => {
             console.log('[setMessages] Adding default empty success. Prev state length:', prev.length);
             const newState = [...prev, emptySuccessMsg];
             console.log('[setMessages] New state length:', newState.length);
             return newState;
          });
        }
    } else {
        console.log('[handleSend] Response object was null/undefined after API call.');
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

  const handleSimpleTestLog = () => {
    console.log("--- Simple Test Button Pressed ---");
    Alert.alert("Simple Log Test", "Check Metro terminal for log message.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={-10}
      >
        <View style={styles.mainContainer}>
          {/* Simple Log Test Button - Removed for clarity */}
          {/* <Button title="Run Simple Log Test" onPress={handleSimpleTestLog} /> */}

          {/* Test Buttons - REMOVED */}
          {/* 
          <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E5E5EA', flexDirection: 'row', justifyContent: 'space-around' }}>
             <Button title="Test Proxy Health" onPress={api.testProxyHealth} /> 
             <Button title="Test HTTPBin POST" onPress={api.testHttpbin} /> 
          </View>
          */}

          <FlatList
            data={messages}
            renderItem={renderChatItem}
            keyExtractor={(item: ChatItem) => item.id}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
            extraData={messages.length} // Added extraData prop
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
    marginBottom: 13,
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
  testButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});

export default ChatScreen;