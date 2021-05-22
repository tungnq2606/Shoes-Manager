import React, {Component} from 'react';
import {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useState} from 'react/cjs/react.development';

export default function Logout({route, navigation}) {
  var token = route.params.token;
  const [name, setName] = useState('');
  useEffect(() => {
    async function fetchData() {
      await fetch('http://10.0.2.2:3000/api/my-info', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(json => {
          setName(json.userName);
        })
        .catch(error => console.error(error));
    }
    fetchData();
  }, []);
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Text>Hello</Text>
      <Text>{name}</Text>
      <TouchableOpacity style={styles.signIn}>
        <Text
          style={styles.signInText}
          onPress={() => navigation.navigate('Login')}>
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  signIn: {
    marginTop: 25,
    backgroundColor: '#00C569',
    width: 260,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
  },
  signInText: {
    textAlign: 'center',
    color: 'white',
    width: '100%',
  },
});
