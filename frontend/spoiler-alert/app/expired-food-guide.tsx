import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, spacing, type } from "./constants/theme";

// Placeholder destination for the "What To Do With Expired Food?" button.
// Swap this screen's content for a WebView (or change the button to
// Linking.openURL) once the real guide page exists.
const ExpiredFoodGuide = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} hitSlop={12} style={styles.closeButton}>
                    <Ionicons name="close" size={22} color={colors.textPrimary} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.iconWrap}>
                    <Ionicons name="leaf-outline" size={32} color={colors.primary} />
                </View>
                <Text style={styles.title}>What To Do With Expired Food?</Text>
                <Text style={styles.body}>
                    This will link out to our full guide on composting, safe disposal, and reducing
                    food waste. The page isn&apos;t live yet — check back soon!
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.md,
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.surfaceAlt,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing.xxxl,
        gap: spacing.md,
    },
    iconWrap: {
        width: 64,
        height: 64,
        borderRadius: radius.xl,
        backgroundColor: colors.primarySurface,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: spacing.sm,
    },
    title: {
        ...type.title2,
        color: colors.textPrimary,
        textAlign: "center",
    },
    body: {
        ...type.body,
        color: colors.textSecondary,
        textAlign: "center",
        lineHeight: 22,
    },
});

export default ExpiredFoodGuide;
