import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useGameStore } from '../../store';
import { BrutalCard, BrutalButton, BrutalHeader, brutalTextStyle } from '../../components/BrutalComponents';
import { NeoBrutalism } from '../../styles/neoBrutalism';

const TrophyIcon = (props) => <Ionicons name="trophy" size={64} color="#FFD700" />;
const BackIcon = (props) => <Ionicons name="arrow-back" size={24} color="#8F9BB3" />;

export default function GameResults({ navigation }) {
  const { score, gameStats, resetGame, updateGameStats, level, xp } = useGameStore();

  React.useEffect(() => {
    updateGameStats();
  }, []);

  const handlePlayAgain = () => {
    resetGame();
    // Use reset navigation to clear the stack and start fresh
    navigation.reset({
      index: 0,
      routes: [
        { name: 'GameHome' },
        { name: 'GameBoard' }
      ],
    });
  };

  const handleReturnHome = () => {
    resetGame();
    // Reset navigation stack and go to GameHome
    navigation.reset({
      index: 0,
      routes: [{ name: 'GameHome' }],
    });
  };

  const renderBackAction = () => (
    <TopNavigationAction 
      icon={BackIcon} 
      onPress={() => {
        resetGame();
        navigation.goBack();
      }} 
    />
  );

  // Calculate performance percentage
  const performancePercentage = Math.min(100, (score / 100) * 100);
  
  // Determine performance level and rewards
  const getPerformanceLevel = () => {
    if (performancePercentage >= 90) return { level: 'Excellent', icon: 'trophy', color: '#FFD700' };
    if (performancePercentage >= 75) return { level: 'Great', icon: 'medal', color: '#C0C0C0' };
    if (performancePercentage >= 60) return { level: 'Good', icon: 'ribbon', color: '#CD7F32' };
    if (performancePercentage >= 40) return { level: 'Fair', icon: 'trending-up', color: '#6C5CE7' };
    return { level: 'Try Again', icon: 'fitness', color: '#E74C3C' };
  };

  const performance = getPerformanceLevel();

  // Calculate badges earned
  const badges = [];
  if (score >= 100) badges.push({ name: 'High Scorer', icon: 'star' });
  if (performancePercentage >= 90) badges.push({ name: 'Quiz Master', icon: 'school' });
  if (gameStats.totalGamesPlayed === 1) badges.push({ name: 'First Game', icon: 'game-controller' });
  if (gameStats.totalGamesPlayed >= 5) badges.push({ name: 'Dedicated Player', icon: 'medal' });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <BrutalHeader 
          title="GAME COMPLETE"
          subtitle="YOUR PERFORMANCE SUMMARY"
          leftIcon={<Ionicons name="trophy" size={20} color={NeoBrutalism.colors.white} />}
          leftAction={
            <TouchableOpacity onPress={() => {
              resetGame();
              navigation.goBack();
            }}>
              <Ionicons name="arrow-back" size={24} color={NeoBrutalism.colors.white} />
            </TouchableOpacity>
          }
        />
        
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Performance Card */}
        <BrutalCard style={styles.performanceCard}>
          <Ionicons name={performance.icon} size={48} color={performance.color} style={styles.performanceIcon} />
          <Text style={[brutalTextStyle('h5', 'bold', 'black'), styles.performanceText, { color: performance.color }]}>
            {performance.level}
          </Text>
          <Text style={brutalTextStyle('caption', 'medium', 'black')}>Performance Level</Text>
        </BrutalCard>

        {/* Main Results Card */}
        <BrutalCard style={styles.resultCard}>
          <Ionicons name="trophy" size={64} color="#FFD700" />
          <Text style={[brutalTextStyle('h4', 'bold', 'black'), styles.title]}>Game Complete!</Text>
          <Text style={[brutalTextStyle('h1', 'bold', 'black'), styles.score]}>{score}</Text>
          <Text style={[brutalTextStyle('body', 'medium', 'gray'), styles.scoreLabel]}>Final Score</Text>
          
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <Text style={[brutalTextStyle('caption', 'medium', 'gray'), styles.progressLabel]}>
              Performance: {performancePercentage.toFixed(0)}%
            </Text>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill, 
                { 
                  width: `${performancePercentage}%`,
                  backgroundColor: performance.color
                }
              ]} />
            </View>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={brutalTextStyle('h6', 'bold', 'black')}>+{score}</Text>
              <Text style={brutalTextStyle('caption', 'medium', 'gray')}>XP Gained</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={brutalTextStyle('h6', 'bold', 'black')}>Level {level}</Text>
              <Text style={brutalTextStyle('caption', 'medium', 'gray')}>Current Level</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={brutalTextStyle('h6', 'bold', 'black')}>{gameStats.bestScore}</Text>
              <Text style={brutalTextStyle('caption', 'medium', 'gray')}>Best Score</Text>
            </View>
          </View>
        </BrutalCard>

        {/* Badges Section */}
        {badges.length > 0 && (
          <BrutalCard style={styles.badgesCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
              <Ionicons name="trophy" size={20} color={NeoBrutalism.colors.black} />
              <Text style={[brutalTextStyle('h6', 'bold', 'black'), styles.badgesTitle]}>Badges Earned</Text>
            </View>
            <View style={styles.badgesContainer}>
              {badges.map((badge, index) => (
                <View key={index} style={styles.badge}>
                  <Ionicons name={badge.icon} size={24} color={NeoBrutalism.colors.black} style={styles.badgeIcon} />
                  <Text style={[brutalTextStyle('caption', 'medium', 'black'), styles.badgeName]}>{badge.name}</Text>
                </View>
              ))}
            </View>
          </BrutalCard>
        )}

        {/* Statistics Card */}
        <BrutalCard style={styles.detailedStatsCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
            <Ionicons name="bar-chart" size={20} color={NeoBrutalism.colors.black} />
            <Text style={[brutalTextStyle('h6', 'bold', 'black'), styles.statsTitle]}>Game Statistics</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={brutalTextStyle('body', 'medium', 'black')}>Games Played:</Text>
            <Text style={brutalTextStyle('h6', 'bold', 'black')}>{gameStats.totalGamesPlayed}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={brutalTextStyle('body', 'medium', 'black')}>Total XP Earned:</Text>
            <Text style={brutalTextStyle('h6', 'bold', 'black')}>{gameStats.totalScore}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={brutalTextStyle('body', 'medium', 'black')}>Average Score:</Text>
            <Text style={brutalTextStyle('h6', 'bold', 'black')}>
              {gameStats.totalGamesPlayed > 0 
                ? Math.round(gameStats.totalScore / gameStats.totalGamesPlayed)
                : 0
              }
            </Text>
          </View>
        </BrutalCard>

        <View style={styles.buttonContainer}>
          <BrutalButton
            style={styles.button}
            onPress={handlePlayAgain}
            icon={<Ionicons name="game-controller" size={20} color={NeoBrutalism.colors.black} />}
          >
            PLAY AGAIN
          </BrutalButton>
          <BrutalButton
            style={styles.button}
            variant="outline"
            onPress={handleReturnHome}
            icon={<Ionicons name="home" size={20} color={NeoBrutalism.colors.black} />}
          >
            RETURN HOME
          </BrutalButton>
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
  },
  contentContainer: {
    padding: NeoBrutalism.spacing.md,
    paddingBottom: 100, // Extra space for navigation
  },
  performanceCard: {
    alignItems: 'center',
    marginBottom: 16,
    padding: 20,
  },
  performanceIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  performanceText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resultCard: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
  },
  score: {
    color: '#6C5CE7',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 48,
  },
  scoreLabel: {
    marginBottom: 20,
    color: '#8F9BB3',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 24,
  },
  progressLabel: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#8F9BB3',
  },
  progressBar: {
    height: 12,
    backgroundColor: NeoBrutalism.colors.lightGray,
    borderWidth: NeoBrutalism.borders.thin,
    borderColor: NeoBrutalism.colors.black,
    borderRadius: NeoBrutalism.borders.radius,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  badgesCard: {
    marginBottom: 16,
    padding: 16,
    width: '100%',
  },
  badgesTitle: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  badge: {
    alignItems: 'center',
    margin: 8,
    padding: 12,
    backgroundColor: NeoBrutalism.colors.neonYellow,
    borderWidth: NeoBrutalism.borders.thin,
    borderColor: NeoBrutalism.colors.black,
    borderRadius: NeoBrutalism.borders.buttonRadius,
    minWidth: 80,
  },
  badgeIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  badgeName: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '600',
  },
  detailedStatsCard: {
    marginBottom: 20,
    padding: 16,
    width: '100%',
  },
  statsTitle: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: NeoBrutalism.borders.thin,
    borderBottomColor: NeoBrutalism.colors.black,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
