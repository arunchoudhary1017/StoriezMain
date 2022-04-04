import React from 'react';
import {View, Text} from 'react-native';
import Header from '../header.js/index.js';
import PageTitle from '../page-title';
import Toast from 'react-native-simple-toast'


const About = props => {
  const openSideMenu = () => {
    props.navigation.openDrawer();
  };

  return (
    <View>
      <Header clickSideMenu={() => openSideMenu()} />
      <PageTitle title={'About us'} subTitle={''} />
    </View>
  );
};

export default About;
