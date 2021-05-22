import React, {useState} from 'react';
import InputSpinner from 'react-native-input-spinner';
import UserContext from '../UserContext';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text>{item.size}</Text>
  </TouchableOpacity>
);

const Details = ({route}) => {
  const name = route.params.name;
  const [quality, setQuality] = useState(1);
  const data = route.params.data;
  const [addSize, setAddSize] = useState('');

  const total = Number(data.price) * Number(quality);

  const size = data.size.split(',');
  const listSize = [];
  for (var i = 0; i < size.length; i++) {
    listSize.push({id: i, size: size[i]});
  }
  const [selectedId, setSelectedId] = useState(null);

  const addToCart = async () => {
    await fetch('http://10.0.2.2:3000/api/cart', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer: name,
        image: data.image,
        productName: data.productName,
        size: addSize,
        quality: quality,
        total: total,
      }),
    })
      .then(response => response.json())
      .then(json => ToastAndroid.show(json.status, ToastAndroid.SHORT))
      .catch(error => console.error(error));
  };

  const renderItem = ({item}) => {
    const borderColor = item.id === selectedId ? '#000' : '#d9d9d9';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          setAddSize(item.size);
        }}
        style={{borderColor}}
      />
    );
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', backgroundColor: '#F6F6F6', height: '45%'}}>
        <Image
          source={{
            uri: 'http://10.0.2.2:3000/images/products/' + data.image,
          }}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: '55%',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: '85%',
            height: '100%',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingTop: '8%',
            alignSelf: 'center',
          }}>
          <Text style={{fontSize: 18, marginBottom: '12%'}}>
            {data.productName}
          </Text>

          <Text style={{fontSize: 15}}>Select size</Text>
          <View style={{height: 70}}>
            <FlatList
              horizontal={true}
              data={listSize}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              extraData={selectedId}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '12%',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{flex: 1}}>Qty</Text>
              <InputSpinner
                style={{flex: 2}}
                height={35}
                width={120}
                min={1}
                max={50}
                initialValue={1}
                step={1}
                color={'gray'}
                fontSize={10}
                inputStyle={{borderWidth: 0.5, borderColor: 'gray'}}
                buttonStyle={{backgroundColor: 'gray'}}
                rounded={false}
                onChange={num => {
                  setQuality(num);
                }}
                editable={true}
              />
            </View>
            <View style={{alignItems: 'center', flex: 2}}>
              <Text
                style={{
                  textAlign: 'right',
                  alignSelf: 'stretch',
                }}>
                Total: {total} VND
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={addToCart}
            style={{
              marginTop: '12%',
              alignItems: 'center',
              width: '70%',
              height: 50,
              borderRadius: 25,
              marginLeft: '15%',
              justifyContent: 'center',
              backgroundColor: '#F8530D',
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderWidth: 1,
    marginHorizontal: 5,
  },
});

export default Details;
