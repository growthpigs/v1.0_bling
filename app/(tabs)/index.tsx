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
  Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// Import message bubble components
import AIMessageBubble from '../../components/AIMessageBubble';
import UserMessageBubble from '../../components/UserMessageBubble';
// Import the API service
import * as api from '../../services/api';
import PropertyCardStack from '../../components/PropertyCardStack'; // Import the new stack component
import { Ionicons } from '@expo/vector-icons'; // Make sure Ionicons is imported
// Restore original SmartTag import
import SmartTag from '../../components/SmartTag'; // Keep the correct import

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

// Updated ActiveTagData to include gradient
interface ActiveTagData { 
  id: string;
  text: string;
  gradient: { colors: string[]; locations: number[] };
}

// Define TagData type
interface TagData {
  id: string;
  text: string;
  gradient: { colors: string[]; locations: number[] };
}

// --- Gradient Definitions (Extracted from Builder.io JSON) ---
const tagGradients = [
  { colors: ["#8DE473", "#5BCFBC"], locations: [0, 1] }, // Acheter
  { colors: ["#6BD0BA", "#75E8DB"], locations: [0, 1] }, // Paris,12th
  { colors: ["#80E4D9", "#6BD8F7"], locations: [0, 1] }, // 3 Pieces
  { colors: ["#5BD6F7", "#55C2F0"], locations: [0, 1] }, // Apartment
  { colors: ["#58BFEC", "#46AAFF"], locations: [0, 1] }, // €800k max.
  { colors: ["#49A8FF", "#B1A7FA"], locations: [0, 1] }, // A-Energy
  { colors: ["#B5B0FB", "#C3A1EE"], locations: [0, 1] }, // Balcony
  { colors: ["#CAA0EA", "#D5A6DB"], locations: [0, 1] }, // Ecole
  { colors: ["#DFA0F1", "#F2A0EC"], locations: [0, 1] }, // Près famille
  { colors: ["#F4A1E7", "#F49BC3"], locations: [0, 1] }, // Good Buy
  { colors: ["#F599C5", "#FC7FA9"], locations: [0, 1] }, // Metro
  { colors: ["#FD7CA2", "#F18085"], locations: [0, 1] }  // Extra
];

const ChatScreen = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [activeTags, setActiveTags] = useState<ActiveTagData[]>([]); 

  const handleSend = async () => {
    console.warn("!!!!!! handleSend WAS CALLED !!!!!");
    const currentInput = inputText.trim();
    if (!currentInput) return;

    const userMsgId = Date.now().toString();
    const userMessage: ChatItem = { type: 'userMessage', id: userMsgId, text: currentInput };
    setMessages(prevMessages => [...prevMessages, userMessage]);

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

    setInputText('');
    console.log('[handleSend] Input text cleared.');
    Keyboard.dismiss();

    const responseId = (Date.now() + 1).toString();
    if (response) {
      console.log('[handleSend] Processing successful API response:', response);

      // Update Active Tags state - Map backend response including gradient
      const tagsFromApi = (response.smartTags || []) as {text: string}[];
      const formattedTags: ActiveTagData[] = tagsFromApi.map((tag, index) => ({
          id: `tag-${responseId}-${index}`, // Generate temporary unique ID
          text: tag.text,
          gradient: tagGradients[index % tagGradients.length] // Assign gradient cyclically
      }));
      setActiveTags(formattedTags);
      console.log('[handleSend] Updated activeTags state with formatted data:', formattedTags);

      // Process AI message / properties
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

  const handleRemoveTag = (tagIdToRemove: string) => {
    setActiveTags(currentTags =>
      currentTags.filter(tag => tag.id !== tagIdToRemove)
    );
    console.log(`[handleRemoveTag] Removing tag with id: ${tagIdToRemove}`);
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
        style={styles.keyboardAvoidingContainer}
        keyboardVerticalOffset={0}
      >
        <FlatList
          data={messages}
          renderItem={renderChatItem}
          keyExtractor={(item: ChatItem) => item.id}
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          extraData={messages.length}
          ListHeaderComponent={() => {
            if (messages.length > 1) {
              return (
                  <Text style={styles.dateHeader}>01 RECHERCHE :: 8 AVRIL | 10:54</Text>
              );
            }
            return null;
          }}
        />

        {/* Smart Tags ScrollView */}
        {activeTags && activeTags.length > 0 && (
          <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={styles.smartTagsScrollView} 
              contentContainerStyle={styles.smartTagsContainer} 
          >
              {activeTags.map((tag, index) => ( 
                <SmartTag 
                    key={tag.id} 
                    text={tag.text} 
                    gradient={tag.gradient} 
                    onRemove={() => handleRemoveTag(tag.id)} 
                />
              ))}
          </ScrollView>
        )}
        
        <View style={styles.inputBarContainer}>
            <TextInput
            style={styles.textInput}
            placeholder="Message Barak..."
            placeholderTextColor="#ACACAC"
            value={inputText}
            onChangeText={setInputText}
            multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>↑</Text>
            </TouchableOpacity>
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
  keyboardAvoidingContainer: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
     paddingHorizontal: 10, 
     paddingTop: 10 
  },
  dateHeader: {
    textAlign: 'center',
    paddingVertical: 15,
    fontSize: 12,
    color: '#ACACAC',
    fontFamily: 'SF-Pro-Regular',
    textTransform: 'uppercase',
  },
  tagAreaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E5EA',
  },
  smartTagPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#EFEFF4',
    margin: 4,
    overflow: 'hidden',
  },
  smartTagText: {
    fontSize: 13,
    color: '#007AFF',
    fontFamily: 'SF-Pro-Regular',
  },
  smartTagTextOnGradient: {
     color: '#FFFFFF',
  },
  inputBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#FFF',
    alignItems: 'center',
    marginBottom: 20,
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
  // Restore original Smart Tag container styles (assuming names)
  smartTagsScrollView: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    flexGrow: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E5EA', 
  },
  smartTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: 4,
    gap: 4,
  },
});

export default ChatScreen;