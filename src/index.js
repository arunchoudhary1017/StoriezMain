import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './drawer/home';
import About from './drawer/about';
import AllPost from './drawer/allPost';
import Author from './drawer/author';
import ContactUs from './drawer/contact';
import Category from './drawer/category';
import Search from './drawer/search';
import AuthorCategory from './drawer/authorCategory';
import PostDetail from './drawer/postDetail';

import Wrapper from './wrapper';
import SideMenu from './wrapper/sideMenu';
import SplashScreen from 'react-native-splash-screen'


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
SplashScreen.hide();
const stackArray = [
  {
    name: 'Home',
    component: props => (
     <Wrapper>
        <Home {...props} />
      </Wrapper>
    ),
  },
  {
    name: 'Category',
    component: props => (
      <Wrapper>
        <Category {...props} />
      </Wrapper>
    ),
  },

  {
    name: 'Author',
    component: props => (
      <Wrapper>
        <Author {...props} />
      </Wrapper>
    ),
  },
  {
    name: 'AllPost',
    component: props => (
      <Wrapper>
        <AllPost {...props} />
      </Wrapper>
    ),
  },
  {
    name: 'About',
    component: props => (
      <Wrapper>
        <About {...props} />
      </Wrapper>
    ),
  },
  {
    name: 'ContactUs',
    component: props => (
      <Wrapper>
        <ContactUs {...props} />
      </Wrapper>
    ),
  },
  {
    name: 'Search',
    component: props => (
      <Wrapper>
        <Search {...props} />
      </Wrapper>
    ),
  },
  {
    name: 'AuthorCategory',
    component: props => (
      <Wrapper>
        <AuthorCategory {...props} />
      </Wrapper>
    ),
  },
  {
    name: 'PostDetail',
    component: props => (
      <Wrapper>
        <PostDetail {...props} />
      </Wrapper>
    ),
  },
];

const StackContainer = props => {
  return (
    <Stack.Navigator mode="modal">
      {stackArray.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            options={{headerShown: false, gestureEnabled: false}}>
            {p => <item.component {...p} {...props} />}
          </Stack.Screen>
        );
      })}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home1"
        hideStatusBar={true}
        overlayColor={'transparent'}
        drawerStyle={{width: '65%', backgroundColor: 'transparent'}}
        drawerContent={p => <SideMenu {...p} />}>
        <Drawer.Screen
          name="Home1"
          component={StackContainer}
          options={{swipeEnabled: true}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
