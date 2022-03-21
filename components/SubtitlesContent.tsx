import { FlatList, ImageBackground, StyleSheet, TouchableOpacity, ScrollView, Modal, BackHandler, Pressable } from 'react-native';
import { Text } from './Themed';
import { GetPopularSub } from '../gogoanime';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

class GetPopularAnimes extends React.Component {
  constructor(props: any[]) {
    super(props);
    this.state = {
      data: [],
      refreshing: true,
      AnimeModalVisible: false,
      AnimeModalImg: '',
      AnimeModalTitle: '',
    }
  }

  componentDidMount() {
    this.fetchPopulars();
  }

  fetchPopulars() {
    this.setState({ refreshing: true });
    GetPopularSub(1)
      .then(resJson => {
        this.setState({ data: resJson });
        this.setState({ refreshing: false });
      }).catch(e => console.log(e));

  }

  handleRefresh = () => {
    this.setState({ refreshing: false }, () => { this.fetchPopulars() });
    return ( <Text>Loading ... </Text>)
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
              <TouchableOpacity style={styles.animeBoxS} onPress={ () => {this.setState({ AnimeModalVisible: true, AnimeModalImg: item.item.img_url, AnimeModalTitle: item.item.name }, () => {}) }}>
                <ImageBackground style={styles.imgs} source={{ uri: item.item.img_url }}>
                  <Text style={styles.title}>{item.item.name}</Text>
                </ImageBackground>
              </TouchableOpacity>
            )
          }}
          keyExtractor={item => item.id.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh} />
      </>
    )
  }
}

function SearchAnime(text: string) {

}

export {
  GetPopularAnimes,
  SearchAnime,
}

const styles = StyleSheet.create({
  AnimeModal: {

  },
  imgs: {
    width: 148,
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
    height: 220,
    width: 160,
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

