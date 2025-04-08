import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface UserMessageBubbleProps {
  messageText: string;
}

const UserMessageBubble: React.FC<UserMessageBubbleProps> = ({ messageText }) => {
  return (
    <View style={styles.bubbleContainer}>
      <Text style={styles.messageText}>{messageText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    backgroundColor: '#007AFF', // Blue background
    padding: 10,
    borderRadius: 15,
    alignSelf: 'flex-end', // Align to the right
    marginVertical: 4,
    maxWidth: '80%', // Prevent bubble from taking full width
  },
  messageText: {
    color: '#FFF', // White text color
    fontFamily: 'SF-Pro-Regular',
    fontSize: 16, // Standard text size
  },
});

export default UserMessageBubble; 