import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface CalculatorDisplayProps {
  value: string;
}

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ value }) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 16,
    marginBottom: 8,
  },
  displayText: {
    fontSize: 48,
    fontWeight: '200',
    color: '#222',
  },
});
