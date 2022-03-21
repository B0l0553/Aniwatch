import { FontAwesome, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, StyleSheet, Text } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import SubTabScreen from '../screens/SubTabScreen';
import DubTabScreen from '../screens/DubTabScreen';
import AboutScreen from '../screens/AboutScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import SubSearchScreen from '../screens/SubSearchScreen';
import { Octicons } from '@expo/vector-icons';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="SubSearch" options={{
          title: 'Search ...', animation: "fade_from_bottom"
        }} component={SubSearchScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="SubTab"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="SubTab"
        component={SubTabScreen}
        options={({navigation, route}) => ({ 
          title: 'Subtitled',
          headerRight: () => (<Pressable style={styles.searchWrapper} onPress={() => { navigation.navigate('SubSearch') }}><Text style={styles.search}>Search... <Octicons name='search' style={ styles.searchIcon }/></Text></Pressable>),
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="subtitles" color={color} />,
         })} />
      <BottomTab.Screen
        name="DubTab"
        component={DubTabScreen}
        options={{ 
          title: 'Dubbed',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={24} name="microphone-variant" color={color} />,
        }} />
      <BottomTab.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="ios-information-circle-outline" color={ color }/>
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
  searchWrapper: {
    backgroundColor: "#19e696",
    padding: 10,
    marginRight: 2,
    borderRadius: 10,
    color: 'black',
  },
  search: {
    fontSize: 20,
    
  },
  searchIcon: {
    fontSize: 22,
  }
});