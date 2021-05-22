import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Products from './screen/products';
import Category from './screen/categories';
import Icon from 'react-native-vector-icons/FontAwesome';
import Details from './screen/detail';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screen/login';
import Register from './screen/register';
import {UserProvider} from './UserContext';
import {Component, useEffect, useState} from 'react';
import Cart from './screen/cart';
import Thank from './screen/thank';

const Tab = createBottomTabNavigator();

function MyTabs({route}) {
  const [name, setName] = useState('');
  const token = route.params.token;
  React.useEffect(async () => {
    await fetch('http://10.0.2.2:3000/api/my-info', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(json => setName(json.userName))
      .catch(error => console.error(error));
  }, []);
  return (
    <UserProvider value={name}>
      <Tab.Navigator>
        <Tab.Screen
          name="Product"
          component={Products}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="home" size={20} color={color} />
            ),
            title: 'Products',
          }}
        />
        <Tab.Screen
          name="Category"
          component={Category}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="bars" size={20} color={color} />
            ),
            title: 'Categories',
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="shopping-cart" size={20} color={color} />
            ),
            title: 'Cart',
          }}
        />
      </Tab.Navigator>
    </UserProvider>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={MyTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Details}
          options={{
            headerStyle: {
              backgroundColor: '#F6F6F6',
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerStyle: {
              backgroundColor: '#fcfcfc',
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Thank"
          component={Thank}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
