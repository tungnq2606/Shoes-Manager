import React, {Component, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Header({navigation, name}) {
  let displayName = 'Hello ' + name;
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        paddingLeft: 17,
        paddingRight: 17,
      }}>
      <Text style={{width: '90%', fontSize: 16}}>{displayName}</Text>
      <View style={{width: '10%', alignItems: 'flex-end', paddingRight: 2}}>
        <TouchableOpacity style={{width: '100%', flexDirection: 'row'}}>
          <Icon
            name="sign-out-alt"
            size={20}
            onPress={() => navigation.navigate('Login')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
