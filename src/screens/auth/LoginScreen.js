import { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store';
import { 
  BrutalCard, 
  BrutalButton, 
  brutalTextStyle 
} from '../../components/BrutalComponents';
import { NeoBrutalism } from '../../styles/neoBrutalism';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const login = useAuthStore((state) => state.login);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    // Simulate credential check (replace with real API call in production)
    setTimeout(() => {
      login({ email, name: 'User' });
      setLoading(false);
      navigation.navigate('Main');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={[brutalTextStyle('h1', 'bold', 'black'), styles.title]}>WELCOME BACK!</Text>
        <Text style={[brutalTextStyle('body', 'medium', 'black'), styles.subtitle]}>LOG IN TO DOMINATE YOUR FINANCES</Text>

        <BrutalCard style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='EMAIL ADDRESS'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
              placeholderTextColor={NeoBrutalism.colors.gray}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder='PASSWORD'
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureTextEntry}
              placeholderTextColor={NeoBrutalism.colors.gray}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={toggleSecureEntry}
            >
              <Ionicons 
                name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'} 
                size={24} 
                color={NeoBrutalism.colors.gray} 
              />
            </TouchableOpacity>
          </View>

          <BrutalButton
            title={loading ? 'LOGGING IN...' : 'LOG IN'}
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          />

          <BrutalButton
            title="FORGOT PASSWORD?"
            style={styles.forgotButton}
            variant="secondary"
            onPress={() => Alert.alert('INFO', 'Forgot password functionality coming soon!')}
          />
        </BrutalCard>

        <View style={styles.divider} />

        <View style={styles.registerContainer}>
          <Text style={[brutalTextStyle('body', 'medium', 'black'), styles.registerText]}>
            DON'T HAVE AN ACCOUNT?
          </Text>
          <BrutalButton
            title="SIGN UP"
            style={styles.registerButton}
            variant="secondary"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NeoBrutalism.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: NeoBrutalism.spacing.lg,
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: NeoBrutalism.spacing.sm,
    textShadowColor: NeoBrutalism.colors.neonYellow,
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 0,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: NeoBrutalism.spacing.xl,
  },
  formContainer: {
    padding: NeoBrutalism.spacing.lg,
    marginBottom: NeoBrutalism.spacing.xl,
    backgroundColor: NeoBrutalism.colors.lightGray,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: NeoBrutalism.spacing.lg,
  },
  input: {
    backgroundColor: NeoBrutalism.colors.white,
    borderWidth: NeoBrutalism.borders.thick,
    borderColor: NeoBrutalism.colors.black,
    borderRadius: 0,
    padding: NeoBrutalism.spacing.md,
    fontSize: 16,
    fontWeight: '600',
    color: NeoBrutalism.colors.black,
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: NeoBrutalism.spacing.md,
    top: NeoBrutalism.spacing.md,
  },
  loginButton: {
    marginTop: NeoBrutalism.spacing.md,
    marginBottom: NeoBrutalism.spacing.md,
  },
  forgotButton: {
    marginBottom: NeoBrutalism.spacing.sm,
  },
  divider: {
    height: NeoBrutalism.borders.thick,
    backgroundColor: NeoBrutalism.colors.hotPink,
    marginVertical: NeoBrutalism.spacing.xl,
  },
  registerContainer: {
    alignItems: 'center',
  },
  registerText: {
    textAlign: 'center',
    marginBottom: NeoBrutalism.spacing.md,
  },
  registerButton: {
    paddingHorizontal: NeoBrutalism.spacing.xl,
  },
});
