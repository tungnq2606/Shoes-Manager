import React, {Component, useContext, useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from './header';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputSpinner from 'react-native-input-spinner';
import {useState} from 'react/cjs/react.development';
import UserContext from '../UserContext';
import {useFocusEffect} from '@react-navigation/native';
export default function Cart({navigation}) {
  var name = useContext(UserContext);
  var showLabel = false;
  const [listItems, setListItems] = useState([]);
  var total = 0;
  if (listItems.length > 0) {
    for (let i = 0; i < listItems.length; i++) {
      total += Number(listItems[i].total);
    }
  }
  const Oder = async () => {
    await fetch('http://10.0.2.2:3000/order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then(response => response.json())
      .then(json => navigation.navigate('Thank'))
      .catch(error => console.error(error));
  };
  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        await fetch('http://10.0.2.2:3000/api/get-cart', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
          }),
        })
          .then(response => response.json())
          .then(json => setListItems(json))
          .catch(error => console.error(error));
      }
      fetchData();
    }, []),
  );

  if (total > 0) {
    showLabel = true;
  } else {
    showLabel = false;
  }
  const ItemView = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#F6F6F6',
          padding: 10,
          marginRight: 15,
          marginBottom: 10,
          marginTop: 10,
          alignItems: 'center',
        }}>
        <View style={{flex: 1.5}}>
          <Image
            source={{
              uri: 'http://10.0.2.2:3000/images/products/' + item.image,
            }}
            style={{width: 70, height: 70}}
          />
        </View>
        <View style={{flexDirection: 'column', flex: 3}}>
          <Text style={{marginBottom: 10, marginRight: 3}}>
            {item.productName}
          </Text>
          <Text style={{color: 'gray'}}>Size: {item.size}</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={{marginBottom: 10}}>SL: {item.quality}</Text>
          <Text>{item.total} VND</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Header navigation={navigation} name={name} />
      {showLabel ? null : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 5,
          }}>
          <Text style={{textAlign: 'center'}}>No products</Text>
        </View>
      )}
      <View
        style={{
          flex: 7,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.51,
          shadowRadius: 13.16,
          elevation: 1,
          marginBottom: 3,
        }}>
        <FlatList
          data={listItems}
          renderItem={ItemView}
          keyExtractor={item => item._id}
          style={{padding: 10}}
        />
      </View>

      {showLabel ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 3,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.51,
            shadowRadius: 13.16,
            elevation: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 15,
              paddingRight: 15,
              paddingBottom: 8,
            }}>
            <View style={{flexDirection: 'column', marginBottom: 10}}>
              <Text style={{color: 'gray'}}>Total</Text>
              <Text style={{fontSize: 18, marginTop: 5}}>${total}</Text>
            </View>
            <TouchableOpacity
              onPress={Oder}
              style={{
                width: '32%',
                height: 50,
                backgroundColor: '#ff551c',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '4%',
                paddingRight: '4%',
                flexDirection: 'row',
                borderRadius: 25,
              }}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Checkout</Text>
              <Icon name="long-arrow-right" size={20} color={'#fff'} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
