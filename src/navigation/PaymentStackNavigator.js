import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpiPaymentScreen from '../screens/UpiPaymentScreen';
import UpiPinScreen from '../screens/UpiPinScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';

const PaymentStack = createNativeStackNavigator();

export default function PaymentStackNavigator() {
  return (
    <PaymentStack.Navigator screenOptions={{ headerShown: false }}>
      <PaymentStack.Screen name="UpiPayment" component={UpiPaymentScreen} />
      <PaymentStack.Screen name="UpiPin" component={UpiPinScreen} />
      <PaymentStack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
    </PaymentStack.Navigator>
  );
}