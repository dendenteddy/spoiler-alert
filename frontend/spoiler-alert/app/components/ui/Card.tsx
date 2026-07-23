import { StyleSheet, View, ViewProps } from "react-native";
import { colors, radius, shadow, spacing } from "../../constants/theme";

type Props = ViewProps & {
    padded?: boolean;
    elevation?: "sm" | "md" | "none";
};

const Card = ({ padded = true, elevation = "sm", style, children, ...rest }: Props) => {
    return (
        <View
            style={[
                styles.base,
                padded && styles.padded,
                elevation === "sm" && shadow.sm,
                elevation === "md" && shadow.md,
                style,
            ]}
            {...rest}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
    },
    padded: {
        padding: spacing.lg,
    },
});

export default Card;
