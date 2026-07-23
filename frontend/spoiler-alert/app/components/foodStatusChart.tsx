import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, statusColors, type } from "../constants/theme";

type Counts = {
    safe: number;
    near: number;
    expired: number;
};

const LEGEND: { key: keyof Counts; label: string }[] = [
    { key: "safe", label: "Safe" },
    { key: "near", label: "Near Expiry" },
    { key: "expired", label: "Expired" },
];

// Simple horizontal distribution bar (no chart library / no native deps needed).
const FoodStatusChart = ({ counts }: { counts: Counts }) => {
    const total = counts.safe + counts.near + counts.expired;

    return (
        <View>
            <View style={styles.bar}>
                {total === 0 ? (
                    <View style={styles.emptySegment} />
                ) : (
                    LEGEND.map(({ key }) =>
                        counts[key] > 0 ? (
                            <View
                                key={key}
                                style={{ flex: counts[key], backgroundColor: statusColors[key].fg }}
                            />
                        ) : null
                    )
                )}
            </View>

            <View style={styles.legendRow}>
                {LEGEND.map(({ key, label }) => (
                    <View key={key} style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: statusColors[key].fg }]} />
                        <Text style={styles.legendText}>
                            {label} · {counts[key]}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        flexDirection: "row",
        height: 14,
        borderRadius: radius.pill,
        overflow: "hidden",
        backgroundColor: colors.surfaceAlt,
    },
    emptySegment: {
        flex: 1,
    },
    legendRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.md,
        marginTop: spacing.md,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legendText: {
        ...type.footnote,
        color: colors.textSecondary,
    },
});

export default FoodStatusChart;
