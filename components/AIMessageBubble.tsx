import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface AIMessageBubbleProps {
  messageText: string;
  style?: StyleProp<ViewStyle>;
}

const AIMessageBubble: React.FC<AIMessageBubbleProps> = ({ messageText, style }) => {
  return (
    <View style={[styles.bubbleContainer, style]}>
      <Text style={styles.messageText}>{messageText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    backgroundColor: '#c8e9fd',
    padding: 10,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginVertical: 4,
    maxWidth: '80%',
  },
  messageText: {
    color: '#222',
    fontFamily: 'SF-Pro-Regular',
    fontSize: 16,
  },
});

export default AIMessageBubble; 