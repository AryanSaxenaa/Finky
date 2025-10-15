import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BrutalButton } from '../components/BrutalComponents';
import { FinkyTheme } from '../styles/neoBrutalism';

const PaymentSuccessScreen = ({ route, navigation }) => {
  const { transaction } = route.params;

  const handleDone = () => {
    navigation.navigate('HomeTab');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Ionicons 
            name="checkmark-circle" 
            size={100} 
            color={FinkyTheme.colors.success} 
          />
        </View>

        <Text style={styles.successTitle}>Payment Successful!</Text>
        
        <View style={styles.transactionDetails}>
          <Text style={styles.amountText}>₹{transaction.amount}</Text>
          <Text style={styles.recipientText}>
            Paid to {transaction.merchant}
          </Text>
          {transaction.note && (
            <Text style={styles.noteText}>"{transaction.note}"</Text>
          )}
          <Text style={styles.dateText}>
            {new Date(transaction.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>

        <View style={styles.transactionId}>
          <Text style={styles.transactionIdLabel}>Transaction ID</Text>
          <Text style={styles.transactionIdValue}>
            {transaction.id.substring(0, 16)}...
          </Text>
        </View>

        <BrutalButton
          title="Done"
          onPress={handleDone}
          style={styles.doneButton}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: FinkyTheme.spacing.xl,
  },
  successTitle: {
    fontSize: FinkyTheme.typography.h2,
    fontWeight: FinkyTheme.typography.bold,
    color: FinkyTheme.colors.text,
    marginBottom: FinkyTheme.spacing.xl,
    textAlign: 'center',
  },
  transactionDetails: {
    alignItems: 'center',
    marginBottom: FinkyTheme.spacing.xl,
    padding: FinkyTheme.spacing.lg,
    backgroundColor: FinkyTheme.colors.card,
    borderWidth: FinkyTheme.borders.thick,
    borderColor: FinkyTheme.colors.border,
    borderRadius: FinkyTheme.borders.buttonRadius,
    width: '100%',
  },
  amountText: {
    fontSize: FinkyTheme.typography.h1,
    fontWeight: FinkyTheme.typography.bold,
    color: FinkyTheme.colors.success,
    marginBottom: FinkyTheme.spacing.sm,
  },
  recipientText: {
    fontSize: FinkyTheme.typography.h5,
    color: FinkyTheme.colors.text,
    marginBottom: FinkyTheme.spacing.xs,
  },
  noteText: {
    fontSize: FinkyTheme.typography.body,
    color: FinkyTheme.colors.gray,
    fontStyle: 'italic',
    marginBottom: FinkyTheme.spacing.xs,
  },
  dateText: {
    fontSize: FinkyTheme.typography.caption,
    color: FinkyTheme.colors.gray,
  },
  transactionId: {
    alignItems: 'center',
    marginBottom: FinkyTheme.spacing.xl,
  },
  transactionIdLabel: {
    fontSize: FinkyTheme.typography.caption,
    color: FinkyTheme.colors.gray,
    marginBottom: FinkyTheme.spacing.xs,
  },
  transactionIdValue: {
    fontSize: FinkyTheme.typography.body,
    color: FinkyTheme.colors.text,
    fontFamily: FinkyTheme.typography.mono,
  },
  doneButton: {
    width: '100%',
  },
});

export default PaymentSuccessScreen;