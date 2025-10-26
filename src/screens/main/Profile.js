import { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore, useGameStore } from '../../store';
import { BrutalHeader, BrutalCard, BrutalButton, brutalTextStyle } from '../../components/BrutalComponents';
import { NeoBrutalism } from '../../styles/neoBrutalism';

export default function Profile({ navigation }) {
  const { user, logout } = useAuthStore();
  const { level, xp, gameStats } = useGameStore();
  
  const [username, setUsername] = useState(user?.name || 'User');
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            logout();
            navigation.replace('Login');
          }
        }
      ]
    );
  };

  const handleSaveProfile = () => {
    Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <BrutalHeader 
          title="MY PROFILE"
          subtitle="MANAGE YOUR ACCOUNT"
          leftIcon={<Ionicons name="person-circle" size={20} color={NeoBrutalism.colors.white} />}
          leftAction={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={NeoBrutalism.colors.white} />
            </TouchableOpacity>
          }
        />
      
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <BrutalCard style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={48} color={NeoBrutalism.colors.black} />
              </View>
              <Text style={[brutalTextStyle('h5', 'bold', 'black'), styles.username]}>
                {username.toUpperCase()}
              </Text>
            </View>
            
            <View style={styles.statsContainer}>
              <BrutalCard style={styles.statCard}>
                <Text style={brutalTextStyle('h4', 'bold', 'black')}>{level}</Text>
                <Text style={brutalTextStyle('caption', 'medium', 'gray')}>LEVEL</Text>
              </BrutalCard>
              <BrutalCard style={styles.statCard}>
                <Text style={brutalTextStyle('h4', 'bold', 'black')}>{xp}</Text>
                <Text style={brutalTextStyle('caption', 'medium', 'gray')}>XP</Text>
              </BrutalCard>
              <BrutalCard style={styles.statCard}>
                <Text style={brutalTextStyle('h4', 'bold', 'black')}>{gameStats.totalGamesPlayed || 0}</Text>
                <Text style={brutalTextStyle('caption', 'medium', 'gray')}>GAMES</Text>
              </BrutalCard>
            </View>
          </BrutalCard>

          <BrutalCard style={styles.settingsCard}>
            <Text style={[brutalTextStyle('h6', 'bold', 'black'), styles.sectionTitle]}>SETTINGS</Text>
            
            <View style={styles.settingItem}>
              <Text style={brutalTextStyle('body', 'medium', 'black')}>PUSH NOTIFICATIONS</Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: NeoBrutalism.colors.lightGray, true: NeoBrutalism.colors.neonGreen }}
                thumbColor={notifications ? NeoBrutalism.colors.white : NeoBrutalism.colors.gray}
              />
            </View>
            
            <View style={styles.settingItem}>
              <Text style={brutalTextStyle('body', 'medium', 'black')}>BIOMETRIC LOGIN</Text>
              <Switch
                value={biometric}
                onValueChange={setBiometric}
                trackColor={{ false: NeoBrutalism.colors.lightGray, true: NeoBrutalism.colors.neonGreen }}
                thumbColor={biometric ? NeoBrutalism.colors.white : NeoBrutalism.colors.gray}
              />
            </View>
          </BrutalCard>

          <BrutalButton
            title="SAVE CHANGES"
            style={styles.saveButton}
            onPress={handleSaveProfile}
          />

          <BrutalButton
            title="LOGOUT"
            style={styles.logoutButton}
            variant="secondary"
            onPress={handleLogout}
            icon={<Ionicons name="log-out-outline" size={20} color={NeoBrutalism.colors.black} />}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: NeoBrutalism.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: NeoBrutalism.colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: NeoBrutalism.spacing.md,
    paddingBottom: 100,
  },
  profileCard: {
    marginBottom: NeoBrutalism.spacing.lg,
    alignItems: 'center',
    padding: NeoBrutalism.spacing.lg,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: NeoBrutalism.spacing.lg,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: NeoBrutalism.colors.neonYellow,
    borderWidth: NeoBrutalism.borders.thick,
    borderColor: NeoBrutalism.colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: NeoBrutalism.spacing.md,
  },
  username: {
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: NeoBrutalism.spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: NeoBrutalism.spacing.md,
  },
  settingsCard: {
    marginBottom: NeoBrutalism.spacing.lg,
    padding: NeoBrutalism.spacing.lg,
  },
  sectionTitle: {
    marginBottom: NeoBrutalism.spacing.lg,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: NeoBrutalism.spacing.lg,
    paddingVertical: NeoBrutalism.spacing.sm,
  },
  saveButton: {
    marginBottom: NeoBrutalism.spacing.md,
  },
  logoutButton: {
    marginBottom: NeoBrutalism.spacing.xl,
  },
});
