import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { colors } from "../constants/theme";

type IoniconName = keyof typeof Ionicons.glyphMap;

const TabIcon = ({
  focused,
  outline,
  filled,
  color,
}: {
  focused: boolean;
  outline: IoniconName;
  filled: IoniconName;
  color: string;
}) => <Ionicons name={focused ? filled : outline} size={24} color={color} />;

const BrandTabIcon = ({ focused }: { focused: boolean }) => (
  <Image
    source={require("../../assets/branding/round-circle-icon.png")}
    style={{ width: 26, height: 26, borderRadius: 13, opacity: focused ? 1 : 0.45 }}
  />
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 88,
          paddingTop: 8,
          paddingBottom: 28,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} outline="home-outline" filled="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fridge"
        options={{
          title: "Fridge",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} outline="file-tray-stacked-outline" filled="file-tray-stacked" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="recipes"
        options={{
          title: "Recipes",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} outline="restaurant-outline" filled="restaurant" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => <BrandTabIcon focused={focused} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
