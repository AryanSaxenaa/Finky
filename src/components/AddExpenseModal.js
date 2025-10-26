import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { useExpenseStore } from '../store/index.js';
import { 
  BrutalCard, 
  BrutalButton, 
  BrutalHeader,
  brutalTextStyle 
} from './BrutalComponents';
import { NeoBrutalism } from '../styles/neoBrutalism';

export default function AddExpenseModal({ visible, onClose }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const { categories, addExpense } = useExpenseStore();

  // Reset form when modal opens
  useEffect(() => {
    if (visible) {
      setAmount('');
      setDescription('');
      setSelectedCategoryIndex(null);
      setShowCategoryPicker(false);
      setDate(new Date().toLocaleDateString());
    }
  }, [visible]);

  const handleCategorySelect = (index) => {
    setSelectedCategoryIndex(index);
    setShowCategoryPicker(false);
  };

  const handleSave = () => {
    if (!amount || selectedCategoryIndex === null) {
      return;
    }
    const expense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category: categories[selectedCategoryIndex],
      description,
      date: new Date().toISOString(),
    };
    addExpense(expense);
    onClose();
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      avoidKeyboard={true}
      backdropOpacity={0.5}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[brutalTextStyle('h5', 'bold', 'white'), styles.headerTitle]}>
            ADD EXPENSE
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={NeoBrutalism.colors.white} />
          </TouchableOpacity>
        </View>

          <ScrollView 
            style={styles.form}
            contentContainerStyle={styles.formContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.inputContainer}>
              <Text style={brutalTextStyle('body', 'bold', 'black')}>AMOUNT (₹)</Text>
              <TextInput
                style={styles.directInput}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor={NeoBrutalism.colors.gray}
                keyboardType="numeric"
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={brutalTextStyle('body', 'bold', 'black')}>CATEGORY</Text>
              <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => setShowCategoryPicker(true)}
              >
                <Text style={brutalTextStyle('body', 'medium', 'black')}>
                  {selectedCategoryIndex !== null 
                    ? categories[selectedCategoryIndex].toUpperCase()
                    : 'SELECT CATEGORY'}
                </Text>
                <Ionicons name="chevron-down" size={20} color={NeoBrutalism.colors.black} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={brutalTextStyle('body', 'bold', 'black')}>DESCRIPTION</Text>
              <TextInput
                style={[styles.directInput, styles.multilineDirectInput]}
                value={description}
                onChangeText={setDescription}
                placeholder="Description (optional)"
                placeholderTextColor={NeoBrutalism.colors.gray}
                multiline
                numberOfLines={3}
                returnKeyType="done"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={brutalTextStyle('body', 'bold', 'black')}>DATE</Text>
              <View style={styles.dateDisplay}>
                <Ionicons name="calendar" size={20} color={NeoBrutalism.colors.black} />
                <Text style={brutalTextStyle('body', 'medium', 'black')}>
                  {date}
                </Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <BrutalButton
              title="CANCEL"
              variant="outline"
              style={styles.button}
              onPress={onClose}
            />
            <BrutalButton
              title="SAVE"
              style={styles.button}
              onPress={handleSave}
              disabled={!amount || selectedCategoryIndex === null}
            />
          </View>
        </View>

        {/* Category Picker Modal */}
        <Modal
          isVisible={showCategoryPicker}
          onBackdropPress={() => setShowCategoryPicker(false)}
          onBackButtonPress={() => setShowCategoryPicker(false)}
          style={styles.categoryModal}
        >
          <BrutalCard style={styles.categoryContainer}>
            <Text style={[brutalTextStyle('h6', 'bold', 'black'), styles.categoryTitle]}>SELECT CATEGORY</Text>
            <ScrollView 
              style={styles.categoryScrollContainer}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            >
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryOption}
                  onPress={() => handleCategorySelect(index)}
                >
                  <Text style={[brutalTextStyle('body', 'medium', 'black'), styles.categoryText]}>{category.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </BrutalCard>
        </Modal>


    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: NeoBrutalism.colors.background,
    margin: NeoBrutalism.spacing.lg,
    borderWidth: NeoBrutalism.borders.thick,
    borderColor: NeoBrutalism.colors.black,
    maxHeight: '80%',
    minHeight: '60%',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: NeoBrutalism.spacing.lg,
    paddingVertical: NeoBrutalism.spacing.md,
    backgroundColor: NeoBrutalism.colors.darkBlue,
    borderBottomWidth: NeoBrutalism.borders.thick,
    borderBottomColor: NeoBrutalism.colors.black,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    minWidth: 40,
  },
  form: {
    flex: 1,
  },
  formContent: {
    paddingHorizontal: NeoBrutalism.spacing.lg,
    paddingTop: NeoBrutalism.spacing.lg,
    paddingBottom: NeoBrutalism.spacing.xl,
  },
  inputContainer: {
    marginBottom: 20,
  },

  categoryButton: {
    borderWidth: NeoBrutalism.borders.medium,
    borderColor: NeoBrutalism.colors.black,
    backgroundColor: NeoBrutalism.colors.neonYellow,
    padding: NeoBrutalism.spacing.md,
    marginTop: NeoBrutalism.spacing.sm,
    minHeight: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  directInput: {
    borderWidth: NeoBrutalism.borders.medium,
    borderColor: NeoBrutalism.colors.black,
    backgroundColor: NeoBrutalism.colors.white,
    padding: NeoBrutalism.spacing.md,
    marginTop: NeoBrutalism.spacing.sm,
    minHeight: 50,
    fontSize: 16,
    fontWeight: '600',
    color: NeoBrutalism.colors.black,
  },
  multilineDirectInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  dateDisplay: {
    borderWidth: NeoBrutalism.borders.medium,
    borderColor: NeoBrutalism.colors.black,
    backgroundColor: NeoBrutalism.colors.lightGray,
    padding: NeoBrutalism.spacing.md,
    marginTop: NeoBrutalism.spacing.sm,
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: NeoBrutalism.spacing.sm,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: NeoBrutalism.spacing.lg,
    paddingBottom: NeoBrutalism.spacing.lg,
    paddingTop: NeoBrutalism.spacing.md,
    gap: NeoBrutalism.spacing.md,
    backgroundColor: NeoBrutalism.colors.background, // Ensure background
    borderTopWidth: NeoBrutalism.borders.thin,
    borderTopColor: NeoBrutalism.colors.black,
  },
  button: {
    flex: 1,
  },
  categoryModal: {
    justifyContent: 'center',
    margin: 20,
  },
  categoryContainer: {
    backgroundColor: NeoBrutalism.colors.background,
    borderWidth: NeoBrutalism.borders.thick,
    borderColor: NeoBrutalism.colors.black,
    padding: NeoBrutalism.spacing.lg,
    maxHeight: '60%', // Reduced height to prevent overflow
    minHeight: 200, // Minimum height for usability
  },
  categoryTitle: {
    marginBottom: NeoBrutalism.spacing.md,
    textAlign: 'center',
  },
  categoryScrollContainer: {
    flex: 1,
    maxHeight: 250, // Fixed max height for scrolling
  },
  categoryOption: {
    padding: NeoBrutalism.spacing.sm,
    borderWidth: NeoBrutalism.borders.medium,
    borderColor: NeoBrutalism.colors.black,
    backgroundColor: NeoBrutalism.colors.background,
    marginBottom: NeoBrutalism.spacing.xs,
    minHeight: 44, // Minimum touch target size
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
  },

});