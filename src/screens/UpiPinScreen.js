import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BrutalHeader } from '../components/BrutalComponents';
import { useExpenseStore } from '../store';
import { FinkyTheme, NeoBrutalism } from '../styles/neoBrutalism';
import UpiService from '../services/upiService';

const UpiPinScreen = ({ route, navigation }) => {
  const { recipient, amount, note, orderId, orderData } = route.params;
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { addExpense } = useExpenseStore();

  useEffect(() => {
    if (pin.length === 4 && !isProcessing) {
      processUpiPayment();
    }
  }, [pin]);

  const processUpiPayment = async () => {
    setIsProcessing(true);
    
    try {
      console.log('🔐 Processing UPI payment with PIN...');
      
      // Simulate PIN validation delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Process payment through UPI service
      const result = await UpiService.processPayment(
        parseFloat(amount),
        recipient,
        `finky_${Date.now()}`
      );

      if (result.success) {
        // Create transaction record
        const newTransaction = {
          id: result.payment.id,
          description: `UPI Payment to ${recipient}`,
          amount: parseFloat(amount),
          category: 'UPI Payment',
          date: new Date().toISOString().split('T')[0],
          note: note || '',
          merchant: recipient,
          paymentMethod: 'UPI',
          orderId: result.order.id,
          status: 'completed'
        };
        
        addExpense(newTransaction);
        navigation.replace('PaymentSuccess', { 
          transaction: newTransaction,
          paymentResult: result 
        });
      } else {
        // Payment failed
        Alert.alert(
          'Payment Failed',
          result.error || 'The payment could not be processed. Please try again.',
          [
            { text: 'Retry', onPress: () => { setPin(''); setIsProcessing(false); } },
            { text: 'Cancel', onPress: () => navigation.goBack() }
          ]
        );
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('UPI payment processing error:', error);
      Alert.alert(
        'Payment Error',
        'An error occurred while processing your payment. Please try again.',
        [
          { text: 'Retry', onPress: () => { setPin(''); setIsProcessing(false); } },
          { text: 'Cancel', onPress: () => navigation.goBack() }
        ]
      );
      setIsProcessing(false);
    }
  };

  const handleNumberPress = (number) => {
    if (pin.length < 4 && !isProcessing) {
      setPin(prev => prev + number);
    }
  };

  const handleBackspace = () => {
    if (!isProcessing) {
      setPin(prev => prev.slice(0, -1));
    }
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
                disabled={number === '' || isProcessing}
              >
                <Text style={[
                  styles.numberText,
                  isProcessing && styles.disabledText
                ]}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BrutalHeader 
        title="SECURE PAYMENT" 
        subtitle="ENTER YOUR UPI PIN"
        leftIcon={<Ionicons name="lock-closed" size={20} color={NeoBrutalism.colors.white} />}
        textColor="white"
      />
      
      <View style={styles.content}>
        <View style={styles.paymentInfo}>
          <Text style={styles.amountText}>₹{amount}</Text>
          <Text style={styles.recipientText}>to {recipient}</Text>
          {note && <Text style={styles.noteText}>"{note}"</Text>}
        </View>

        <View style={styles.pinSection}>
          <Text style={styles.pinLabel}>
            {isProcessing ? 'Processing Payment...' : 'Enter your 4-digit UPI PIN'}
          </Text>
          {renderPinDots()}
          {isProcessing && (
            <View style={styles.processingContainer}>
              <ActivityIndicator size="large" color={FinkyTheme.colors.primary} />
              <Text style={styles.processingText}>
                Connecting to UPI network...
              </Text>
            </View>
          )}
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
  processingContainer: {
    alignItems: 'center',
    marginTop: FinkyTheme.spacing.lg,
  },
  processingText: {
    fontSize: FinkyTheme.typography.body,
    color: FinkyTheme.colors.gray,
    marginTop: FinkyTheme.spacing.sm,
  },
  disabledText: {
    opacity: 0.5,
  },
});

export default UpiPinScreen;