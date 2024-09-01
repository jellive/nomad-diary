import { Colors } from '@/constants/Colors'
import { useContext, useState } from 'react'
import { Alert, Appearance, useColorScheme } from 'react-native'
import styled from 'styled-components/native'
import { DBContext } from './_layout'

const colorScheme = Appearance.getColorScheme()

const View = styled.View`
  background-color: ${Colors[colorScheme || 'light'].background};
  flex: 1;
  padding: 0 30px;
`
const Title = styled.Text`
  color: ${Colors[colorScheme || 'light'].text};
  margin: 50px 0;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
`

const TextInput = styled.TextInput`
  background-color: white;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 18px;
`

const Btn = styled.TouchableOpacity`
  width: 100%;
  margin-top: 30px;
  background-color: ${Colors[colorScheme || 'light'].btnColor};
  padding: 10px 20px;
  align-items: center;
  border-radius: 20px;
`
const BtnText = styled.Text`
  color: write;
  font-weight: 500;
  font-size: 18px;
`
const Emotions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`
const Emotion = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: white;
  padding: 5px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(props: { selected: boolean }) =>
    props.selected ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
`

const EmotionText = styled.Text`
  font-size: 24px;
`

const emotions = ['🤯', '🥲', '🤬', '🤗', '🥰', '😊', '🤩']

export default function Write() {
  const realm = useContext(DBContext)
  const [selectedEmotion, setEmotion] = useState<string | null>(null)
  const [feelings, setFeelings] = useState('')
  const onChangeText = (text: string) => setFeelings(text)
  const onEmotionPress = (face: string) => setEmotion(face)
  console.log(feelings, selectedEmotion)
  const onSubmit = () => {
    if (!(feelings && emotions)) Alert.alert('Please complete form.')
    console.log(feelings, selectedEmotion)
  }
  return (
    <View>
      <Title>How do you feel today?</Title>
      <Emotions>
        {emotions.map((emotion, index) => (
          <Emotion
            selected={emotion === selectedEmotion}
            onPress={() => onEmotionPress(emotions[index])}
            key={index}
          >
            <EmotionText>{emotion}</EmotionText>
          </Emotion>
        ))}
      </Emotions>
      <TextInput
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
        value={feelings}
        placeholder="Write your feelings..."
      />
      <Btn onPress={() => onSubmit()}>
        <BtnText>Save</BtnText>
      </Btn>
    </View>
  )
}
