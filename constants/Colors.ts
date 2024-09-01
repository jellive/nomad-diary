/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4'
const tintColorDark = '#fff'

export const Colors = {
  light: {
    text: '#34ace0',
    background: '#ffda79',
    tint: tintColorLight,
    icon: '#687076',
    cardColor: '#f7f1e3',
    btnColor: '#706fd3',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    cardColor: '#f7f1e3',
    btnColor: '#706fd3',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark
  }
}
