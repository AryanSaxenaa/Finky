import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NeoBrutalism } from '../styles/neoBrutalism';
import HomeStackNavigator from './HomeStackNavigator';
import GameStackNavigator from './GameStackNavigator';
import LearnStackNavigator from './LearnStackNavigator';
import AIStackNavigator from './AIStackNavigator';

const Tab = createBottomTabNavigator();

const HomeIcon = (props) => <Ionicons name="home" size={24} color={NeoBrutalism.colors.white} />;
const GameIcon = (props) => <Ionicons name="game-controller" size={24} color={NeoBrutalism.colors.white} />;
const LearnIcon = (props) => <Ionicons name="library" size={24} color={NeoBrutalism.colors.white} />;
const AIIcon = (props) => <Ionicons name="chatbubbles" size={24} color={NeoBrutalism.colors.white} />;

const BottomTabBar = ({ navigation, state }) => (
  <SafeAreaView edges={['bottom']} style={styles.safeAreaBottom}>
    <View style={styles.tabBarContainer}>
      <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}
        style={styles.bottomNavigation}
      >
        <BottomNavigationTab 
          icon={HomeIcon} 
          style={styles.bottomTab}
        />
        <BottomNavigationTab 
          icon={GameIcon} 
          style={styles.bottomTab}
        />
        <BottomNavigationTab 
          icon={LearnIcon} 
          style={styles.bottomTab}
        />
        <BottomNavigationTab 
          icon={AIIcon} 
          style={styles.bottomTab}
        />
      </BottomNavigation>
      
      {/* Central Pay Button */}
      <TouchableOpacity
        style={styles.payButton}
        onPress={() => navigation.navigate('PaymentFlow')}
      >
        <Ionicons name="card" size={28} color={NeoBrutalism.colors.white} />
        <Text style={styles.payButtonText}>PAY</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default function MainTabNavigator() {
  return (
    <Tab.Navigator 
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="GameTab" component={GameStackNavigator} />
      <Tab.Screen name="LearnTab" component={LearnStackNavigator} />
      <Tab.Screen name="AITab" component={AIStackNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  safeAreaBottom: {
    backgroundColor: NeoBrutalism.colors.darkBlue,
  },
  tabBarContainer: {
    position: 'relative',
  },
  bottomNavigation: {
    paddingVertical: 12,
    backgroundColor: NeoBrutalism.colors.darkBlue,
    borderTopWidth: 4,
    borderTopColor: NeoBrutalism.colors.black,
    elevation: 0,
    shadowOpacity: 0,
  },
  bottomTab: {
    paddingVertical: 6,
    backgroundColor: 'transparent',
  },
  payButton: {
    position: 'absolute',
    top: -25,
    alignSelf: 'center',
    backgroundColor: NeoBrutalism.colors.primary,
    borderRadius: 35,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: NeoBrutalism.colors.black,
    shadowColor: NeoBrutalism.colors.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  payButtonText: {
    fontSize: 10,
    fontWeight: '900',
    color: NeoBrutalism.colors.white,
    marginTop: 2,
  },
});
