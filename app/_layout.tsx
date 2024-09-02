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
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'

import { useColorScheme } from '@/hooks/useColorScheme'
import { View } from 'react-native'
import { DBContext } from '@/context/context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const FeelingSchema: Realm.ObjectSchema = {
  name: 'Feeling',
  properties: {
    _id: 'int',
    emotion: 'string',
    message: 'string'
  },
  primaryKey: '_id'
}

const adInit = async () => {
  const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
  if (result === RESULTS.DENIED) {
    // The permission has not been requested, so request it.
    await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
  }

  const adapterStatuses = await mobileAds().initialize()
}

mobileAds()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,

    // An array of test device IDs to allow.
    testDeviceIdentifiers: ['EMULATOR']
  })
  .then(() => {
    // Request config successfully set!
  })

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
    // get
    loadRealm()
    adInit()
  }, [])
  console.log(realm)

  const onLayoutRootView = useCallback(async () => {
    // set
    if (realm && font) await SplashScreen.hideAsync()
  }, [realm, font])

  if (!(realm && font)) {
    // splash는 맨 밑에.
    return null
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DBContext.Provider value={realm}>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          {/* onLayout은 꼭 써줘야 함. */}
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <Stack
              screenOptions={{ headerShown: false, presentation: 'modal' }}
            >
              {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}

              <Stack.Screen name="index" />
              <Stack.Screen name="write" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </View>
      </DBContext.Provider>
    </GestureHandlerRootView>
  )
}
