import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, spacing, type } from "../../constants/theme";

type Props = {
    title: string;
    icon?: keyof typeof Ionicons.glyphMap;
    subtitle?: string;
    actionIcon?: keyof typeof Ionicons.glyphMap;
    onActionPress?: () => void;
};

const ScreenHeader = ({ title, icon, subtitle, actionIcon, onActionPress }: Props) => {
    return (
        <View style={styles.header}>
            <View style={styles.left}>
                {icon && (
                    <View style={styles.iconWrap}>
                        <Ionicons name={icon} size={20} color={colors.primary} />
                    </View>
                )}
                <View>
                    <Text style={styles.title}>{title}</Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>
            </View>

            {actionIcon && onActionPress && (
                <TouchableOpacity onPress={onActionPress} activeOpacity={0.7} hitSlop={8}>
                    <Ionicons name={actionIcon} size={22} color={colors.textSecondary} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
    },
    iconWrap: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: colors.primarySurface,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        ...type.title2,
        color: colors.textPrimary,
    },
    subtitle: {
        ...type.footnote,
        color: colors.textSecondary,
        marginTop: 2,
    },
});

export default ScreenHeader;
