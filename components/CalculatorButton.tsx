import { useThemeColor } from '@/hooks/use-theme-color';
import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemedText } from './themed-text';

interface CalculatorButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const CalculatorButton: React.FC<CalculatorButtonProps> = ({ title, onPress, style, textStyle }) => {
  const backgroundColor = useThemeColor({}, 'background');
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.85,
      useNativeDriver: true,
      speed: 80,
      bounciness: 8,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }], shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.10, shadowRadius: 4, elevation: 2 }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.button, { backgroundColor }]}
        android_ripple={{ color: '#00000019', borderless: false }}
      >
        <ThemedText style={[styles.text, textStyle]}>{title}</ThemedText>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    overflow: 'hidden',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
