import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  NavigationContainer
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import React, { useCallback, useEffect, useState } from 'react'
import 'react-native-reanimated'
import Realm from 'realm'

import { useColorScheme } from '@/hooks/useColorScheme'
import { View } from 'react-native'

const FeelingSchema: Realm.ObjectSchema = {
  name: 'Feeling',
  properties: {
    _id: 'int',
    emotion: 'string',
    message: 'string'
  },
  primaryKey: '_id'
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [realm, setRealm] = useState<Realm | null>(null)
  const colorScheme = useColorScheme()
  const font = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })
  const loadRealm = async () => {
    const db = await Realm.open({
      path: 'nomadDiaryDB',
      schema: [FeelingSchema]
    })
    setRealm(db)
  }

  useEffect(() => {
    loadRealm()
  }, [])
  console.log(realm)

  const onLayoutRootView = useCallback(async () => {
    if (realm && font) await SplashScreen.hideAsync()
  }, [realm, font])

  if (!(realm && font)) {
    // splash는 맨 밑에.
    return null
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {/* onLayout은 꼭 써줘야 함. */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false, presentation: 'modal' }}>
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}

          <Stack.Screen name="index" />
          <Stack.Screen name="write" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </View>
  )
}
