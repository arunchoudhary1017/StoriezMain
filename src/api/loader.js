import React, {Component} from 'react';
import {View, Text, Modal, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Loader = ({loading}) => {
  return (
    <Modal
      isVisible={loading}
      animationIn="fadeIn"
      animationOut="fadeOut"
      transparent={true}>
      <View
        style={{
          borderRadius: 6,
          backgroundColor: 'white',
          width: 75,
          height: 75,
          marginLeft: wp(50) - 37,
          marginTop: hp(40),
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#D3D3D3',
          borderWidth: 1,
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.23,
          shadowRadius: 6,
          elevation: 3,
        }}>
        <ActivityIndicator color={'#FCCE2D'} size={hp('6%')} />
      </View>
    </Modal>
  );
};
export default Loader;
