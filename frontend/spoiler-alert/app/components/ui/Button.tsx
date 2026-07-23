import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { colors, radius, spacing, type } from "../../constants/theme";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "md" | "lg";

type Props = TouchableOpacityProps & {
    title: string;
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    icon?: React.ReactNode;
};

const Button = ({ title, variant = "primary", size = "lg", loading, icon, style, disabled, ...rest }: Props) => {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={isDisabled}
            style={[
                styles.base,
                size === "lg" ? styles.sizeLg : styles.sizeMd,
                variantStyles[variant].container,
                isDisabled && styles.disabled,
                style,
            ]}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator color={variantStyles[variant].text.color as string} />
            ) : (
                <View style={styles.content}>
                    {icon}
                    <Text style={[styles.text, variantStyles[variant].text]}>{title}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        borderRadius: radius.pill,
        alignItems: "center",
        justifyContent: "center",
    },
    sizeLg: {
        paddingVertical: spacing.md + 2,
        paddingHorizontal: spacing.xxl,
    },
    sizeMd: {
        paddingVertical: spacing.sm + 4,
        paddingHorizontal: spacing.xl,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },
    text: {
        ...type.bodyMedium,
        fontWeight: "700",
    },
    disabled: {
        opacity: 0.5,
    },
});

const variantStyles: Record<Variant, { container: object; text: { color: string } }> = {
    primary: {
        container: { backgroundColor: colors.primary },
        text: { color: colors.textInverse },
    },
    secondary: {
        container: {
            backgroundColor: colors.surface,
            borderWidth: 1.5,
            borderColor: colors.borderStrong,
        },
        text: { color: colors.textPrimary },
    },
    ghost: {
        container: { backgroundColor: "transparent" },
        text: { color: colors.textSecondary },
    },
    destructive: {
        container: { backgroundColor: colors.dangerSurface },
        text: { color: colors.danger },
    },
};

export default Button;
