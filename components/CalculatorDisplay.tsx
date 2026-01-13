import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface CalculatorDisplayProps {
  value: string;
}

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ value }) => {
  // Menampilkan sampai 18 digit, dan biarkan font mengecil otomatis
  const maxLen = 18;
  const displayValue = value.length > maxLen ? value.slice(0, maxLen-1) + '…' : value;
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" numberOfLines={1} adjustsFontSizeToFit style={styles.displayText}>
        {displayValue}
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
    fontSize: 41,
    fontWeight: '200',
  },
});
