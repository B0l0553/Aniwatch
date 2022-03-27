import { RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import { Button, StyleSheet, Pressable, ColorSchemeName } from 'react-native';
import PopularAnimes from '../components/SubtitlesContent';
import { StatusBar } from 'expo-status-bar';

export default function SubTabScreen({ navigation }: RootTabScreenProps<'SubTab'>) {
	return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <PopularAnimes />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
