import React from 'react';
import {Text, View} from 'react-native';
export default function Thank({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Text style={{fontSize: 18, marginBottom: 20}}>Thanks for your oder</Text>
      <Text onPress={() => navigation.goBack()}>Go back</Text>
    </View>
  );
}
