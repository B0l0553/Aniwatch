import { SafeAreaView } from 'react-native-safe-area-context';
import { RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed'
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import React, { useState, useEffect } from 'react';

export default function AboutScreen({ navigation }: RootTabScreenProps<'About'>) {
	/*const [data, setData] = useState({
		x: 0,
		y: 0,
		z: 0
	});

	const prev = {x: 0, y: 0, z: 0}

	const [subscription, setSubscription] = useState(null);

	const _slow = () => {
		Gyroscope.setUpdateInterval(100);
	};

	const _subscribe = () => {
		setSubscription(
			Gyroscope.addListener(gyroscopeData => {
				setData(gyroscopeData);
      		})
    	);
	}

	const _unsubscribe = () => {
		subscription && subscription.remove();
		setSubscription(null);
	};
	
	useEffect(() => {
		_subscribe();
		return () => _unsubscribe();
  	}, []);

	_slow()
	const { x, y, z } = data;

	function deriveRotationY(y: number) {
		let newY = prev.x + x * -1

		prev.x = newY;
		return newY;
	}

	function deriveRotationX(x: number) {
		let newX = prev.x + y * -1

		prev.x = newX;
		return newX;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Gyroscope:</Text>
			<Text style={styles.text}>
				x: {Math.round(x)} y: {Math.round(y)} z: {Math.round(z)}
			</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
					<Text>{subscription ? 'On' : 'Off'}</Text>
				</TouchableOpacity>
			</View>
			<Image style={[styles.img, {
			transform: [
				{ rotateX: `${x*6}deg` },
				{ rotateY: `${y*6}deg` },
				{ rotateZ: `${z*6}deg`}
			]
			}]} source={{uri: 'https://static.pokemonpets.com/images/monsters-images-300-300/700-Sylveon.webp'}}  />
		</View>
	)*/

	return (
		<SafeAreaView>
			<Text>An APP made by B0l0553</Text>
		</SafeAreaView>
	)
}


const styles = StyleSheet.create({
	/*text: {
		margin: 'auto',
		
	},
	img: {
		height: 150,
		width: 150,
		backgroundColor: '#555'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	middleButton: {

	},
	buttonContainer: {

	},
	button: {
		textAlign: 'center',
	}*/

})