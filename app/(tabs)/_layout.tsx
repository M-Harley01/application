/* _layout.tsx */

import { Tabs, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colleagueID } = useLocalSearchParams();
 
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        initialParams={{ colleagueID }}
      />
      <Tabs.Screen
        name="schedule"
        initialParams={{ colleagueID }}
      />
      <Tabs.Screen
        name="report"
        initialParams={{ colleagueID }}
      />

    </Tabs>
  );
}
