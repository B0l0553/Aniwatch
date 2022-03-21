import { RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import { Button, StyleSheet, Pressable, ColorSchemeName } from 'react-native';
import PopularAnimes from '../components/SubtitlesContent';

export default function SubTabScreen({ navigation }: RootTabScreenProps<'SubTab'>) {
	return (
    <View style={styles.container}>
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
