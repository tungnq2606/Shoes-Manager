import * as React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {HelperText, TextInput} from 'react-native-paper';
import {useState} from 'react';

export default function Login({navigation, route}) {
  const [user, setUser] = useState('');
  const [passWord, setPassword] = useState('');

  const login = async () => {
    await fetch('http://10.0.2.2:3000/api/login', {
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
          ToastAndroid.show('Login successful', ToastAndroid.SHORT);
          navigation.navigate('Home', {token: json.token});
        } else {
          ToastAndroid.show(json.msg, ToastAndroid.SHORT);
        }
      })
      .catch(error => console.error(error));
  };
  const hasErrorUserName = () => {
    if (user.length > 0) {
      return false;
    }
    return true;
  };
  const hasErrorPassword = () => {
    if (passWord.length > 0) {
      return false;
    }
    return true;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fcfcfc',
        alignItems: 'center',
      }}>
      <View style={styles.shadow}>
        <View
          style={{
            paddingLeft: 40,
            paddingRight: 10,
            flex: 1,
            flexDirection: 'row',
          }}>
          <View style={{width: '70%'}}>
            <Text style={{fontSize: 30, marginTop: 15}}>Welcome</Text>
            <Text style={{marginTop: 5, marginLeft: 5}}>
              Sign in to continue
            </Text>
          </View>
          <Text
            style={{
              width: '25%',
              textAlign: 'center',
              marginTop: 50,
              height: 45,
              color: '#00C569',
            }}
            onPress={() => navigation.navigate('Register')}>
            Sign up
          </Text>
        </View>
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
            onChangeText={pw => {
              setPassword(pw.trim());
            }}
          />

          <HelperText
            type="error"
            visible={hasErrorPassword()}
            style={styles.helperText}>
            Password is required !
          </HelperText>
          <Text style={styles.forgotPassword}>Forgot password</Text>
          <TouchableOpacity style={styles.signIn} onPress={login}>
            <Text style={styles.signInText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.signInGGView}>
        <Text>-OR-</Text>
        <TouchableOpacity style={styles.signInGG}>
          <Image
            source={require('../Image/logoGoogle.png')}
            style={styles.image}
          />
          <Text style={styles.signInGGText}>Sign In with Google</Text>
        </TouchableOpacity>
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
    marginTop: 60,
  },
  shadow: {
    marginTop: 80,
    flex: 2.5,
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
