import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BrutalCard, BrutalHeader, brutalTextStyle } from '../../components/BrutalComponents';
import { NeoBrutalism } from '../../styles/neoBrutalism';

// Sample top savers data - ranked by XP earned from saving
const topSaversData = [
  { id: 1, name: 'SaveMaster', xp: 2450, rank: 1, savedAmount: 12500 },
  { id: 2, name: 'WiseSpender', xp: 2380, rank: 2, savedAmount: 11900 },
  { id: 3, name: 'FinkyChamp', xp: 2290, rank: 3, savedAmount: 11450 },
  { id: 4, name: 'MoneyGuard', xp: 2150, rank: 4, savedAmount: 10750 },
  { id: 5, name: 'SmartSaver', xp: 2050, rank: 5, savedAmount: 10250 },
  { id: 6, name: 'You', xp: 1950, rank: 6, savedAmount: 9750 },
];

export default function Leaderboard({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <BrutalHeader
          title="LEADERBOARD"
          subtitle="TOP FINANCIAL CHAMPIONS"
          leftIcon={<Ionicons name="podium" size={20} color={NeoBrutalism.colors.white} />}
          textColor="white"
          leftAction={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={NeoBrutalism.colors.white} />
            </TouchableOpacity>
          }
        />
        <ScrollView style={styles.content}>
          <Text style={[brutalTextStyle('h5', 'bold', 'black'), styles.title]}>FINKY CHAMPIONS</Text>
          <View>
            {topSaversData.map(item => (
              <BrutalCard
                key={item.id}
                style={[
                  styles.listItem,
                  item.name === 'You' && styles.currentUser
                ]}
              >
                <View style={styles.leaderboardRow}>
                  {item.rank <= 3 ? (
                    <Ionicons name="trophy" size={24} color="#FFD700" style={styles.trophyIcon} />
                  ) : (
                    <Text style={styles.rankNumber}>{item.rank}</Text>
                  )}
                  <View style={styles.playerInfo}>
                    <Text style={brutalTextStyle('body', 'bold', 'black')}>
                      {item.rank}. {item.name.toUpperCase()}
                    </Text>
                    <Text style={[brutalTextStyle('caption', 'medium', 'gray'), styles.savedAmount]}>
                      SAVED ₹{item.savedAmount.toLocaleString()}
                    </Text>
                  </View>
                  <Text style={brutalTextStyle('h6', 'bold', 'black')}>
                    {item.xp} XP
                  </Text>
                </View>
              </BrutalCard>
            ))}
          </View>
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
    padding: NeoBrutalism.spacing.md,
  },
  title: {
    marginBottom: NeoBrutalism.spacing.lg,
    textAlign: 'center',
  },
  listItem: {
    marginBottom: NeoBrutalism.spacing.md,
    padding: NeoBrutalism.spacing.md,
  },
  currentUser: {
    backgroundColor: NeoBrutalism.colors.neonYellow,
    borderLeftWidth: NeoBrutalism.borders.thick * 2,
    borderLeftColor: NeoBrutalism.colors.hotPink,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trophyIcon: {
    width: 32,
    height: 32,
    marginRight: NeoBrutalism.spacing.md,
  },
  rankNumber: {
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: NeoBrutalism.spacing.md,
    color: NeoBrutalism.colors.deepPurple,
    width: 32,
    textAlign: 'center',
  },
  playerInfo: {
    flex: 1,
    marginLeft: NeoBrutalism.spacing.sm,
  },
  savedAmount: {
    marginTop: NeoBrutalism.spacing.xs,
  },
});
