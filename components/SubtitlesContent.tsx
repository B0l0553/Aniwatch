import { FlatList, ImageBackground, StyleSheet, TouchableOpacity, Modal, Pressable, Image, BackHandler, ActivityIndicator, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { Text, View } from './Themed';
import { GetAnime, GetPopularSub, WatchAnime } from '../gogoanime';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navigation from '../navigation/index';
import * as ScreenOrientation from 'expo-screen-orientation';

/*export default class PopularAnimes extends React.Component {
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
}*/

const PopularAnime = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const [isInfoVisible, setIsInfoVisible] = useState(false)
  const [isInfoLoading, setIsInfoLoading] = useState(false)
  const [infoTitle, setInfoTitle] = useState('')
  const [infoData, setInfoData] = useState([])
  const [infoId, setInfoId] = useState('')
  const [infoImg, setInfoImg] = useState('')
  const [infoDesc, setInfoDesc] = useState('')

  const [isViewerVisible, setIsViewerVisible] = useState(false)
  const [viewerId, setViewerId] = useState('')
  const [viewerLink, setViewerLink] = useState('')

  useEffect(() => {
    fetchPopular()
  }, [])

  const fetchPopular = () => {
    setIsLoading(true)
    setData([]);
    setPage(1);
    GetPopularSub(1)
      .then(resJson => {
        setData(resJson);
        setIsLoading(false);
      }).catch(err => {
        setIsLoading(false)
        setError(err);
      });
  }

  const addPage = () => {
    GetPopularSub(page + 1)
      .then(resJson => {
        setData(data.concat(resJson))
        setPage(page + 1)
      }).catch(e => console.log(e))
  }

  const handleEnd = () => {
    addPage()
  }

  function fetchAnime(id: string) {
    console.log("Fetching anime ...")
    GetAnime(id)
      .then(resJson => {
        setInfoDesc(resJson['about']);
        setInfoData(resJson['episodes']);
        setIsInfoVisible(true)
        setIsInfoLoading(false)
        console.log('fetched')
      }).catch(e => console.log(e))
  }

  function fetchVideo(id: string) {
    console.log(`fetching video... id: ${id}`)
    WatchAnime(id)
      .then(resJson => {
        setViewerLink(resJson)
        setIsViewerVisible(true)
        console.log(resJson)
      }).catch(e => {
        setIsViewerVisible(true)
        console.log(e);
    })
  }

  const ViewModal = () => {
    return (
      <Modal
        visible={isViewerVisible}
        onRequestClose={() => {
          setIsViewerVisible(false)
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        }}
        animationType='fade'
        presentationStyle='fullScreen'
        statusBarTranslucent
      >
        <WebView source={{uri: viewerLink}}  />
      </Modal>
    )
  }

  const InfoModal = () => {
    return (
      <Modal
        visible={isInfoVisible}
        onRequestClose={() => {
          setIsInfoVisible(false)
          setInfoData([])
          setInfoDesc('')
        }}
        animationType='fade'
        statusBarTranslucent
      >
        <View style={styles.infoModal}> 
          <View style={{ flex: 1, flexDirection: 'column', justifyContent:'flex-start', alignItems:'center', margin: 4, borderRadius: 20, backgroundColor: '#111' }}>
            <Image source={{ uri: infoImg }} style={[styles.modalImg]}/>
            <Text style={{ fontWeight: 'bold', fontSize: 32 }}>{infoTitle}</Text>
            <Text>{infoId}</Text>
            <Text style={{padding: 6, backgroundColor: '#222', margin: 4, borderRadius: 10}}>{ infoDesc }</Text>
            <FlatList
              data={infoData}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={true}
              contentContainerStyle={{ flexDirection: 'column' }}
              renderItem={(item: any) => {
                return (
                  <TouchableOpacity style={{
                      borderRadius: 20,
                      width: 256,
                      height: 32,
                      margin: 4,
                      backgroundColor: '#333',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onPress={() => {
                      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
                      //setViewerId(item.item.ep_id)
                      fetchVideo(item.item.ep_id)
                    }}
                  >
                    <Text style={{color:'white'}}> Episode { item.item.id } </Text>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        </View>
      </Modal>
    )
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    )
  }
  
  return (
    <View>
      
      <InfoModal />
      <ViewModal />
      <FlatList
        data={data}
        scrollEnabled={true}
        numColumns={2}
        contentContainerStyle={{ flexDirection: 'column' }}
        renderItem={(item: any) => {
          return (
            <TouchableOpacity style={styles.animeBoxS}
              onPress={() => {
                setInfoId(item.item.anime_id)
                setInfoImg(item.item.img_url)
                setInfoTitle(item.item.name)
                fetchAnime(item.item.anime_id)
              }}>
              <ImageBackground style={styles.imgs} source={{ uri: item.item.img_url }}>
                <Text style={styles.title}>{item.item.name}</Text>
              </ImageBackground>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchPopular}
        refreshing={isLoading}
        onEndReached={handleEnd}
        onEndReachedThreshold={0.1}
        />
    </View>
  )
}

export default PopularAnime;

const styles = StyleSheet.create({
  infoModal: {
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
    borderColor: '#888',
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
    margin: 4,
    overflow: 'hidden',
    borderRadius: 5
  },
});

