import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AddItem from '../components/addItem';
import AddPhoto from '../components/addPhoto';
import { ScreenHeader, StatusPill } from '../components/ui';
import { colors, radius, shadow, spacing, type } from '../constants/theme';

// --- Types ---
interface FridgeItem {
  id: string;
  name: string;
  expiryDate: string;
  type: 'vegetable' | 'dairy' | 'meat' | 'grain' | 'other';
  isExpiringSoon?: boolean;
}

interface CategoryProps {
  title: string;
  items: FridgeItem[];
  isOpen: boolean;
  onToggle: () => void;
}

// --- Mock Data ---
const INITIAL_DATA: Record<string, FridgeItem[]> = {
  'Fruits and Vegetables': [
    { id: '1', name: 'Cabbage', expiryDate: '06/02/2026', type: 'vegetable' },
    { id: '2', name: 'Canned Corn', expiryDate: '20/02/2026', type: 'vegetable' },
  ],
  'Meat and Dairy': [
    { id: '3', name: 'Meiji Milk', expiryDate: '31/01/2026', type: 'dairy', isExpiringSoon: true },
    { id: '4', name: 'Cream Cheese', expiryDate: '02/02/2026', type: 'dairy', isExpiringSoon: true },
    { id: '5', name: 'Chicken Wings', expiryDate: '03/02/2026', type: 'meat', isExpiringSoon: true },
    { id: '6', name: 'Bacon', expiryDate: '20/02/2026', type: 'meat' },
  ],
  Others: [
    { id: '7', name: 'Bread Loaf', expiryDate: '09/02/2026', type: 'other' },
  ],
};

const ICON_BY_TYPE: Record<FridgeItem['type'], keyof typeof Ionicons.glyphMap> = {
  vegetable: 'leaf-outline',
  dairy: 'water-outline',
  meat: 'restaurant-outline',
  grain: 'nutrition-outline',
  other: 'nutrition-outline',
};

// --- Components ---

const ItemCard = ({ item }: { item: FridgeItem }) => {
  return (
    <View style={styles.itemCard}>
      <View style={styles.iconContainer}>
        <Ionicons name={ICON_BY_TYPE[item.type]} size={20} color={colors.primary} />
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemExpiry}>Exp: {item.expiryDate}</Text>
      </View>
      {item.isExpiringSoon ? (
        <StatusPill label="Soon" status="near" />
      ) : (
        <TouchableOpacity hitSlop={8}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.textTertiary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const CategorySection = ({ title, items, isOpen, onToggle }: CategoryProps) => (
  <View style={styles.categoryWrapper}>
    <TouchableOpacity style={styles.categoryHeader} onPress={onToggle} activeOpacity={0.7}>
      <Text style={styles.categoryTitle}>{title.toUpperCase()}</Text>
      <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color={colors.textSecondary} />
    </TouchableOpacity>
    {isOpen && (
      <View style={styles.itemsList}>
        {items.map(item => <ItemCard key={item.id} item={item} />)}
      </View>
    )}
  </View>
);

const Fridge = () => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'Fruits and Vegetables': true,
    'Meat and Dairy': true,
    Others: true,
  });

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScreenHeader title="My Fridge" icon="file-tray-stacked-outline" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {Object.entries(INITIAL_DATA).map(([title, items]) => (
          <CategorySection
            key={title}
            title={title}
            items={items}
            isOpen={openCategories[title]}
            onToggle={() => toggleCategory(title)}
          />
        ))}
      </ScrollView>

      <View style={styles.actionRow}>
        <View style={styles.actionButtonContainer}>
          <AddItem />
        </View>
        <View style={styles.actionButtonContainer}>
          <AddPhoto />
        </View>
      </View>
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
    paddingBottom: spacing.lg,
  },
  categoryWrapper: {
    marginBottom: spacing.lg,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
  },
  categoryTitle: {
    ...type.caption,
    color: colors.textSecondary,
  },
  itemsList: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.lg,
    ...shadow.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primarySurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  itemName: {
    ...type.bodyMedium,
    color: colors.textPrimary,
  },
  itemExpiry: {
    ...type.footnote,
    color: colors.textSecondary,
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.background,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButtonContainer: {
    flex: 1,
  },
});

export default Fridge;
