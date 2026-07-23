import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors, spacing, statusColors, type } from "../constants/theme";

const AnimatedPath = Animated.createAnimatedComponent(Path);

type Counts = {
    safe: number;
    near: number;
    expired: number;
};

type CategoryKey = keyof Counts;

const CATEGORY_ORDER: { key: CategoryKey; label: string }[] = [
    { key: "safe", label: "Safe" },
    { key: "near", label: "Near Expiry" },
    { key: "expired", label: "Food Waste" },
];

const SIZE = 260;
const STROKE_WIDTH = 26;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CX = SIZE / 2;
const CY = RADIUS + STROKE_WIDTH / 2 + 4;
const HEIGHT = CY + STROKE_WIDTH / 2 + 4;
const GAP_DEG = 4;
const CYCLE_MS = 3000;
const FADE_MS = 220;

const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
        x: cx + r * Math.cos(angleRad),
        y: cy + r * Math.sin(angleRad),
    };
};

const describeArc = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(CX, CY, RADIUS, startAngle);
    const end = polarToCartesian(CX, CY, RADIUS, endAngle);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
};

// Modern semi-donut gauge: safe / near-expiry / food-waste as three arc
// segments (proportional to the real counts), with the readout below the
// arc auto-cycling through each category every few seconds.
const SemiDonutChart = ({ counts }: { counts: Counts }) => {
    const total = counts.safe + counts.near + counts.expired;
    const [activeIndex, setActiveIndex] = useState(0);
    const fade = useRef(new Animated.Value(1)).current;
    const segmentOpacity = useRef(
        CATEGORY_ORDER.reduce((acc, { key }) => {
            acc[key] = new Animated.Value(1);
            return acc;
        }, {} as Record<CategoryKey, Animated.Value>)
    ).current;

    useEffect(() => {
        if (total === 0) return;

        const cycle = () => {
            Animated.timing(fade, { toValue: 0, duration: FADE_MS, useNativeDriver: true }).start(() => {
                setActiveIndex((prev) => (prev + 1) % CATEGORY_ORDER.length);
                Animated.timing(fade, { toValue: 1, duration: FADE_MS, useNativeDriver: true }).start();
            });
        };

        const interval = setInterval(cycle, CYCLE_MS);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [total]);

    useEffect(() => {
        const activeKey = CATEGORY_ORDER[activeIndex].key;
        Animated.parallel(
            CATEGORY_ORDER.map(({ key }) =>
                Animated.timing(segmentOpacity[key], {
                    toValue: key === activeKey ? 1 : 0.35,
                    duration: FADE_MS + 80,
                    useNativeDriver: true,
                })
            )
        ).start();
    }, [activeIndex, segmentOpacity]);

    let cumulativeDeg = 0;
    const segments = CATEGORY_ORDER.map(({ key }, idx) => {
        const span = total > 0 ? (counts[key] / total) * 180 : 0;
        const rawStart = cumulativeDeg;
        const rawEnd = cumulativeDeg + span;
        cumulativeDeg = rawEnd;

        if (counts[key] <= 0) return null;

        const hasPrev = idx > 0 && counts[CATEGORY_ORDER[idx - 1].key] > 0;
        const hasNext = idx < CATEGORY_ORDER.length - 1 && counts[CATEGORY_ORDER[idx + 1].key] > 0;
        const start = 180 + rawStart + (hasPrev ? GAP_DEG / 2 : 0);
        const end = 180 + rawEnd - (hasNext ? GAP_DEG / 2 : 0);
        if (end <= start) return null;

        return { key, d: describeArc(start, end) };
    });

    const active = CATEGORY_ORDER[activeIndex];
    const activeCount = total > 0 ? counts[active.key] : 0;
    const activePercent = total > 0 ? Math.round((activeCount / total) * 100) : 0;
    const activeColor = statusColors[active.key].fg;

    return (
        <View style={styles.container}>
            <Svg width={SIZE} height={HEIGHT}>
                <Path
                    d={describeArc(180, 360)}
                    stroke={colors.surfaceAlt}
                    strokeWidth={STROKE_WIDTH}
                    strokeLinecap="round"
                    fill="none"
                />
                {segments.map((seg) =>
                    seg ? (
                        <AnimatedPath
                            key={seg.key}
                            d={seg.d}
                            stroke={statusColors[seg.key].fg}
                            strokeWidth={STROKE_WIDTH}
                            strokeLinecap="round"
                            fill="none"
                            opacity={segmentOpacity[seg.key]}
                        />
                    ) : null
                )}
            </Svg>

            <Animated.View style={[styles.readout, { opacity: fade }]}>
                <Text style={[styles.readoutLabel, { color: activeColor }]}>
                    {active.label.toUpperCase()}
                </Text>
                <Text style={styles.readoutCount}>
                    {activeCount} {activeCount === 1 ? "Item" : "Items"}
                </Text>
                <Text style={styles.readoutPercent}>{activePercent}%</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    readout: {
        alignItems: "center",
        marginTop: -spacing.md,
    },
    readoutLabel: {
        ...type.caption,
        marginBottom: 2,
    },
    readoutCount: {
        fontSize: 26,
        fontWeight: "800",
        color: colors.textPrimary,
    },
    readoutPercent: {
        ...type.subhead,
        color: colors.textSecondary,
        marginTop: 2,
    },
});

export default SemiDonutChart;
