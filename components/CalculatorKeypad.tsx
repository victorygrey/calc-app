import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CalculatorButton } from './CalculatorButton';

interface CalculatorKeypadProps {
  onButtonPress: (type: string, value: string) => void;
}

const keys = [
  [
    { type: 'function', value: 'AC' },
    { type: 'function', value: '+/-' },
    { type: 'function', value: '%' },
    { type: 'operator', value: '÷' },
  ],
  [
    { type: 'number', value: '7' },
    { type: 'number', value: '8' },
    { type: 'number', value: '9' },
    { type: 'operator', value: '×' },
  ],
  [
    { type: 'number', value: '4' },
    { type: 'number', value: '5' },
    { type: 'number', value: '6' },
    { type: 'operator', value: '-' },
  ],
  [
    { type: 'number', value: '1' },
    { type: 'number', value: '2' },
    { type: 'number', value: '3' },
    { type: 'operator', value: '+' },
  ],
  [
    { type: 'number', value: '0', flex: 2 },
    { type: 'function', value: ',' },
    { type: 'operator', value: '=' },
  ],
];

export const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({ onButtonPress }) => {
  return (
    <View style={styles.keypad}>
      {keys.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((key, idx) => (
            <CalculatorButton
              key={key.value}
              title={key.value}
              onPress={() => onButtonPress(key.type, key.value)}
              style={key.flex ? [styles.button, { flex: key.flex }] : styles.button}
              textStyle={
                key.type === 'operator'
                  ? { color: '#ff9500' }
                  : key.type === 'function'
                  ? { color: '#2196F3' }
                  : {}
              }
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keypad: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
  },
});
