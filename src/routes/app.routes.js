import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import NewPost from '../pages/NewPost';
import PostUser from '../pages/PostUser';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// NAVEGAÇÃO EM PILHA
function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NovoPost"
        component={NewPost}
        options={{
          headerTitle: null,
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#36393F'
          }
        }}
      />
      <Stack.Screen
        name="DetalhesPost"
        component={PostUser}
      />
    </Stack.Navigator>
  );
}

const PlusIcon = ({ color, size }) => (
  <View style={{ borderRadius: size / 1, backgroundColor: '#B22222', padding: 8 }}>
    <Feather name="plus" color="#FFF" size={size} />
  </View>
);

function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        keyboardHidesTabBar: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#202225',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#FFF'
      }}
    >
      <Tab.Screen
        name='Home'
        component={StackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name='Novo Post'
        component={NewPost}
        options={{
          tabBarIcon: ({ color, size }) => (
            <PlusIcon color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name='Perfil'
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default AppRoutes;
