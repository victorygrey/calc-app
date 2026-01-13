import { CalculatorDisplay } from '@/components/CalculatorDisplay';
import { CalculatorKeypad } from '@/components/CalculatorKeypad';
import { ThemedView } from '@/components/themed-view';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function operate(a: number, b: number, operator: string): number {
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? NaN : a / b;
    default: return b;
  }
}

interface HistoryItem {
  expression: string;
  result: string;
}

import { useThemeColor } from '@/hooks/use-theme-color';

function HistoryList({ history, onClear }: { history: HistoryItem[], onClear: () => void }) {
  const expColor = useThemeColor({}, 'text');
  const resultColor = useThemeColor({}, 'text');
  return (
    <View style={{marginBottom: 6}}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 3, paddingHorizontal: 18}}>
        {history.length > 0 && (
          <Text onPress={onClear} style={{color: resultColor, fontWeight:'bold', fontSize:15, opacity: 0.85, paddingHorizontal:8, paddingVertical:2, borderRadius: 8, backgroundColor:'#00000011', overflow:'hidden'}}>Clear History</Text>
        )}
      </View>
      <FlatList
        data={history}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={[styles.historyExp, { color: expColor }]}>{item.expression}</Text>
            <Text style={[styles.historyResult, { color: resultColor }]}>= {item.result}</Text>
          </View>
        )}
        style={styles.historyList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default function CalculatorScreen() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colorScheme === 'dark' ? '#151718' : '#fff');
  }, [colorScheme]);

  const [display, setDisplay] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

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
          const resultStr = Number.isFinite(result) ? result.toString().replace('.', ',') : 'Error';
          setDisplay(resultStr);
          setFirstValue(null);
          setOperator(null);
          setHistory(prev => [
            { expression: `${firstValue} ${operator} ${display}`, result: resultStr },
            ...prev.slice(0, 9) // max 10 history
          ]);
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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} backgroundColor="transparent" translucent />
      <ThemedView style={styles.container}>
        {/* HISTORY */}
        <HistoryList history={history} onClear={() => setHistory([])} />
        <CalculatorDisplay value={display} />
        <CalculatorKeypad onButtonPress={handleButtonPress} />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  historyList: {
    flexGrow: 0,
    maxHeight: 116,
    marginBottom: 12,
    paddingHorizontal: 18,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 2,
  },
  historyExp: {
    color: '#888',
    fontSize: 15,
    marginRight: 8,
  },
  historyResult: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    minWidth: 45,
    textAlign: 'right',
  },
});
