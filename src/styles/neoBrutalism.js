// Neo-Brutalism Design System for Finky

export const FinkyTheme = {
  // Color Palette
  colors: {
    // Primary Neo-Brutalism Colors
    black: '#1C1C1C',
    white: '#FFFFFF',
    
    // Finky Brand Colors
    background: '#FFF8E1', // Creamy background
    text: '#1C1C1C',       // Dark text
    primary: '#2ECC71',     // Green for success and saving
    accent: '#F39C12',      // Orange for calls to action
    card: '#FFF8E1',        // Cream for cards
    border: '#1C1C1C',      // Dark border for Neo-Brutalism
    
    // Legacy colors for compatibility
    neonYellow: '#F39C12',
    hotPink: '#FF1493',
    electricBlue: '#00BFFF',
    neonGreen: '#2ECC71',
    brightOrange: '#F39C12',
    pureRed: '#FF0000',
    deepPurple: '#8B00FF',
    
    // Functional alternatives
    darkBlue: '#1a365d',
    darkGreen: '#1a4338',
    darkOrange: '#c53030',
    darkGray: '#4a5568',
    lightGray: '#e2e8f0',
    gray: '#718096',
    
    // Functional Colors
    success: '#2ECC71',
    warning: '#F39C12',
    error: '#FF0000',
    info: '#00BFFF',
    
    // Backgrounds
    surface: '#1C1C1C',
    cardBackground: '#FFF8E1',
  },

  // Typography
  typography: {
    // Font Families (using system fonts for Neo-Brutalism)
    primary: 'System', // Will use platform default bold fonts
    mono: 'Courier', // Monospace for code-like elements
    
    // Font Sizes
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18,
    h6: 16,
    body: 14,
    caption: 12,
    button: 14, // Reduced from 16 to prevent overflow
    
    // Font Weights
    bold: '900', // Extra bold for Neo-Brutalism
    semiBold: '700',
    medium: '600',
    regular: '400',
  },

  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  // Border Styles
  borders: {
    thick: 4,
    medium: 3,
    thin: 2,
    radius: 0, // Sharp corners for Neo-Brutalism
    buttonRadius: 2, // Minimal rounding for buttons only
  },

  // Shadows (minimal for Neo-Brutalism)
  shadows: {
    brutal: {
      shadowColor: '#000000',
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 0,
    },
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
  },

  // Component Styles
  components: {
    // Button Styles
    button: {
      primary: {
        backgroundColor: '#FFFF00',
        borderColor: '#000000',
        borderWidth: 4,
        borderRadius: 2,
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
      secondary: {
        backgroundColor: '#FFF8E1',
        borderColor: '#000000',
        borderWidth: 4,
        borderRadius: 2,
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
      danger: {
        backgroundColor: '#FF0000',
        borderColor: '#000000',
        borderWidth: 4,
        borderRadius: 2,
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
      success: {
        backgroundColor: '#39FF14',
        borderColor: '#000000',
        borderWidth: 4,
        borderRadius: 2,
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
    },

    // Card Styles
    card: {
      default: {
        backgroundColor: '#FFF8E1',
        borderColor: '#000000',
        borderWidth: 4,
        borderRadius: 0,
        padding: 20,
      },
      highlighted: {
        backgroundColor: '#FFFF00',
        borderColor: '#000000',
        borderWidth: 4,
        borderRadius: 0,
        padding: 20,
      },
      surface: {
        backgroundColor: '#000000',
        borderColor: '#FFF8E1',
        borderWidth: 4,
        borderRadius: 0,
        padding: 20,
      },
    },

    // Input Styles
    input: {
      default: {
        backgroundColor: '#FFF8E1',
        borderColor: '#000000',
        borderWidth: 4,
        borderRadius: 0,
        paddingVertical: 16,
        paddingHorizontal: 16,
        fontSize: 16,
        fontWeight: '600',
      },
    },

    // Navigation Styles
    navigation: {
      header: {
        backgroundColor: '#000000',
        borderBottomColor: '#FFFF00',
        borderBottomWidth: 4,
      },
      tab: {
        backgroundColor: '#FFF8E1',
        borderTopColor: '#000000',
        borderTopWidth: 4,
      },
    },
  },

  // Game-specific Colors
  game: {
    board: {
      normal: '#FFFFFF',
      question: '#00BFFF',
      bonus: '#39FF14',
      trap: '#FF0000',
      investment: '#FFFF00',
      player: '#FF1493',
    },
    stats: {
      score: '#8B00FF',
      lives: '#FF0000',
      level: '#39FF14',
      xp: '#FFFF00',
    },
  },

  // Financial Category Colors
  finance: {
    budgeting: '#FFFF00',
    saving: '#39FF14',
    investing: '#00BFFF',
    debt: '#FF0000',
    credit: '#FF1493',
    insurance: '#FF4500',
  },
};

// Helper functions for consistent styling
export const createBrutalButton = (variant = 'primary') => ({
  ...FinkyTheme.components.button[variant],
  ...FinkyTheme.shadows.brutal,
});

export const createBrutalCard = (variant = 'default') => ({
  ...FinkyTheme.components.card[variant],
  ...FinkyTheme.shadows.brutal,
});

export const createBrutalInput = () => ({
  ...FinkyTheme.components.input.default,
  ...FinkyTheme.shadows.none,
});


// Export alias for backward compatibility
export const NeoBrutalism = FinkyTheme;