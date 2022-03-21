import { SafeAreaView } from 'react-native-safe-area-context';
import { RootTabScreenProps } from '../types';
import { Text } from '../components/Themed'
import { StyleSheet } from 'react-native';

export default function AboutScreen({ navigation }: RootTabScreenProps<'About'>) {
	return (
		<SafeAreaView>
			<Text style={styles.title}>
				ABOUT
			</Text>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	title: {
		margin: 'auto',
		
	}
})