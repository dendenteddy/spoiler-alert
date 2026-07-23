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
            ...type.subhead,
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
      paddingTop: 64,
      paddingHorizontal: spacing.xl,
    },
    welcomeMsg: {
      marginBottom: spacing.xs,
    },
    welcomeMsgText: {
      ...type.title1,
      color: colors.textPrimary,
    },
    dateContainer: {
      marginBottom: spacing.xxl,
    },

    // Wrapper for all items
    itemWrapper: {
      gap: spacing.lg,
    },

    // For each category
    itemContainer: {
      backgroundColor: colors.surface,
      borderRadius: radius.lg,
      padding: spacing.lg,
      ...shadow.sm,
    },
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
    itemContentContainer: {
      flexDirection: "row",
    },
    itemTile: {
      width: 168,
      marginRight: spacing.md,
      padding: spacing.md,
      borderRadius: radius.md,
      gap: spacing.xs,
    },
    itemName: {
      ...type.bodyMedium,
      color: colors.textPrimary,
    },
    itemMeta: {
      ...type.footnote,
      color: colors.textSecondary,
    },
    bottomButtonWrapper: {
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      gap: spacing.md,
      paddingTop: spacing.xxl,
      paddingBottom: spacing.lg,
    },
    bottomButton: {
      width: "100%",
    },
  });

  return styles;
}
