import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import SearchAnimes from '../components/SearchContent';

const SubSearchScreen = () => {
  const [query, setQuery] = useState(null)

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View>
        <TextInput style={styles.input} placeholder='Shingeki no Kyojin...' />
      </View>
      <View>
        <SearchAnimes />
      </View>
    </View>
  );
}

export default SubSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    color: 'green',
    width: 150,
  }
});
