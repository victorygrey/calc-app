import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemedText } from './themed-text';

interface CalculatorButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const CalculatorButton: React.FC<CalculatorButtonProps> = ({ title, onPress, style, textStyle }) => {
  // Mendapatkan warna button/text sesuai tema
  const backgroundColor = useThemeColor({}, 'background');
  // Butuh perbedaan warna untuk operator/function/number akan tetap dihandle dari parent

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }, style]} onPress={onPress} activeOpacity={0.7}>
      <ThemedText style={[styles.text, textStyle]}>{title}</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    // backgroundColor handled by theme
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
  },
  text: {
    fontSize: 24,
    // color: '#222',
    fontWeight: 'bold',
  },
});
