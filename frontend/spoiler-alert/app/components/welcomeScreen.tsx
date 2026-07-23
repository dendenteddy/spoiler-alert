import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Button } from "./ui";
import { colors, radius, spacing, type } from "../constants/theme";

type Props = {
    onSkip: () => void;
};

const notImplemented = (action: string) =>
    Alert.alert(action, "Accounts aren't wired up yet — hang tight!");

const WelcomeScreen = ({ onSkip }: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <StatusBar barStyle="dark-content" />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.hero}>
                    <Image
                        source={require("../../assets/branding/Round circle icon.png")}
                        style={styles.logo}
                    />
                    <Text style={styles.tagline}>Don&apos;t let good food go bad.</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputWrap}>
                        <Ionicons name="mail-outline" size={18} color={colors.textTertiary} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={colors.textTertiary}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputWrap}>
                        <Ionicons name="lock-closed-outline" size={18} color={colors.textTertiary} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor={colors.textTertiary}
                            autoCapitalize="none"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
                            <Ionicons
                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                size={18}
                                color={colors.textTertiary}
                            />
                        </TouchableOpacity>
                    </View>

                    <Button
                        title="Log In"
                        variant="primary"
                        style={styles.fullWidthButton}
                        onPress={() => notImplemented("Log In")}
                    />
                    <Button
                        title="Sign Up"
                        variant="secondary"
                        style={styles.fullWidthButton}
                        onPress={() => notImplemented("Sign Up")}
                    />

                    <TouchableOpacity onPress={onSkip} style={styles.skipButton} activeOpacity={0.6}>
                        <Text style={styles.skipText}>Continue as Guest</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: spacing.xxl,
        paddingVertical: spacing.huge,
    },
    hero: {
        alignItems: "center",
        marginBottom: spacing.huge,
    },
    logo: {
        width: 132,
        height: 132,
        borderRadius: 66,
        shadowColor: colors.primaryDark,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 8,
        marginBottom: spacing.xl,
    },
    tagline: {
        ...type.headline,
        color: colors.textSecondary,
        textAlign: "center",
    },
    form: {
        gap: spacing.md,
    },
    inputWrap: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.surface,
        borderRadius: radius.pill,
        borderWidth: 1.5,
        borderColor: colors.border,
        paddingHorizontal: spacing.lg,
        height: 52,
        gap: spacing.sm,
    },
    inputIcon: {
        marginRight: 2,
    },
    input: {
        flex: 1,
        ...type.body,
        color: colors.textPrimary,
        height: "100%",
    },
    fullWidthButton: {
        marginTop: spacing.sm,
    },
    skipButton: {
        alignItems: "center",
        paddingVertical: spacing.lg,
    },
    skipText: {
        ...type.bodyMedium,
        color: colors.textTertiary,
    },
});

export default WelcomeScreen;
