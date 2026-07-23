import { StyleSheet } from "react-native";
import { colors, radius, shadow, spacing, type } from "../../constants/theme";

export const settingsPageStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  itemWrapper: {
    gap: spacing.lg,
  },
  itemContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow.sm,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primarySurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileDetails: {
    flex: 1,
    gap: spacing.xs,
  },
  profileName: {
    ...type.title3,
    color: colors.textPrimary,
  },
  profileEmail: {
    ...type.footnote,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statsContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadow.sm,
  },
  sectionHeader: {
    ...type.caption,
    color: colors.textTertiary,
    marginBottom: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsLabel: {
    ...type.subhead,
    color: colors.textSecondary,
  },
  trashedValue: {
    ...type.title3,
    color: colors.danger,
  },
  savedValue: {
    ...type.title3,
    color: colors.success,
  },
  menuButtonStack: {
    gap: spacing.md,
  },
  pillButton: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.sm,
  },
  pillButtonText: {
    ...type.bodyMedium,
    color: colors.textPrimary,
  },
  donateButton: {
    borderColor: colors.warning,
    backgroundColor: colors.warningSurface,
  },
});
