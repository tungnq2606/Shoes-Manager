import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';
import {useEffect} from 'react';
import * as React from 'react';
import UserContext from '../UserContext';
import Header from './header';

export default function Category({navigation}) {
  const name = React.useContext(UserContext);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await fetch('http://10.0.2.2:3000/api/category')
        .then(response => response.json())
        .then(json => setCategories(json))
        .catch(error => console.error(error));
    }
    fetchData();
  }, []);

  const ItemView = ({item}) => {
    return (
      <View>
        <Text style={styles.item}>{item.categoryName}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, height: '100%', backgroundColor: '#fff'}}>
      <Header navigation={navigation} name={name} />
      <FlatList
        data={categories}
        renderItem={ItemView}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  item: {
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: '#F7F7F7',
    width: '90%',
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'center',
    height: 60,
    margin: 10,
    textAlign: 'center',
  },
});
