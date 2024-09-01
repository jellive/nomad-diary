import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { Appearance, useColorScheme } from 'react-native'
import styled, { useTheme } from 'styled-components/native'

const colorScheme = Appearance.getColorScheme()

const View = styled.View`
  flex: 1;
  padding: 0px 30px;
  padding-top: 100px;
  background-color: ${Colors[colorScheme ?? 'light'].background};
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
const BtnText = styled.Text``

export default function Index() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  return (
    <View>
      <Title>Home</Title>
      <Btn onPress={() => navigation.navigate({ name: 'write' })}>
        <Ionicons name="add" color="white" size={40} />
      </Btn>
    </View>
  )
}
