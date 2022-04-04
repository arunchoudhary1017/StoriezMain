import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions
} from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';

console.log('get i-----------', getStatusBarHeight());

import menu_icon from '../assets/menu.png';
import back_icon from '../assets/backArraw.png';
const Header = ({ clickSideMenu, isBack }) => {
  return (
    <View>
      <View style={{ width: '100%', height: Platform.OS === 'ios' ? getStatusBarHeight(): 10, backgroundColor:'#FCCE2D' }} />
      <View style={styles.containerView}>
        <TouchableOpacity
          style={styles.menuBtnContainer}
          onPress={() => clickSideMenu()}>
          <Image style={styles.menuImage} source={isBack ? back_icon: menu_icon} />
        </TouchableOpacity>
        <Text style={styles.stickyStyle}>Sticky header</Text>
        <Text style={styles.logoStyle}>Logo </Text>
      </View>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  containerView: {
    width: '100%',
    height: 44,
    backgroundColor: '#FCCE2D',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  stickyStyle: {
    color: '#00000030',
    fontSize: 15,
  },
  logoStyle: {
    fontSize: 17,
    color: '#000000',
  },
  menuImage: {
    width: 24,
    height: 24,
  },
  menuBtnContainer: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
