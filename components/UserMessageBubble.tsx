import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface UserMessageBubbleProps {
  messageText: string;
  style?: StyleProp<ViewStyle>;
}

const UserMessageBubble: React.FC<UserMessageBubbleProps> = ({ messageText, style }) => {
  return (
    <View style={[styles.bubbleContainer, style]}>
      <Text style={styles.messageText}>{messageText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    backgroundColor: '#E5E5EA', // Changed from #c8e9fd (light grey)
    padding: 10,
    borderRadius: 15,
    alignSelf: 'flex-end', // Align to the right
    marginVertical: 4,
    maxWidth: '80%', // Prevent bubble from taking full width
  },
  messageText: {
    color: '#222', // Ensure dark text color
    fontFamily: 'SF-Pro-Regular',
    fontSize: 16, // Standard text size
  },
});

export default UserMessageBubble; 