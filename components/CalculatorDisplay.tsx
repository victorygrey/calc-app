import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CalculatorDisplayProps {
  value: string;
}

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
    </View>
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
