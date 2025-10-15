import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrutalHeader, BrutalInput, BrutalButton } from '../components/BrutalComponents';
import AIGuardianModal from '../components/AIGuardianModal';
import { useGameStore } from '../store';
import { FinkyTheme } from '../styles/neoBrutalism';
import UpiService from '../services/upiService';

const UpiPaymentScreen = ({ navigation }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [aiResponse, setAiResponse] = useState('Analyzing your spending...');
  
  const { addXP } = useGameStore();

  const handleProceed = async () => {
    if (!recipient || !amount) {
      Alert.alert('Missing Information', 'Please enter recipient and amount.');
      return;
    }

    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    // Validate UPI ID format
    if (!UpiService.isValidVPA(recipient)) {
      Alert.alert('Invalid UPI ID', 'Please enter a valid UPI ID (e.g., user@paytm)');
      return;
    }

    setModalVisible(true);
    
    // AI analysis with UPI context
    const amountNum = parseFloat(amount);
    let response = '';
    
    if (amountNum > 500) {
      response = `This ₹${amount} UPI payment is quite significant. Have you considered if this aligns with your financial goals? You could save this amount instead and earn rewards!`;
    } else if (amountNum > 100) {
      response = `₹${amount} for this UPI payment - is this a priority expense right now? Saving this could boost your Finky score!`;
    } else {
      response = `₹${amount} is a small amount, but every rupee saved counts towards your financial wellness. Consider if this purchase is necessary.`;
    }
    
    // Add sandbox testing hint
    if (recipient.includes('@razorpay')) {
      response += `\n\n💡 Using sandbox UPI ID: ${recipient}`;
    }
    
    setAiResponse(response);
  };

  const onConfirmPayment = async () => {
    setModalVisible(false);
    
    // Create UPI order first
    try {
      const order = await UpiService.createOrder(parseFloat(amount), `finky_${Date.now()}`);
      navigation.navigate('UpiPin', { 
        recipient, 
        amount, 
        note, 
        orderId: order.id,
        orderData: order 
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to create payment order. Please try again.');
      console.error('Order creation failed:', error);
    }
  };

  const onCancelAndSave = () => {
    setModalVisible(false);
    addXP(50); // Award 50 XP for saving
    Alert.alert(
      'Great Choice!', 
      'You earned 50 XP for choosing to save instead of spend. Your future self will thank you!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BrutalHeader title="Send Money" />
      
      <View style={styles.content}>
        <BrutalInput 
          placeholder="Recipient's UPI ID" 
          value={recipient} 
          onChangeText={setRecipient}
          style={styles.input}
        />
        
        <View style={styles.testHint}>
          <Text style={styles.testHintText}>
            💡 Test UPI IDs: success@razorpay, failure@razorpay
          </Text>
        </View>
        
        <BrutalInput 
          placeholder="Amount (₹)" 
          value={amount} 
          onChangeText={setAmount} 
          keyboardType="numeric"
          style={styles.input}
        />
        
        <BrutalInput 
          placeholder="Note (Optional)" 
          value={note} 
          onChangeText={setNote}
          style={styles.input}
        />
        
        <BrutalButton 
          title="Proceed" 
          onPress={handleProceed}
          style={styles.proceedButton}
        />
      </View>

      <AIGuardianModal
        isVisible={isModalVisible}
        aiMessage={aiResponse}
        onConfirm={onConfirmPayment}
        onCancel={onCancelAndSave}
      />
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
  },
  input: {
    marginBottom: FinkyTheme.spacing.md,
  },
  proceedButton: {
    marginTop: FinkyTheme.spacing.lg,
  },
  testHint: {
    backgroundColor: FinkyTheme.colors.background,
    padding: FinkyTheme.spacing.sm,
    borderRadius: FinkyTheme.borders.buttonRadius,
    marginBottom: FinkyTheme.spacing.sm,
  },
  testHintText: {
    fontSize: FinkyTheme.typography.caption,
    color: FinkyTheme.colors.gray,
    textAlign: 'center',
  },
});

export default UpiPaymentScreen;