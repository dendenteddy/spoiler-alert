import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { colors } from "../../constants/theme";

type Variant = "light" | "dark";

type Props = TouchableOpacityProps & {
    name: keyof typeof Ionicons.glyphMap;
    variant?: Variant;
    size?: number;
    iconSize?: number;
};

// Circular translucent icon button, for use over photos/camera previews
// (matches the iOS Camera app's control chrome).
const IconButton = ({ name, variant = "light", size = 40, iconSize = 20, style, ...rest }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={[
                styles.base,
                { width: size, height: size, borderRadius: size / 2 },
                variant === "light" ? styles.light : styles.dark,
                style,
            ]}
            {...rest}
        >
            <Ionicons name={name} size={iconSize} color={variant === "light" ? colors.textPrimary : colors.textInverse} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        justifyContent: "center",
        alignItems: "center",
    },
    light: {
        backgroundColor: "rgba(255, 251, 245, 0.85)",
    },
    dark: {
        backgroundColor: "rgba(36, 24, 18, 0.55)",
    },
});

export default IconButton;
