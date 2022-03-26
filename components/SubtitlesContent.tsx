import { FlatList, ImageBackground, StyleSheet, TouchableOpacity, Modal, Pressable, Image, BackHandler, } from 'react-native';
import { useState } from 'react';
import { WebView } from 'react-native-webview';
import { Text, View } from './Themed';
import { GetAnime, GetPopularSub } from '../gogoanime';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default class PopularAnimes extends React.Component {
  constructor(props: any[]) {
    super(props);
    this.state = {
      page: 1,
      data: [],
      refreshing: true,
      AnimeModalVisible: false,
      AnimeModalImg: '',
      AnimeModalTitle: '',
      AnimeModalId: '',
      AnimeModalDesc: '',
      AnimeModalData: [],
      ViewModalVisible: false,
      ViewModalLink: ''
    }
  }

  componentDidMount() {
    this.fetchPopulars();
  }

  fetchPopulars() {
    this.setState({ refreshing: true, data: [], page: 1 });
    GetPopularSub(this.state.page)
      .then(resJson => {
        this.setState({ data: resJson });
        this.setState({ refreshing: false });
      }).catch(e => console.log("Network error"));
  }

  fetchAnime() {
    GetAnime(this.state.AnimeModalId)
      .then(resJson => {
        this.setState({
          AnimeModalDesc: resJson['about'],
          AnimeModalData: resJson['episodes']
        })
    })
  }

  addPage = () => {
    console.log(this.state.page)
    GetPopularSub(this.state.page + 1)
      .then(resJson => {
        this.setState({ data: this.state.data.concat(resJson), page: ++this.state.page })
      }).catch(e => console.log(e))
      .finally(() => {
        console.log(this.state.data);
        console.log(this.state.page);
      })
  }

  handleRefresh = () => {
    this.setState({ refreshing: false }, () => { this.fetchPopulars() });
  }

  handleEnd = () => {
    this.addPage()
  }

  ViewModal() {

    const [viewModalVisible, showViewModal] = useState(true)
    const onBackPress = () => {
      if (viewModalVisible) {
        console.log('eurg')
        showViewModal(false);
        
        return true;
      } else {
        return false;
      }
    }

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
    return (
      <Modal animationType='fade' visible={viewModalVisible}>
        <View>
        </View>
      </Modal>
    )
  }

  AnimeModal = () => {
    return (
      <Modal animationType='slide' visible={this.state.AnimeModalVisible}>
        <View style={styles.AnimeModal}> 
          <View style={{ flex: 1, flexDirection: 'column', justifyContent:'flex-start', alignItems:'center', margin: 4, borderRadius: 20, backgroundColor: '#111' }}>
            <Image style={styles.modalImg} source={{ uri: this.state.AnimeModalImg }} />   
            <Text style={{ fontWeight: 'bold', fontSize: 32 }}>{this.state.AnimeModalTitle}</Text>
            <Text>{this.state.AnimeModalId}</Text>
          <FlatList
            data={this.state.AnimeModalData}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={true}
            contentContainerStyle={{ flexDirection: 'column' }}
            numColumns={4}
            renderItem={item => {
              return (
                <TouchableOpacity style={
                  {
                    borderRadius: 20,
                    width: 64,
                    height: 32,
                    margin: 4,
                    backgroundColor: '#333',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onPress={() => { this.setState({ViewModalVisible: true}) }}
                >
                  <Text style={{color:'white'}}> { item.item.id } </Text>
                </TouchableOpacity>
              )
            }}
          />
          </View>
          <Pressable
            style={{ height: 32, width: 32, position: 'absolute', top: 4, left: 4 }}
            onPress={() => {
              this.setState({ AnimeModalVisible: !this.state.AnimeModalVisible })
              
            }}>
            <Ionicons color='#00FF7e' name='arrow-back' size={32} />
          </Pressable>
        </View>
      </Modal>
    )
  }

  render() {
    return (
      <>
        <this.ViewModal />
        <this.AnimeModal />
        <FlatList
          data={this.state.data}
          scrollEnabled={true}
          numColumns={2}
          contentContainerStyle={{ flexDirection: 'column' }}
          renderItem={item => {
            return (
              <TouchableOpacity style={styles.animeBoxS}
                onPress={() => {
                  this.setState({
                    AnimeModalVisible: true,
                    AnimeModalImg: item.item.img_url,
                    AnimeModalTitle: item.item.name,
                    AnimeModalId: item.item.anime_id
                  }, () => { })
                  this.fetchAnime()
                }}>
                <ImageBackground style={styles.imgs} source={{ uri: item.item.img_url }}>
                  <Text style={styles.title}>{item.item.name}</Text>
                </ImageBackground>
              </TouchableOpacity>
            )
          }}
          keyExtractor={item => item.hash.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleEnd}
          onEndReachedThreshold={0.01}
          />
      </>
    )
  }
}

const styles = StyleSheet.create({
  AnimeModal: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    flexDirection: 'column'
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
  },
  modalImg: {
    height: '50%',
    width: '75%',
    resizeMode: 'contain',
    margin: 4
  },
});

