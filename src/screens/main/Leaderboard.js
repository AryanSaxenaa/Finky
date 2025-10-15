import React from 'react';

import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BrutalCard, BrutalHeader, brutalTextStyle } from '../../components/BrutalComponents';
import { NeoBrutalism } from '../../styles/neoBrutalism';

const TrophyIcon = (props) => <Ionicons name="trophy" size={20} color="#FFD700" />;

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
  const renderLeaderboardItem = (item) => {
    const isCurrentUser = item.name === 'You';
    
    return (
      <ListItem
        key={item.id}
        style={[styles.listItem, isCurrentUser && styles.currentUser]}
        title={`${item.rank}. ${item.name}`}
        description={`${item.score} points`}
        accessoryLeft={() => (
          item.rank <= 3 ? (
            <TrophyIcon />
          ) : (
            <Text style={styles.rankNumber}>{item.rank}</Text>
          )
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Layout style={styles.container}>
        <BrutalHeader
          title="TOP SAVERS"
          textColor="white"
          leftAction={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={NeoBrutalism.colors.white} />
            </TouchableOpacity>
          }
        />
        <ScrollView style={styles.content}>
          <Text style={[brutalTextStyle('h5', 'bold', 'black'), styles.title]}>Finky Champions</Text>
          <View>
            {topSaversData.map(item => (
              <BrutalCard
                key={item.id}
                style={[
                  styles.listItem,
                  item.name === 'You' && styles.currentUser
                ]}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {item.rank <= 3 ? (
                    <Ionicons name="trophy" size={20} color="#FFD700" style={styles.trophyIcon} />
                  ) : (
                    <Text style={styles.rankNumber}>{item.rank}</Text>
                  )}
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={brutalTextStyle('body', 'bold', 'black')}>
                      {item.rank}. {item.name}
                    </Text>
                    <Text style={[brutalTextStyle('caption', 'medium', 'gray'), { marginTop: 2 }]}>
                      Saved ₹{item.savedAmount.toLocaleString()}
                    </Text>
                  </View>
                  <Text style={brutalTextStyle('body', 'medium', 'black')}>
                    {item.xp} XP
                  </Text>
                </View>
              </BrutalCard>
            ))}
          </View>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: NeoBrutalism.colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: NeoBrutalism.colors.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  listItem: {
    marginBottom: 12,
    borderWidth: 3,
    borderColor: NeoBrutalism.colors.black,
    backgroundColor: NeoBrutalism.colors.lightGray,
    padding: 16,
  },
  currentUser: {
    backgroundColor: NeoBrutalism.colors.neonYellow,
    borderLeftWidth: 6,
    borderLeftColor: NeoBrutalism.colors.hotPink,
  },
  trophyIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  rankNumber: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 16,
    color: NeoBrutalism.colors.deepPurple,
  },
});
