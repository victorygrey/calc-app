import { CalculatorDisplay } from '@/components/CalculatorDisplay';
import { CalculatorKeypad } from '@/components/CalculatorKeypad';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

function operate(a: number, b: number, operator: string): number {
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? NaN : a / b;
    default: return b;
  }
}

export default function CalculatorScreen() {
  const [display, setDisplay] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  
  const handleButtonPress = (type: string, value: string) => {
    if (type === 'number') {
      if (waitingForOperand) {
        setDisplay(value);
        setWaitingForOperand(false);
      } else {
        setDisplay(display === '0' ? value : display + value);
      }
    } else if (type === 'operator') {
      if (value === '=') {
        if (operator && firstValue !== null) {
          const result = operate(parseFloat(firstValue.replace(',', '.')), parseFloat(display.replace(',', '.')), operator);
          setDisplay(Number.isFinite(result) ? result.toString().replace('.', ',') : 'Error');
          setFirstValue(null);
          setOperator(null);
        }
      } else {
        setOperator(value);
        setFirstValue(display);
        setWaitingForOperand(true);
      }
    } else if (type === 'function') {
      if (value === 'AC') {
        setDisplay('0');
        setFirstValue(null);
        setOperator(null);
      } else if (value === '+/-') {
        if (display !== '0') {
          setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
        }
      } else if (value === '%') {
        const num = parseFloat(display.replace(',', '.')) / 100;
        setDisplay(num.toString().replace('.', ','));
      } else if (value === ',') {
        if (!display.includes(',')) {
          setDisplay(display + ',');
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <CalculatorDisplay value={display} />
      <CalculatorKeypad onButtonPress={handleButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
});
