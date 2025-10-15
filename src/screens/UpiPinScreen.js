import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrutalHeader } from '../components/BrutalComponents';
import { useExpenseStore } from '../store';
import { FinkyTheme } from '../styles/neoBrutalism';

const UpiPinScreen = ({ route, navigation }) => {
  const { recipient, amount, note } = route.params;
  const [pin, setPin] = useState('');
  const { addExpense } = useExpenseStore();

  useEffect(() => {
    if (pin.length === 4) {
      setTimeout(() => {
        const newTransaction = {
          id: new Date().toISOString(),
          description: `Paid to ${recipient}`,
          amount: parseFloat(amount),
          category: 'UPI Payment',
          date: new Date().toISOString().split('T')[0],
          note: note || '',
          merchant: recipient,
        };
        
        addExpense(newTransaction);
        navigation.replace('PaymentSuccess', { transaction: newTransaction });
      }, 500);
    }
  }, [pin]);

  const handleNumberPress = (number) => {
    if (pin.length < 4) {
      setPin(prev => prev + number);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const renderPinDots = () => {
    return (
      <View style={styles.pinContainer}>
        {[0, 1, 2, 3].map(index => (
          <View
            key={index}
            style={[
              styles.pinDot,
              { backgroundColor: index < pin.length ? FinkyTheme.colors.primary : FinkyTheme.colors.lightGray }
            ]}
          />
        ))}
      </View>
    );
  };

  const renderNumberPad = () => {
    const numbers = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      ['', 0, '⌫']
    ];

    return (
      <View style={styles.numberPad}>
        {numbers.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.numberRow}>
            {row.map((number, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                style={[
                  styles.numberButton,
                  number === '' && styles.emptyButton
                ]}
                onPress={() => {
                  if (number === '⌫') {
                    handleBackspace();
                  } else if (number !== '') {
                    handleNumberPress(number.toString());
                  }
                }}
                disabled={number === ''}
              >
                <Text style={styles.numberText}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BrutalHeader title="Enter UPI PIN" />
      
      <View style={styles.content}>
        <View style={styles.paymentInfo}>
          <Text style={styles.amountText}>₹{amount}</Text>
          <Text style={styles.recipientText}>to {recipient}</Text>
          {note && <Text style={styles.noteText}>"{note}"</Text>}
        </View>

        <View style={styles.pinSection}>
          <Text style={styles.pinLabel}>Enter your 4-digit UPI PIN</Text>
          {renderPinDots()}
        </View>

        {renderNumberPad()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FinkyTheme.colors.background,
  },
  content: {
    flex: 1,
    padding: FinkyTheme.spacing.md,
    justifyContent: 'space-between',
  },
  paymentInfo: {
    alignItems: 'center',
    marginTop: FinkyTheme.spacing.xl,
  },
  amountText: {
    fontSize: FinkyTheme.typography.h1,
    fontWeight: FinkyTheme.typography.bold,
    color: FinkyTheme.colors.text,
    marginBottom: FinkyTheme.spacing.sm,
  },
  recipientText: {
    fontSize: FinkyTheme.typography.h5,
    color: FinkyTheme.colors.gray,
    marginBottom: FinkyTheme.spacing.xs,
  },
  noteText: {
    fontSize: FinkyTheme.typography.body,
    color: FinkyTheme.colors.gray,
    fontStyle: 'italic',
  },
  pinSection: {
    alignItems: 'center',
    marginVertical: FinkyTheme.spacing.xl,
  },
  pinLabel: {
    fontSize: FinkyTheme.typography.h6,
    color: FinkyTheme.colors.text,
    marginBottom: FinkyTheme.spacing.lg,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: FinkyTheme.spacing.md,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: FinkyTheme.colors.border,
  },
  numberPad: {
    alignItems: 'center',
  },
  numberRow: {
    flexDirection: 'row',
    marginBottom: FinkyTheme.spacing.sm,
  },
  numberButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: FinkyTheme.colors.card,
    borderWidth: FinkyTheme.borders.medium,
    borderColor: FinkyTheme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: FinkyTheme.spacing.sm,
  },
  emptyButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  numberText: {
    fontSize: FinkyTheme.typography.h3,
    fontWeight: FinkyTheme.typography.bold,
    color: FinkyTheme.colors.text,
  },
});

export default UpiPinScreen;