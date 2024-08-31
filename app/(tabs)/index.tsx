import { useNavigation } from 'expo-router'
import styled from 'styled-components/native'

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const Text = styled.Text``
const Btn = styled.TouchableOpacity``
const BtnText = styled.Text``

export default function Index() {
  const navigation = useNavigation()
  return (
    <View>
      <Btn onPress={() => navigation.navigate({ name: 'write' })}>
        <BtnText>Write</BtnText>
      </Btn>
      <Text>Home</Text>
    </View>
  )
}
