import { StyleSheet, Text, View } from "react-native";
import { radius, spacing, statusColors, type } from "../../constants/theme";

type Status = keyof typeof statusColors;

const StatusPill = ({ label, status }: { label: string; status: Status }) => {
    const { fg, bg } = statusColors[status];

    return (
        <View style={[styles.pill, { backgroundColor: bg }]}>
            <Text style={[styles.text, { color: fg }]}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    pill: {
        borderRadius: radius.pill,
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
        alignSelf: "flex-start",
    },
    text: {
        ...type.caption,
        textTransform: "uppercase",
    },
});

export default StatusPill;
