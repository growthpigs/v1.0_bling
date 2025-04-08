import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AIMessageBubbleProps {
  messageText: string;
}

const AIMessageBubble: React.FC<AIMessageBubbleProps> = ({ messageText }) => {
  return (
    <View style={styles.bubbleContainer}>
      <Text style={styles.messageText}>{messageText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    backgroundColor: '#E5E5EA', // Light grey background
    padding: 10,
    borderRadius: 15,
    alignSelf: 'flex-start', // Align to the left
    marginVertical: 4,
    maxWidth: '80%', // Prevent bubble from taking full width
  },
  messageText: {
    color: '#222', // Primary text color
    fontFamily: 'SF-Pro-Regular',
    fontSize: 16, // Standard text size
  },
});

export default AIMessageBubble; 