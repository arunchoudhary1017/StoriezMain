import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  DeviceEventEmitter
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import cross_icon from '../assets/cross.png';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const SideMenu = props => {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = id => {
    props.navigation.closeDrawer();
    switch (id) {
      case 0:
        props.navigation.navigate('Home');
        break;
      case 1:
        props.navigation.navigate('Category');
        break;
      case 2:
        props.navigation.navigate('Author');
        break;
      case 3:
        props.navigation.navigate('AllPost');
        break;
      case 4:
        props.navigation.navigate('About');
        break;
      case 5:
        props.navigation.navigate('ContactUs');
        break;
      case 6:
        props.navigation.navigate('Search', { search: searchText });
        console.log('get data value');
        DeviceEventEmitter.emit('search', { search: searchText })
        break;
      default:
        break;
    }
  };

  return (
    <View style={{ height: '100%' }}>
      <View style={{ backgroundColor: 'black', height: '100%', width: wp(50) }}>
        {menuList.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.titleViewContainer}
              onPress={() => handleSubmit(index + 1)}>
              <Text style={styles.titleText}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
        <TextInput
          style={styles.input}
          onChangeText={setSearchText}
          placeholderTextColor={'#A6A6A6'}
          returnKeyType={'search'}
          onEndEditing={() => handleSubmit(6)}
          value={searchText}
          placeholder={'Search...'}
        />
      </View>
      <TouchableOpacity
        style={styles.crossBtnContainer}
        onPress={() => handleSubmit(0)}>
        <Image style={styles.crossImage} source={cross_icon} />
      </TouchableOpacity>
    </View>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  titleViewContainer: {
    height: hp(7),
    justifyContent: 'flex-end',
  },
  titleText: {
    marginLeft: wp(6),
    color: 'white',
    fontSize: wp(4.5),
  },
  input: {
    marginHorizontal: wp(6),
    backgroundColor: 'white',
    height: wp(10),
    marginTop: hp(4),
    borderRadius: 4,
    paddingLeft: 4,
    color: 'black',

  },
  crossImage: {
    width: 24,
    height: 24,
  },
  crossBtnContainer: {
    position: 'absolute',
    height: 48,
    width: 48,
    right: 0,
    alignItems: 'center',
    top: getStatusBarHeight(),
  },
});

const menuList = [
  {
    title: 'Categories',
  },
  {
    title: 'Authors',
  },
  {
    title: 'All posts',
  },
  {
    title: 'About us',
  },
  {
    title: 'Contact us',
  },
];
