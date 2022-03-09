import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

export default function App() {
  const [count, setCount] = React.useState(0);
  return (
    <View style={[tw`flex`]}>
      <StatusBar style={[]} />
      <Header />
    </View>
  );
}

function Header() {
  return (
    <View style={[tw`flex top-0 bg-blue-600 h-32 w-full`]}>
      <Text style={[tw`font-extrabold text-3xl font-black tracking-wider text-white my-14`]}>ANIWATCH</Text>
    </View>
  )
}
