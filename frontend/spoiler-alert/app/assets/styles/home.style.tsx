import { StyleSheet } from "react-native";
import { colors, radius, shadow, spacing, type } from "../../constants/theme";

export const buttonItemStyles = () => {
    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.overlay,
        },
        modalContent: {
            width: 300,
            backgroundColor: colors.surface,
            borderRadius: radius.xl,
            borderColor: colors.border,
            borderWidth: 1,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.lg,
            ...shadow.lg,
        },
        instructionText: {
            ...type.subhead,
            color: colors.textSecondary,
            marginTop: spacing.lg,
            marginBottom: spacing.sm,
        },
        textInput: {
            minHeight: 46,
            borderWidth: 1.5,
            borderColor: colors.border,
            borderRadius: radius.md,
            justifyContent: "center",
            overflow: "hidden",
            backgroundColor: colors.surface,
            paddingHorizontal: spacing.md,
        },
        datePicker: {
            paddingRight: spacing.md,
            paddingLeft: spacing.md,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        modalButton: {
            backgroundColor: colors.primary,
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.xl,
            borderRadius: radius.pill,
            alignItems: "center",
            justifyContent: "center",
            ...shadow.sm,
        },
        buttonContainer: {
            flexDirection: "row",
            justifyContent: "center",
            gap: spacing.md,
            margin: spacing.lg,
        },
        button: {
            borderRadius: radius.pill,
            paddingHorizontal: spacing.xl,
            paddingVertical: spacing.sm,
            borderColor: colors.borderStrong,
            alignItems: "center",
            borderWidth: 1.5,
        },
        buttonText: {
            alignItems: "center",
            color: colors.textInverse,
            ...type.bodyMedium,
            fontWeight: "700",
        },
        // Scan Item Styles
        cameraView: {
            flex: 1,
        },
        captureButton: {
            width: 76,
            height: 76,
            borderRadius: 38,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: "rgba(255, 251, 245, 0.25)",
            borderWidth: 3,
            borderColor: "rgba(255, 251, 245, 0.9)",
        },
        topButtons: {
            position: "absolute",
            top: 56,
            right: spacing.xl,
            width: 40,
            height: 40,
            gap: spacing.md,
        },
        topButton: {
            borderRadius: 20,
            backgroundColor: "rgba(255, 251, 245, 0.85)",
            justifyContent: "center",
            alignItems: "center",
            width: 40,
            height: 40,
        },
    });
    return styles;
}

export const displayDateStyles = () => {
    const styles = StyleSheet.create({
        dateContainer: {
            alignItems: "flex-start",
        },
        date: {
            fontSize: 19,
            fontWeight: "600",
            color: colors.textSecondary,
        },
    });
    return styles;
}

export const homePageStyles = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    // Page header — the Home page's "large title", the primary focal point
    pageHeader: {
      gap: 6,
      paddingTop: spacing.sm,
      paddingBottom: spacing.xs,
    },
    pageTitle: {
      fontSize: 42,
      fontWeight: "800",
      color: colors.primary,
      letterSpacing: -0.5,
    },
    statsRow: {
      flexDirection: "row",
      gap: spacing.md,
    },
    statTile: {
      flex: 1,
      backgroundColor: colors.surfaceAlt,
      borderRadius: radius.md,
      padding: spacing.md,
      gap: 4,
    },
    statLabel: {
      ...type.footnote,
      color: colors.textSecondary,
    },
    statValue: {
      fontSize: 28,
      fontWeight: "800",
      color: colors.textPrimary,
    },
    nearRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      marginTop: spacing.md,
      backgroundColor: colors.warningSurface,
      padding: spacing.md,
      borderRadius: radius.md,
    },
    nearText: {
      ...type.subhead,
      color: colors.textPrimary,
      flexShrink: 1,
    },
    chartCard: {
      alignItems: "center",
    },
    chartLabel: {
      ...type.caption,
      color: colors.textTertiary,
      marginBottom: spacing.md,
      alignSelf: "flex-start",
    },

    // Safe / Expired carousels
    itemHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    itemHeaderText: {
      ...type.headline,
      color: colors.textPrimary,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    emptyText: {
      ...type.subhead,
      color: colors.textTertiary,
      paddingVertical: spacing.md,
    },
    itemTile: {
      width: 168,
      marginRight: spacing.md,
      padding: spacing.md,
      borderRadius: radius.md,
      gap: spacing.xs,
    },
    itemTileIconWrap: {
      width: 28,
      height: 28,
      borderRadius: 10,
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 2,
    },
    itemName: {
      ...type.bodyMedium,
      color: colors.textPrimary,
    },
    itemMeta: {
      ...type.footnote,
      color: colors.textSecondary,
    },

    // Recipe suggestion card
    recipeRow: {
      flexDirection: "row",
      gap: spacing.md,
    },
    recipeImagePlaceholder: {
      width: 72,
      height: 72,
      borderRadius: radius.md,
      backgroundColor: colors.primarySurface,
      justifyContent: "center",
      alignItems: "center",
    },
    recipeTextBlock: {
      flex: 1,
      gap: 4,
      justifyContent: "center",
    },
    recipeTitle: {
      ...type.title3,
      color: colors.textPrimary,
    },
    recipeDescription: {
      ...type.footnote,
      color: colors.textSecondary,
    },
    recipeCta: {
      marginTop: spacing.lg,
    },

    // Bottom CTA
    expiredCta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.sm,
      backgroundColor: colors.dangerSurface,
      borderWidth: 1.5,
      borderColor: colors.danger,
      borderRadius: radius.pill,
      paddingVertical: spacing.md,
    },
    expiredCtaText: {
      ...type.bodyMedium,
      color: colors.danger,
      fontWeight: "700",
    },

    // Floating action button
    fabWrapper: {
      position: "absolute",
      bottom: spacing.xxl,
      right: spacing.xl,
    },
    fab: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      ...shadow.lg,
    },

    // Custom action-sheet fallback (Android/web)
    sheetOverlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: colors.overlay,
    },
    sheetContent: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: radius.xxl,
      borderTopRightRadius: radius.xxl,
      padding: spacing.xl,
      paddingBottom: spacing.xxxl,
      gap: spacing.md,
    },
    sheetTitle: {
      ...type.headline,
      color: colors.textSecondary,
      textAlign: "center",
      marginBottom: spacing.sm,
    },
  });

  return styles;
}
