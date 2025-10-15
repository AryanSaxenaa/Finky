// Finky Saving Challenges Database

export const SAVING_CHALLENGES = [
  {
    id: 'no-spend-tuesday',
    title: 'No-Spend Tuesday',
    description: 'Complete a full day without making any non-essential purchases',
    type: 'behavioral',
    xpReward: 100,
    difficulty: 'medium',
    instructions: 'Avoid all unnecessary spending for 24 hours. Essential items like groceries and bills don\'t count against you.',
    tips: [
      'Plan your meals in advance',
      'Avoid shopping apps and websites',
      'Find free activities for entertainment',
      'Use what you already have at home'
    ]
  },
  {
    id: 'cook-at-home',
    title: 'Cook at Home Challenge',
    description: 'Prepare all your meals at home for the day',
    type: 'behavioral',
    xpReward: 75,
    difficulty: 'easy',
    instructions: 'Make breakfast, lunch, and dinner at home instead of ordering out or eating at restaurants.',
    tips: [
      'Prep ingredients the night before',
      'Try simple, healthy recipes',
      'Calculate how much you\'re saving vs ordering out',
      'Involve family or friends for fun'
    ]
  },
  {
    id: 'mindful-spending',
    title: 'Mindful Spending Check',
    description: 'Before any purchase today, wait 10 minutes and ask "Do I really need this?"',
    type: 'behavioral',
    xpReward: 50,
    difficulty: 'easy',
    instructions: 'For every purchase you consider today, take a 10-minute break to think about whether it\'s truly necessary.',
    tips: [
      'Set a timer for 10 minutes',
      'Ask yourself: "Will I use this regularly?"',
      'Consider if you already own something similar',
      'Think about your financial goals'
    ]
  },
  {
    id: 'save-spare-change',
    title: 'Digital Spare Change',
    description: 'Round up all your digital transactions and save the difference',
    type: 'behavioral',
    xpReward: 60,
    difficulty: 'easy',
    instructions: 'For every digital payment you make, mentally round up to the nearest ₹10 and save that difference.',
    tips: [
      'Keep track in a notes app',
      'Transfer the saved amount to a separate account',
      'See how much you can save in small amounts',
      'Make it automatic with banking apps that offer this feature'
    ]
  },
  {
    id: 'entertainment-free-day',
    title: 'Free Entertainment Day',
    description: 'Find fun activities that don\'t cost money',
    type: 'behavioral',
    xpReward: 80,
    difficulty: 'medium',
    instructions: 'Enjoy your day using only free entertainment options like parks, free events, or activities you already own.',
    tips: [
      'Visit local parks or hiking trails',
      'Use library resources',
      'Play games you already own',
      'Have a movie night with content you already have access to'
    ]
  },
  {
    id: 'subscription-audit',
    title: 'Subscription Detective',
    description: 'Review and cancel at least one unused subscription',
    type: 'action',
    xpReward: 150,
    difficulty: 'medium',
    instructions: 'Go through your bank statements and identify subscriptions you don\'t use. Cancel at least one.',
    tips: [
      'Check your credit card and bank statements',
      'Look for recurring monthly charges',
      'Be honest about what you actually use',
      'Calculate annual savings from cancellations'
    ]
  },
  {
    id: 'price-comparison',
    title: 'Smart Shopper',
    description: 'Compare prices before making any purchase over ₹100',
    type: 'behavioral',
    xpReward: 70,
    difficulty: 'easy',
    instructions: 'For any item over ₹100, check at least 2 other sources for better prices before buying.',
    tips: [
      'Use price comparison websites',
      'Check both online and offline stores',
      'Look for discount codes or coupons',
      'Consider waiting for sales'
    ]
  },
  {
    id: 'cash-only-day',
    title: 'Cash Only Challenge',
    description: 'Use only cash for all purchases today',
    type: 'behavioral',
    xpReward: 90,
    difficulty: 'medium',
    instructions: 'Set a cash budget for the day and stick to it. No cards or digital payments allowed.',
    tips: [
      'Withdraw a specific amount in the morning',
      'When it\'s gone, you\'re done spending',
      'Notice how physical money feels different',
      'Track what you spend on'
    ]
  }
];

export const getDailySavingChallenge = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Assign specific challenges to specific days
  const weeklySchedule = {
    0: 'cook-at-home', // Sunday
    1: 'mindful-spending', // Monday
    2: 'no-spend-tuesday', // Tuesday
    3: 'price-comparison', // Wednesday
    4: 'entertainment-free-day', // Thursday
    5: 'save-spare-change', // Friday
    6: 'cash-only-day', // Saturday
  };
  
  const challengeId = weeklySchedule[dayOfWeek];
  return SAVING_CHALLENGES.find(challenge => challenge.id === challengeId);
};

export const getRandomSavingChallenge = () => {
  const randomIndex = Math.floor(Math.random() * SAVING_CHALLENGES.length);
  return SAVING_CHALLENGES[randomIndex];
};

export const checkChallengeCompletion = (challengeId, userTransactions) => {
  const today = new Date().toDateString();
  const todaysTransactions = userTransactions.filter(
    transaction => new Date(transaction.date).toDateString() === today
  );

  switch (challengeId) {
    case 'no-spend-tuesday':
      // Check if there are any non-essential transactions today
      const nonEssentialCategories = ['Entertainment', 'Shopping', 'Food']; // Exclude groceries
      const nonEssentialSpending = todaysTransactions.filter(
        transaction => nonEssentialCategories.includes(transaction.category)
      );
      return nonEssentialSpending.length === 0;
      
    case 'cook-at-home':
      // Check if there are any food delivery or restaurant transactions
      const foodOutTransactions = todaysTransactions.filter(
        transaction => 
          transaction.category === 'Food' && 
          (transaction.description.toLowerCase().includes('delivery') ||
           transaction.description.toLowerCase().includes('restaurant') ||
           transaction.description.toLowerCase().includes('zomato') ||
           transaction.description.toLowerCase().includes('swiggy'))
      );
      return foodOutTransactions.length === 0;
      
    case 'cash-only-day':
      // This would need to be manually verified or tracked differently
      // For now, we'll assume completion if user confirms
      return true;
      
    default:
      // For behavioral challenges, we'll rely on user confirmation
      return true;
  }
};