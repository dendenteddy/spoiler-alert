import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader } from '../components/ui';
import { colors, radius, shadow, spacing, type } from '../constants/theme';

// --- Types ---
interface Ingredient {
  name: string;
  amount?: string;
}

interface Recipe {
  id: string;
  title: string;
  ingredients: Ingredient[];
  instructions: string[];
  imageUrl: string;
}

// --- Shared Fridge Inventory Data ---
// In a full build, this would be imported from a shared state/context file.
const CURRENT_FRIDGE_INVENTORY = [
  'CABBAGE',
  'CANNED CORN',
  'MEIJI MILK',
  'CREAM CHEESE',
  'CHICKEN WINGS',
  'BACON',
  'BREAD LOAF',
  'TOMATO',
  'SALT'
];

// --- Mock Recipes Data ---
const RECIPES_DATA: Record<'nearlyExpiring' | 'mixed' | 'nonExpiring', Recipe[]> = {
  nearlyExpiring: [
    {
      id: '1',
      title: 'Red Sauce Pasta',
      ingredients: [
        { name: 'Tomato', amount: '2 pcs' },
        { name: 'Salt', amount: '2 tbsp' },
        { name: 'Pasta', amount: '150 grams' },
        { name: 'Sugar', amount: '1 tbsp' },
        { name: 'Pinch of basil' },
      ],
      instructions: [
        'Boil pasta in salted water until al dente.',
        'Crush fresh tomatoes and simmer in a pan with sugar and salt.',
        'Toss the pasta directly into the sauce and garnish with fresh basil leaves.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80',
    },
  ],
  mixed: [
    {
      id: '2',
      title: 'Pineapple Pizza',
      ingredients: [
        { name: 'Diced pineapple' },
        { name: 'Flour', amount: '150 grams' },
        { name: 'Bacon' },
        { name: 'Yeast' },
      ],
      instructions: [
        'Prepare and roll out your pizza dough baseline.',
        'Spread an even base layer of tomato sauce and shredded mozzarella.',
        'Scatter your diced pineapples and chosen meats evenly across the top.',
        'Bake at 220°C for 12-15 minutes until the crust edges are completely golden.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
    },
  ],
  nonExpiring: [
    {
      id: '3',
      title: 'Egg Tart',
      ingredients: [
        { name: 'Egg yolks', amount: '4 pcs' },
        { name: 'Heavy cream', amount: '100 ml' },
        { name: 'Milk', amount: '100 ml' },
        { name: 'Sugar', amount: '40 grams' },
        { name: 'Pastry sheets' },
      ],
      instructions: [
        'Whisk egg yolks, heavy cream, milk, and sugar together until perfectly smooth.',
        'Press your pastry sheets firmly into the designated tart molds.',
        'Strain the liquid mixture into the shells to avoid pockets.',
        'Bake at 200°C for roughly 20 minutes until the center custard sets.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1637273483570-10e72651892e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ],
};

// --- Helper Inventory Matcher Logic ---
const checkHasIngredient = (ingredientName: string): boolean => {
  return CURRENT_FRIDGE_INVENTORY.some(fridgeItem =>
    fridgeItem.toLowerCase().includes(ingredientName.toLowerCase()) ||
    ingredientName.toLowerCase().includes(fridgeItem.toLowerCase())
  );
};

// --- Components ---

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotationAnim = useRef(new Animated.Value(0)).current;

  const itemsOwned = recipe.ingredients.filter(ing => checkHasIngredient(ing.name)).length;
  const totalItems = recipe.ingredients.length;

  const toggleDropdown = () => {
    Animated.timing(rotationAnim, {
      toValue: isExpanded ? 0 : 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const rotateValue = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: recipe.imageUrl }} style={styles.recipeImage} />
        <View style={styles.ingredientInfo}>
          <Text style={styles.ingredientTitle}>Ingredients</Text>
          {recipe.ingredients.map((ing, idx) => {
            const owned = checkHasIngredient(ing.name);
            return (
              <View key={idx} style={styles.ingredientRow}>
                <Ionicons
                  name={owned ? 'checkmark-circle' : 'ellipse-outline'}
                  size={12}
                  color={owned ? colors.success : colors.textTertiary}
                />
                <Text style={[styles.ingredientText, owned && styles.ingredientTextOwned]}>
                  {ing.name}{ing.amount ? ` · ${ing.amount}` : ''}
                </Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.playButtonContainer}
          onPress={toggleDropdown}
          activeOpacity={0.7}
        >
          <Animated.View style={[styles.playButton, { transform: [{ rotate: rotateValue }] }]}>
            <Ionicons name="chevron-forward" size={18} color={colors.primary} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>How to cook</Text>
          {recipe.instructions.map((step, idx) => (
            <Text key={idx} style={styles.stepText}>
              {idx + 1}. {step}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.cardFooter}>
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        <Text style={styles.progressText}>
          You have {itemsOwned}/{totalItems} items needed for this recipe
        </Text>
      </View>
    </View>
  );
};

const RecipeSection = ({ title, recipes }: { title: string; recipes: Recipe[] }) => (
  <View style={styles.section}>
    <Text style={styles.sectionHeader}>{title}</Text>
    {recipes.map(recipe => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ))}
  </View>
);

const Recipes = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScreenHeader
        title="My Recipes"
        icon="restaurant-outline"
        actionIcon="refresh-outline"
        onActionPress={() => {}}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <RecipeSection title="For Nearly Expiring" recipes={RECIPES_DATA.nearlyExpiring} />
        <RecipeSection title="For Nearly Expiring + Non Expiring" recipes={RECIPES_DATA.mixed} />
        <RecipeSection title="For Non Expiring" recipes={RECIPES_DATA.nonExpiring} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionHeader: {
    ...type.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadow.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  recipeImage: {
    width: 88,
    height: 88,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
  },
  ingredientInfo: {
    flex: 1,
    marginLeft: spacing.md,
    gap: 3,
  },
  ingredientTitle: {
    ...type.caption,
    color: colors.textTertiary,
    marginBottom: 2,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ingredientText: {
    ...type.footnote,
    color: colors.textSecondary,
  },
  ingredientTextOwned: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  playButtonContainer: {
    justifyContent: 'center',
    paddingLeft: spacing.sm,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primarySurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionsContainer: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  instructionsTitle: {
    ...type.caption,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  stepText: {
    ...type.footnote,
    color: colors.textSecondary,
    lineHeight: 17,
    marginBottom: spacing.xs,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  recipeTitle: {
    ...type.title3,
    color: colors.textPrimary,
  },
  progressText: {
    ...type.footnote,
    color: colors.textSecondary,
    marginTop: 2,
  },
});

export default Recipes;
