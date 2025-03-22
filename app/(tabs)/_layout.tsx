import { Tabs, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, StatusBar } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colleagueID } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>  

      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#000000", 
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#AAAAAA", 

          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" }
        }}
      >
        <Tabs.Screen name="index" initialParams={{ colleagueID }} />
        <Tabs.Screen name="schedule" initialParams={{ colleagueID }} />
        <Tabs.Screen name="report" initialParams={{ colleagueID }} />
      </Tabs>
    </View>
  );
}
