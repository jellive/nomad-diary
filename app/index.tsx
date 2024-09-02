import { Colors } from '@/constants/Colors'
import { useDB } from '@/context/context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, FlatList, Platform } from 'react-native'
import { Appearance, useColorScheme, LayoutAnimation } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled, { useTheme } from 'styled-components/native'
// ads!
import {
  InterstitialAd,
  AdEventType,
  TestIds,
  BannerAd,
  useForeground,
  BannerAdSize,
  RewardedAd,
  RewardedAdEventType
} from 'react-native-google-mobile-ads'

export const adUnitId = TestIds.INTERSTITIAL

const adBannerId = TestIds.BANNER

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing']
})

const reward = RewardedAd.createForAdRequest(TestIds.REWARDED, {
  keywords: ['game']
})
// ads!

const colorScheme = Appearance.getColorScheme()

const View = styled.View`
  flex: 1;
  padding: 0px 30px;
  padding-top: 100px;
  background-color: white;
`
const Title = styled.Text`
  color: ${Colors[colorScheme ?? 'light'].text};
  font-size: 38px;
  margin-bottom: 100px;
`
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors[colorScheme ?? 'light'].btnColor};
  elevation: 5;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`

const Record = styled.View`
  background-color: ${Colors[colorScheme ?? 'light'].cardColor};
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
`

const Emotion = styled.Text`
  font-size: 26px;
  margin-right: 10px;
`

const Message = styled.Text`
  font-size: 18px;
  font-weight: 400;
`

const Separator = styled.View`
  height: 10px;
`

const BtnText = styled.Text``

export default function Index() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  const realm = useDB()
  const [feelings, setFeelings] = useState(realm?.objects('Feeling'))

  // ads!
  // interstitial (전체 가로막기)
  const [loaded, setLoaded] = useState(false)
  // useEffect(() => {
  //   const unsubscribe = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       setLoaded(true)
  //     }
  //   )

  //   // Start loading the interstitial straight away
  //   interstitial.load()

  //   // Unsubscribe from events on unmount
  //   return unsubscribe
  // }, [])

  // banner
  const bannerRef = useRef<BannerAd>(null)
  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load()
  })

  useEffect(() => {
    const unsubscribeEarned = reward.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward)
      }
    )
    reward.load()
    return unsubscribeEarned
  }, [])
  // ads!

  useEffect(() => {
    feelings?.addListener((feel, changes) => {
      console.log('new feeling change')
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring) // 상태가 바뀌면 자연스레 바꿔준다.
      LayoutAnimation.spring() // 이렇게 써도 됨.
      setFeelings(feel.sorted('_id', false)) // false면 desc, true면 asc
    })
    return () => {
      feelings?.removeAllListeners()
    }
    // const feelings = realm?.objects('Feeling')
    // console.log('feelings', feelings)
    // const happy = feelings?.filtered(`emotion = '🤯'`)
    // console.log('happy', happy)
  }, [])
  const removeFeeling = (id: string) => {
    realm?.write(() => {
      const feeling = realm.objectForPrimaryKey('Feeling', id)
      realm.delete(feeling)
    })
  }

  return (
    <View>
      <Title>Home</Title>

      <BannerAd
        ref={bannerRef}
        unitId={adBannerId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />

      <FlatList
        data={feelings}
        contentContainerStyle={{ paddingVertical: 10 }}
        ItemSeparatorComponent={Separator}
        keyExtractor={feeling => feeling._id + ''}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => removeFeeling(item._id as string)}>
            <Record>
              <Emotion>{item.emotion}</Emotion>
              <Message>{item.message}</Message>
            </Record>
          </TouchableOpacity>
        )}
      />

      <Btn onPress={() => navigation.navigate({ name: 'write' })}>
        <Ionicons name="add" color="white" size={40} />
      </Btn>

      {/* ads! */}
      <Button
        title="Show Interstitial"
        onPress={() => {
          interstitial.show()
        }}
      />
      {/* ads! */}
    </View>
  )
}
