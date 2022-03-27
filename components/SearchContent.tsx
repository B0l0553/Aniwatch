import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
	Modal,
	ImageBackground,
	Pressable,
	FlatList,
	TouchableOpacity,
	Text,
	StyleSheet,
	TextInput
} from 'react-native';
import { Search } from "../gogoanime";


/*export default class SearchAnimes extends React.Component {
	constructor(props: any) {
		super(props);
		this.state = {
			data: [],
			query: this.props.query,
			AnimeModalVisible: false,
			AnimeModalImg: '',
			AnimeModalTitle: '',
		}
	}



	render() {
		return (
			<>
				<Modal style={styles.AnimeModal} animationType='slide' visible={this.state.AnimeModalVisible}>
					<ImageBackground style={{height: '100%'}} source={{ uri: this.state.AnimeModalImg }}>
						<Pressable onPress={() => { this.setState({ AnimeModalVisible: !this.state.AnimeModalVisible }) }}>
							<Ionicons name='arrow-back' size={32} />
						</Pressable>
					</ImageBackground>
				</Modal>
				<FlatList
				data={this.state.data}
				scrollEnabled={true}
				numColumns={2}
				contentContainerStyle={{ flexDirection: 'column' }}
				renderItem={item => {
					return (
					<TouchableOpacity style={styles.animeBoxS} onPress={ () => {this.setState({ AnimeModalVisible: true, AnimeModalImg: item.item.img_url, AnimeModalTitle: item.item.name, AnimeModalId: item.item.anime_id }, () => {}) }}>
						<ImageBackground style={styles.imgs} source={{ uri: item.item.img_url }}>
							<Text style={styles.title}>{item.item.name}</Text>
						</ImageBackground>
					</TouchableOpacity>
					)
				}}
				keyExtractor={item => item.id.toString()}
				/>
			</>
		)
	}
}*/

const styles = StyleSheet.create({
	AnimeModal: {

	},
	imgs: {
		width: 168,
		borderRadius: 10,
		overflow: 'hidden',
		justifyContent: 'flex-end',
		flex: 1,
	},
	scroll: {
		flex: 1,
		width: '100%',
	},
	animeBoxS: {
		borderRadius: 10,
		backgroundColor: '#252525',
		padding: 6,
		margin: 6,
		height: 240,
		width: 180,
		justifyContent: 'center'
	},
	title: {
		fontSize: 14,
		backgroundColor: '#505050',
		overflow: 'hidden',
		margin: 4,
		padding: 4,
		borderRadius: 10,
		textAlign: 'center',
	}
})