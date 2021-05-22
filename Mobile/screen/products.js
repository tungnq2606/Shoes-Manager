import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as React from 'react';
import {useState, useContext} from 'react';
import {useEffect} from 'react';
import Header from './header';
import UserContext from '../UserContext';

export default function Products({navigation, route}) {
  const [listItems, setListItems] = useState([]);
  var name = useContext(UserContext);
  useEffect(() => {
    async function fetchData() {
      await fetch('http://10.0.2.2:3000/api/product')
        .then(response => response.json())
        .then(json => setListItems(json))
        .catch(error => console.error(error));
    }
    fetchData();
  }, []);
  const search = async text => {
    let keyword = text;
    if (text == '') {
      keyword = false;
    }
    await fetch(`http://10.0.2.2:3000/api/search/${keyword}`)
      .then(response => response.json())
      .then(json => setListItems(json))
      .catch(error => console.error(error));
  };

  const ItemView = ({item}) => {
    return (
      // FlatList Item
      <TouchableOpacity
        style={{flex: 1, margin: 5}}
        onPress={() => navigation.navigate('Detail', {data: item, name: name})}>
        <View style={styles.item_container}>
          <View
            style={{
              flex: 1,
              height: 180,
              alignItems: 'center',
              marginRight: 35,
            }}>
            <Text style={styles.name}>{item.productName}</Text>
            <Text style={styles.category}>{item.category.categoryName}</Text>
            <Image
              source={{
                uri: 'http://10.0.2.2:3000/images/products/' + item.image,
              }}
              style={{width: 120, height: 80, marginLeft: 20}}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              height: 50,
            }}>
            <Text
              style={{
                textAlign: 'center',
                flex: 1,
                marginTop: 10,
                marginRight: 40,
              }}>
              $ {item.price}
            </Text>
            <View style={styles.plus}>
              <Image
                source={require('../Image/plus.png')}
                style={{width: 25, height: 25}}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      <Header navigation={navigation} name={name} />
      <View style={styles.search}>
        <Image
          source={require('../Image/search.png')}
          style={{width: 15, height: 15, marginLeft: 15, marginRight: 15}}
        />
        <TextInput
          placeholder="Product name"
          onChangeText={text => {
            search(text);
          }}
        />
      </View>
      <View style={{width: '92%', alignSelf: 'center'}}>
        <Text style={styles.productTitle}>All products</Text>
      </View>
      <FlatList
        data={listItems}
        renderItem={ItemView}
        keyExtractor={item => item._id}
        style={{padding: 10}}
        numColumns={2}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  search: {
    marginLeft: '4%',
    borderRadius: 30,
    width: '92%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    marginTop: 20,
  },
  title: {textAlign: 'center', marginTop: 10, fontSize: 17},
  productTitle: {
    marginTop: 40,
    fontSize: 12,
  },
  plus: {
    height: 50,
    justifyContent: 'center',
    width: 50,
    paddingLeft: 14,
    borderBottomEndRadius: 20,
    backgroundColor: '#F8530D',
    borderTopStartRadius: 10,
  },
  name: {
    marginLeft: 20,
    marginTop: 10,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  item_container: {
    flex: 1,
    borderRadius: 20,
    height: 230,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'column',
    backgroundColor: '#F6F6F6',
  },
  category: {
    marginLeft: 20,
    marginRight: 50,
    marginBottom: 3,
    color: '#878383',
  },
});
