import React, {Component} from 'react';
import {HelperText, TextInput} from 'react-native-paper';

import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import {useState} from 'react';

function Register({navigation}) {
  const [user, setUser] = useState('');
  const [passWord, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  // Validation form
  const hasErrorUserName = () => {
    if (user.length > 0) {
      return false;
    }
    return true;
  };

  const hasErrorPassword = () => {
    if (passWord.length > 5) {
      return false;
    }
    return true;
  };
  const hasErrorRePassword = () => {
    if (hasErrorPassword()) {
      return !hasErrorPassword;
    } else {
      if (passWord != rePassword) {
        return true;
      }
      return false;
    }
  };
  const register = async () => {
    await fetch('http://10.0.2.2:3000/api/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user,
        password: passWord,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.auth) {
          ToastAndroid.show('Sign up successful', ToastAndroid.SHORT);
          navigation.goBack();
        }
      })
      .catch(error => console.error(error));
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fcfcfc',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <View style={styles.shadow}>
        <Text
          style={{
            flex: 1,
            fontSize: 30,
            marginLeft: 40,
            marginRight: 10,
          }}>
          Sign Up
        </Text>
        <View style={styles.inPutView}>
          <TextInput
            selectionColor="red"
            theme={{colors: {primary: 'gray'}}}
            mode="outlined"
            label="Username"
            style={{width: '80%', height: 55}}
            onChangeText={us => setUser(us.trim())}
          />
          <HelperText
            type="error"
            visible={hasErrorUserName()}
            style={{
              textAlign: 'left',
              alignSelf: 'stretch',
              marginLeft: 40,
              marginTop: 5,
            }}>
            Email is required !
          </HelperText>
          <TextInput
            selectionColor="red"
            theme={{colors: {primary: 'gray'}}}
            mode="outlined"
            label="Password"
            style={{width: '80%', marginTop: 10, height: 55}}
            onChangeText={pw => setPassword(pw.trim())}
          />
          <HelperText
            type="error"
            visible={hasErrorPassword()}
            style={styles.helperText}>
            Password has more 5 character long !
          </HelperText>
          <TextInput
            selectionColor="red"
            theme={{colors: {primary: 'gray'}}}
            mode="outlined"
            label="Confirm password"
            style={{width: '80%', marginTop: 10, height: 55}}
            onChangeText={rePass => setRePassword(rePass.trim())}
          />
          <HelperText
            type="error"
            visible={hasErrorRePassword()}
            style={styles.helperText}>
            Password and confirm password incorrect !
          </HelperText>
          <TouchableOpacity style={styles.signIn} onPress={register}>
            <Text style={styles.signInText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signInGGText: {
    color: 'black',
    width: 200,
    textAlign: 'center',
  },
  signInGG: {
    marginTop: 25,
    color: 'black',
    width: 260,
    justifyContent: 'center',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  signIn: {
    marginTop: 25,
    backgroundColor: '#00C569',
    width: 260,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
  },
  forgotPassword: {
    textAlign: 'right',
    alignSelf: 'stretch',
    marginRight: 40,
    fontSize: 12,
    marginTop: 10,
  },
  signInText: {
    textAlign: 'center',
    color: 'white',
    width: '100%',
  },
  signInGGView: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  helperText: {
    textAlign: 'left',
    alignSelf: 'stretch',
    marginLeft: 40,
    marginTop: 5,
  },
  inPutView: {
    flex: 5,
    alignItems: 'center',
    flexDirection: 'column',
  },
  shadow: {
    height: '70%',
    paddingTop: 30,
    display: 'flex',
    justifyContent: 'center',
    width: '85%',
    flexDirection: 'column',
    borderRadius: 2,
    backgroundColor: 'white',
    elevation: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  image: {
    paddingLeft: 20,
    width: 25,
    height: 25,
  },
});
export default Register;
