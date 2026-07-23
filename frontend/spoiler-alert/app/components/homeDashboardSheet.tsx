import { ReactNode, useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, PanResponder, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius, shadow, spacing } from "../constants/theme";

// Native pixel size of assets/branding/spoiler-alert-banner.png. Used to turn
// the measured container width into an explicit pixel height — `aspectRatio`
// doesn't reliably scale an Image's height from its width on react-native-web,
// so it's computed by hand here instead.
const BANNER_ASPECT = 1606 / 2860;
// Capped so the revealed banner stays a reasonable hero strip on wide
// screens (tablets, desktop web) instead of scaling up to the image's full
// aspect-ratio height, which would consume nearly the whole viewport.
const MAX_BANNER_HEIGHT = 260;
const SNAP_DURATION = 280;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

type Props = {
    children: ReactNode;
    onRevealChange?: (revealed: boolean) => void;
};

// The orange Spoiler Alert banner sits fixed behind everything, full-bleed to
// the very top of the screen (behind the status bar/notch). The dashboard
// below it is a draggable sheet: grab the handle at its top edge and pull it
// up to slide the sheet over the banner (hiding it), or pull back down to
// reveal it again. Only the handle strip owns the drag gesture — the
// scrollable dashboard content underneath is a separate area, so scrolling
// the page never fights with dragging the sheet. The handle zone is sized
// generously and kept clear of the notch/status bar so it stays a reliable,
// easy-to-grab touch target in both positions.
const HomeDashboardSheet = ({ children, onRevealChange }: Props) => {
    const insets = useSafeAreaInsets();
    const [containerWidth, setContainerWidth] = useState(0);
    const bannerHeight = insets.top + Math.min(containerWidth * BANNER_ASPECT, MAX_BANNER_HEIGHT);

    // PanResponder.create(...) below is captured once inside a ref (by design,
    // so an in-progress gesture keeps a stable identity). That means its
    // callbacks close over whatever `bannerHeight` was on the very first
    // render — 0, before the width is measured — and would silently keep
    // using that stale 0 forever otherwise. Mirroring the latest value into a
    // ref that's updated every render (not inside an effect, so it's current
    // before any touch event can fire) is what keeps the callbacks correct.
    const bannerHeightRef = useRef(bannerHeight);
    bannerHeightRef.current = bannerHeight;

    const translateY = useRef(new Animated.Value(0)).current;
    const currentValue = useRef(0);
    const dragStartValue = useRef(0);
    const initialized = useRef(false);

    useEffect(() => {
        const id = translateY.addListener(({ value }) => {
            currentValue.current = value;
        });
        return () => translateY.removeListener(id);
    }, [translateY]);

    useEffect(() => {
        if (containerWidth > 0 && !initialized.current) {
            initialized.current = true;
            translateY.setValue(bannerHeight);
            currentValue.current = bannerHeight;
            onRevealChange?.(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerWidth, bannerHeight, translateY]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 4,
            onPanResponderGrant: () => {
                translateY.stopAnimation();
                dragStartValue.current = currentValue.current;
            },
            onPanResponderMove: (_, gesture) => {
                const next = clamp(dragStartValue.current + gesture.dy, 0, bannerHeightRef.current);
                translateY.setValue(next);
            },
            onPanResponderRelease: () => {
                const revealed = currentValue.current > bannerHeightRef.current / 2;
                Animated.timing(translateY, {
                    toValue: revealed ? bannerHeightRef.current : 0,
                    duration: SNAP_DURATION,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }).start();
                onRevealChange?.(revealed);
            },
        })
    ).current;

    return (
        <View
            style={styles.root}
            onLayout={(e) => {
                const width = e.nativeEvent.layout.width;
                if (width && width !== containerWidth) setContainerWidth(width);
            }}
        >
            {containerWidth > 0 && (
                <Image
                    source={require("../../assets/branding/spoiler-alert-banner.png")}
                    style={[styles.banner, { width: containerWidth, height: bannerHeight }]}
                    resizeMode="cover"
                />
            )}

            {containerWidth > 0 && (
                <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
                    <View
                        {...panResponder.panHandlers}
                        style={[styles.handleZone, { paddingTop: insets.top + spacing.sm }]}
                    >
                        <View style={styles.handle} />
                    </View>
                    <ScrollView
                        style={styles.flex}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    banner: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
    },
    sheet: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.background,
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
        zIndex: 1,
        ...shadow.lg,
    },
    handleZone: {
        alignItems: "center",
        paddingBottom: spacing.md,
    },
    handle: {
        width: 36,
        height: 5,
        borderRadius: 3,
        backgroundColor: colors.borderStrong,
    },
    flex: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.sm,
        paddingBottom: 140,
        gap: spacing.xxxl,
    },
});

export default HomeDashboardSheet;
