import { RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import EditScreenInfo from '../components/EditScreenInfo';
import { StyleSheet } from 'react-native';

export default function SubTabScreen({ navigation }: RootTabScreenProps<'SubTab'>) {
	return (
    <View style={styles.container}>
      <Text style={styles.title}>Subtitles Tab</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.5)" />
      <EditScreenInfo path="/screens/SubTabScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'teoran-font',
    fontSize: 18,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
