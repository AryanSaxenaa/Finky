import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { useExpenseStore } from '../../store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  BrutalCard, 
  BrutalButton, 
  BrutalHeader,
  brutalTextStyle 
} from '../../components/BrutalComponents';
import { NeoBrutalism } from '../../styles/neoBrutalism';

const { width } = Dimensions.get('window');

export default function ExpenseHistory({ navigation }) {
  const { expenses } = useExpenseStore();

  // Group expenses by month for chart
  const monthlyData = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleDateString('en-US', { 
      month: 'short' 
    });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount,
  }));

  // Prepare bar chart data with properly formatted amounts
  const barChartData = {
    labels: chartData.map(item => item.month),
    datasets: [{
      data: chartData.map(item => Number(item.amount.toFixed(2)))
    }]
  };

  const chartConfig = {
    backgroundColor: NeoBrutalism.colors.background,
    backgroundGradientFrom: NeoBrutalism.colors.background,
    backgroundGradientTo: NeoBrutalism.colors.lightGray,
    decimalPlaces: 2,
    color: (opacity = 1) => NeoBrutalism.colors.primary,
    labelColor: (opacity = 1) => NeoBrutalism.colors.black,
    style: {
      borderRadius: 0, // Neo-brutalism sharp corners
    },
    propsForDots: {
      r: "4",
      strokeWidth: "3",
      stroke: NeoBrutalism.colors.black
    },
    barPercentage: 0.7,
    fillShadowGradient: NeoBrutalism.colors.primary,
    fillShadowGradientOpacity: 1,
    formatYLabel: (value) => `₹${Number(value).toFixed(2)}`,
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <BrutalHeader
          title='EXPENSE TRACKER'
          subtitle="MONITOR YOUR SPENDING"
          leftIcon={<Ionicons name="analytics" size={20} color={NeoBrutalism.colors.white} />}
          textColor="white"
          leftAction={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={NeoBrutalism.colors.white} />
            </TouchableOpacity>
          }
        />
        
        <ScrollView style={styles.content}>
          {chartData.length > 0 && (
            <BrutalCard style={styles.chartCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                <Ionicons name="bar-chart" size={20} color={NeoBrutalism.colors.black} />
                <Text style={[brutalTextStyle('h6', 'bold', 'black'), styles.chartTitle]}>MONTHLY SPENDING TRENDS</Text>
              </View>
              <View style={styles.chartContainer}>
                <BarChart
                  data={barChartData}
                  width={width - 80}
                  height={220}
                  chartConfig={chartConfig}
                  verticalLabelRotation={0}
                  showValuesOnTopOfBars={false}
                  fromZero={true}
                  style={styles.chartStyle}
                />
              </View>
              <View style={styles.monthlyBreakdown}>
                {chartData.map((item, index) => (
                  <BrutalCard key={index} style={styles.monthItem}>
                    <Text style={brutalTextStyle('caption', 'bold', 'black')}>{item.month.toUpperCase()}</Text>
                    <Text style={brutalTextStyle('body', 'bold', 'black')}>₹{Number(item.amount).toFixed(2)}</Text>
                  </BrutalCard>
                ))}
              </View>
            </BrutalCard>
          )}

          <BrutalCard style={styles.listCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
              <Ionicons name="receipt" size={20} color={NeoBrutalism.colors.black} />
              <Text style={[brutalTextStyle('h6', 'bold', 'black'), styles.listTitle]}>
                RECENT TRANSACTIONS ({expenses.length})
              </Text>
            </View>
            {expenses.length > 0 ? (
              <View>
                {expenses.slice().reverse().map((expense, index) => (
                  <BrutalCard
                    key={expense.id || index}
                    style={styles.expenseItem}
                  >
                    <View style={styles.expenseContent}>
                      <View style={styles.expenseInfo}>
                        <Text style={brutalTextStyle('body', 'bold', 'black')}>
                          {(expense.description || expense.category).toUpperCase()}
                        </Text>
                        <Text style={brutalTextStyle('caption', 'medium', 'black')}>
                          {new Date(expense.date).toLocaleDateString()}
                        </Text>
                      </View>
                      <Text style={[brutalTextStyle('body', 'bold', 'black'), styles.expenseAmount]}>
                        -₹{Number(expense.amount).toFixed(2)}
                      </Text>
                    </View>
                  </BrutalCard>
                ))}
              </View>
            ) : (
              <Text style={[brutalTextStyle('body', 'medium', 'black'), styles.noData]}>NO EXPENSES RECORDED YET</Text>
            )}
          </BrutalCard>
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
    paddingBottom: 100,
  },
  chartCard: {
    marginBottom: NeoBrutalism.spacing.lg,
    backgroundColor: NeoBrutalism.colors.lightGray,
    paddingHorizontal: NeoBrutalism.spacing.md,
    paddingVertical: NeoBrutalism.spacing.lg,
  },
  chartTitle: {
    marginBottom: NeoBrutalism.spacing.md,
    textAlign: 'center',
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: NeoBrutalism.spacing.md,
    backgroundColor: NeoBrutalism.colors.background,
    borderWidth: NeoBrutalism.borders.thick,
    borderColor: NeoBrutalism.colors.black,
    padding: NeoBrutalism.spacing.md,
  },
  chartStyle: {
    borderRadius: 0,
    borderWidth: NeoBrutalism.borders.medium,
    borderColor: NeoBrutalism.colors.black,
  },
  monthlyBreakdown: {
    marginTop: 16,
    gap: 8,
  },
  monthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: NeoBrutalism.colors.neonYellow,
    borderWidth: 2,
    borderColor: NeoBrutalism.colors.black,
  },
  listCard: {
    marginBottom: 16,
    backgroundColor: NeoBrutalism.colors.lightGray,
  },
  listTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  expenseItem: {
    marginBottom: 8,
    backgroundColor: NeoBrutalism.colors.background,
    borderWidth: 2,
    borderColor: NeoBrutalism.colors.black,
  },
  expenseContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseAmount: {
    color: NeoBrutalism.colors.pureRed,
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
