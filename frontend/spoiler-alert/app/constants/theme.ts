// Spoiler Alert design tokens.
// Colors are sampled directly from the brand assets in assets/branding/
// so anything built with these tokens stays visually identical to the logo.

export const colors = {
  // Brand
  primary: "#DB4A2B", // flat brand orange (matches the glyph assets exactly)
  primaryLight: "#FE904C", // lighter end of the brand gradient
  primaryDark: "#B23A20", // pressed / emphasis state
  primarySurface: "#FDE6DA", // tinted background for badges/highlights on cream

  // Neutrals (warm-tinted, not cold gray)
  background: "#FFFBF5",
  surface: "#FFFFFF",
  surfaceAlt: "#FFF5EA",
  border: "#F0E1D2",
  borderStrong: "#E4CDB8",

  textPrimary: "#241812",
  textSecondary: "#6B5B50",
  textTertiary: "#A0897A",
  textInverse: "#FFFBF5",

  // Semantic status (harmonized with the warm palette, not stock Material colors)
  success: "#3B9B6B",
  successSurface: "#E1F2E8",
  warning: "#DDA22A",
  warningSurface: "#FBF0DA",
  danger: "#C13E3E",
  dangerSurface: "#FBE4E1",

  overlay: "rgba(36, 24, 18, 0.5)",
} as const;

// Expiry-status specific aliases so screens don't hardcode which semantic color means what.
export const statusColors = {
  safe: { fg: colors.success, bg: colors.successSurface },
  near: { fg: colors.warning, bg: colors.warningSurface },
  expired: { fg: colors.danger, bg: colors.dangerSurface },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 28,
  pill: 999,
} as const;

// No fontFamily set on purpose: React Native's default font IS San Francisco on
// iOS and Roboto on Android, which is exactly the native system stack we want.
export const type = {
  display: { fontSize: 34, fontWeight: "800" as const, letterSpacing: 0.2 },
  title1: { fontSize: 26, fontWeight: "800" as const, letterSpacing: 0.1 },
  title2: { fontSize: 20, fontWeight: "700" as const },
  title3: { fontSize: 17, fontWeight: "700" as const },
  headline: { fontSize: 16, fontWeight: "600" as const },
  body: { fontSize: 15, fontWeight: "400" as const },
  bodyMedium: { fontSize: 15, fontWeight: "600" as const },
  subhead: { fontSize: 13, fontWeight: "500" as const },
  footnote: { fontSize: 12, fontWeight: "500" as const },
  caption: { fontSize: 11, fontWeight: "700" as const, letterSpacing: 0.5 },
} as const;

export const shadow = {
  sm: {
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 22,
    elevation: 8,
  },
} as const;

const theme = { colors, statusColors, spacing, radius, type, shadow };
export default theme;
