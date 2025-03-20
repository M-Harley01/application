import { Tabs, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, StatusBar } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colleagueID } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: "#005DA0" }}>  
      {/* ✅ Fix: Corrected StatusBar props */}
      <StatusBar barStyle="light-content" backgroundColor="#005DA0" />

      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#005DA0", // ✅ Bottom tab bar color
          },
          tabBarActiveTintColor: "white", // ✅ Active tab color
          tabBarInactiveTintColor: "#AAC4EA", // ✅ Inactive tab color

          headerStyle: {backgroundColor: "#005DA0"},
          headerTintColor: "white",
          headerTitleStyle: {fontWeight: "bold"}
        }}
      >
        <Tabs.Screen name="index" initialParams={{ colleagueID }} />
        <Tabs.Screen name="schedule" initialParams={{ colleagueID }} />
        <Tabs.Screen name="report" initialParams={{ colleagueID }} />
      </Tabs>
    </View>
  );
}
