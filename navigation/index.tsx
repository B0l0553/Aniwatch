/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, StyleSheet, Text } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SubTabScreen from '../screens/SubTabScreen';
import DubTabScreen from '../screens/DubTabScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import SubSearchScreen from '../screens/SubSearchScreen';
import { Octicons } from '@expo/vector-icons';
import AnimeModal from '../screens/AnimeModal';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="SubSearch" options={{
          title: 'Search ...', animation: "fade_from_bottom"
        }} component={SubSearchScreen} />
        <Stack.Screen name="AnimeModal" options={{ animation: 'slide_from_right', title: '' }} component={ AnimeModal }/>
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      {/*<BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />*/}
      <BottomTab.Screen
        name="SubTab"
        component={SubTabScreen}
        options={({navigation, route}) => ({ 
          title: 'Subtitled',
          headerTitleStyle: { fontFamily: 'teoran-font' },
          headerRight: () => (<Pressable style={styles.searchWrapper} onPress={() => { navigation.navigate('SubSearch') }}><Text style={styles.search}>Search... <Octicons name='search' style={ styles.searchIcon }/></Text></Pressable>),
          tabBarLabelStyle: { fontFamily: 'teoran-font' },
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="subtitles" color={color} />,
         })} />
      <BottomTab.Screen
        name="DubTab"
        component={DubTabScreen}
        options={{ 
          title: 'Dubbed',
          tabBarLabelStyle: { fontFamily: 'teoran-font' },
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={24} name="microphone-variant" color={color} />,
         }} />
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
    fontSize: 14,
    fontFamily: 'teoran-font',
  },
  searchIcon: {
    fontSize: 22,
  }
});