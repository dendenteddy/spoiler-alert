import { StyleSheet } from "react-native";
import { colors, radius, shadow, spacing, type } from "../../constants/theme";

export const componentStyles = () => {
    const styles = StyleSheet.create({
        modalButton: {
            backgroundColor: colors.primary,
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.xxl,
            borderRadius: radius.pill,
            alignItems: "center",
            justifyContent: "center",
            ...shadow.sm,
        },
        buttonText: {
            color: colors.textInverse,
            ...type.bodyMedium,
            fontWeight: "700",
        },
        modalContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.overlay,
        },
        modalContent: {
            backgroundColor: colors.surface,
            width: "85%",
            borderRadius: radius.xl,
            padding: spacing.xl,
            ...shadow.lg,
        },
        instructionText: {
            ...type.subhead,
            color: colors.textSecondary,
            marginTop: spacing.lg,
            marginBottom: spacing.sm,
        },
        textInput: {
            borderWidth: 1.5,
            borderColor: colors.border,
            borderRadius: radius.md,
            paddingHorizontal: spacing.md,
            height: 48,
            justifyContent: "center",
            backgroundColor: colors.surface,
        },
        datePicker: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        buttonContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            gap: spacing.md,
            marginTop: spacing.xxl,
        },
        button: {
            flex: 1,
        },
    });
    return styles;
}
