import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BrutalButton } from './BrutalComponents';
import { FinkyTheme } from '../styles/neoBrutalism';

const AIGuardianModal = ({ isVisible, aiMessage, onConfirm, onCancel }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Ionicons 
              name="shield-checkmark" 
              size={40} 
              color={FinkyTheme.colors.primary} 
            />
            <Text style={styles.title}>Finky Guardian</Text>
          </View>

          <View style={styles.messageContainer}>
            <Text style={styles.aiMessage}>{aiMessage}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <BrutalButton
              title="Cancel & Save"
              onPress={onCancel}
              style={[styles.button, styles.saveButton]}
              textStyle={styles.saveButtonText}
            />
            
            <BrutalButton
              title="Confirm Payment"
              onPress={onConfirm}
              style={[styles.button, styles.confirmButton]}
              textStyle={styles.confirmButtonText}
            />
          </View>

          <View style={styles.xpInfo}>
            <Ionicons 
              name="star" 
              size={16} 
              color={FinkyTheme.colors.accent} 
            />
            <Text style={styles.xpText}>
              Save now and earn 50 XP!
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: FinkyTheme.spacing.md,
  },
  modalContainer: {
    backgroundColor: FinkyTheme.colors.card,
    borderWidth: FinkyTheme.borders.thick,
    borderColor: FinkyTheme.colors.border,
    borderRadius: FinkyTheme.borders.buttonRadius,
    padding: FinkyTheme.spacing.lg,
    width: '100%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: FinkyTheme.spacing.lg,
  },
  title: {
    fontSize: FinkyTheme.typography.h4,
    fontWeight: FinkyTheme.typography.bold,
    color: FinkyTheme.colors.text,
    marginLeft: FinkyTheme.spacing.sm,
  },
  messageContainer: {
    backgroundColor: FinkyTheme.colors.background,
    borderWidth: FinkyTheme.borders.medium,
    borderColor: FinkyTheme.colors.border,
    borderRadius: FinkyTheme.borders.buttonRadius,
    padding: FinkyTheme.spacing.md,
    marginBottom: FinkyTheme.spacing.lg,
  },
  aiMessage: {
    fontSize: FinkyTheme.typography.body,
    color: FinkyTheme.colors.text,
    lineHeight: 22,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: FinkyTheme.spacing.sm,
    marginBottom: FinkyTheme.spacing.md,
  },
  button: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: FinkyTheme.colors.primary,
  },
  saveButtonText: {
    color: FinkyTheme.colors.white,
  },
  confirmButton: {
    backgroundColor: FinkyTheme.colors.accent,
  },
  confirmButtonText: {
    color: FinkyTheme.colors.white,
  },
  xpInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: FinkyTheme.spacing.xs,
  },
  xpText: {
    fontSize: FinkyTheme.typography.caption,
    color: FinkyTheme.colors.accent,
    fontWeight: FinkyTheme.typography.semiBold,
  },
});

export default AIGuardianModal;