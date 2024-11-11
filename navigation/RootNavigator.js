import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ShopViewScreen from '../screens/ShopViewScreen';
import HelpScreen from '../screens/HelpScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      screenOptions={{ headerShown: false }}
      <Stack.Screen
        name='Home'
        component={HomeScreen}
      />
      <Stack.Screen
        name='Shop'
        component={ShopViewScreen}
      />
      <Stack.Screen
        name='Help'
        component={HelpScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({

});