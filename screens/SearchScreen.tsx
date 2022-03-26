import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, Modal, Pressable, FlatList, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import SearchAnimes from '../components/SearchContent';

const SearchScreen = () => {
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [AnimeModalVisible, setAnimeModalVisible] = useState(false)
  const [AnimeModalImg, setAnimeModalImg] = useState('')
  const [AnimeModalTitle, setAnimeModalTitle] = useState('')
  const [AnimeModalId, setAnimeModalId] = useState('')

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder='Shingeki no Kyojin...' value={query} onChangeText={setQuery} />
      </View>
      <View>
				<Modal style={styles.AnimeModal} animationType='slide' visible={AnimeModalVisible}>
					<Image style={{height: '100%'}} source={{ uri: AnimeModalImg }} />
          <Pressable onPress={() => { setAnimeModalVisible(!AnimeModalVisible) }}>
            <Ionicons name='arrow-back' size={32} />
          </Pressable>
				</Modal>
				<FlatList
				data={data}
				scrollEnabled={true}
				numColumns={2}
				contentContainerStyle={{ flexDirection: 'column' }}
				renderItem={item => {
					return (
            <TouchableOpacity style={styles.animeBoxS} onPress={() => {
              setAnimeModalVisible(true);
              setAnimeModalImg(item.item.img_url);
              setAnimeModalTitle(item.item.name);
              setAnimeModalId(item.item.anime_id);
            }} >
						<ImageBackground style={styles.imgs} source={{ uri: item.item.img_url }}>
							<Text style={styles.title}>{item.item.name}</Text>
						</ImageBackground>
					</TouchableOpacity>
					)
				}}
				keyExtractor={item => item.hash.toString()}
        />
      </View>
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 10
  },
  input: {
    color: 'black',
    padding: 4,
    width: 360,
  },
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
});
