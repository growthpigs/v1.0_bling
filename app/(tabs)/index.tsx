import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// Import an icon component if available, e.g., Feather for the send button
// import { Feather } from '@expo/vector-icons';

const ChatScreen = () => {
  // Placeholder state for input - replace with actual state management later
  const [message, setMessage] = React.useState('');

  const handleSend = () => {
    console.log('Sending message:', message);
    // TODO: Implement actual send logic (e.g., API call)
    setMessage(''); // Clear input after sending
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Adjust offset if needed
      >
        <View style={styles.mainContainer}>
          {/* Chat Feed Area */}
          <View style={styles.feedArea}>
            <Text style={styles.feedPlaceholderText}>Chat Feed Area</Text>
            {/* // TODO: Replace with FlatList or ScrollView for actual messages */}
          </View>

          {/* Input Bar Area */}
          <View style={styles.inputBarContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Message Barak..."
              placeholderTextColor="#ACACAC" // Specific placeholder color
              value={message}
              onChangeText={setMessage}
              multiline // Allow multiline input
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              {/* If using an Icon component */}
              {/* <Feather name="arrow-up" size={18} color="#FFF" /> */}
              {/* If using Text temporarily */}
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
    backgroundColor: '#FFF', // Use actual white color
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF', // Use actual white color
    paddingBottom: 5, // Changed from 7
  },
  feedArea: {
    flex: 1, // Takes up available space above input bar
    justifyContent: 'center', // Temporary: Center placeholder
    alignItems: 'center', // Temporary: Center placeholder
    padding: 10,
  },
  feedPlaceholderText: {
    fontSize: 16,
    color: '#222', // Use Primary Text Color
    fontFamily: 'SF-Pro-Regular', // Use loaded font
  },
  inputBarContainer: {
    flexDirection: 'row',
    padding: 10, // Use specified padding
    borderTopWidth: 1, // Use specified border width (though FSD might imply none)
    borderTopColor: '#E5E5EA', // Use Input Border Color
    backgroundColor: '#FFF', // Use actual white color
    alignItems: 'center', // Align items vertically center
  },
  textInput: {
    flex: 1,
    borderWidth: 1, // Use specified border width
    borderColor: '#E5E5EA', // Use Input Border Color
    borderRadius: 8, // Use specified border radius
    paddingHorizontal: 12, // Use specified horizontal padding
    paddingVertical: 8, // Use specified vertical padding
    marginRight: 10,
    backgroundColor: '#FFF', // Use Input Background Color
    color: '#222', // Use Primary Text Color
    fontFamily: 'SF-Pro-Regular', // Use loaded font
    fontSize: 16, // Or adjust based on FSD
    maxHeight: 100, // Optional: Limit automatic height growth for multiline
  },
  sendButton: {
    backgroundColor: '#000', // Use Send Button Background Color
    borderRadius: 18, // Use specified border radius for circle
    width: 36, // Fixed width for circle
    height: 36, // Fixed height for circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    // Style for the temporary text button - might remove if using icon
    color: '#FFF', // Use Send Button Text Color
    fontFamily: 'SF-Pro-Regular', // Use loaded font (or Bold)
    fontSize: 18, // Adjusted size for arrow symbol
    lineHeight: 20, // Adjust line height for centering symbol
  },
});

export default ChatScreen;