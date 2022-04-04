import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const PageTitle = ({title, subTitle}) => {
  return (
    <View
      style={{
        ...styles.containerView,
        alignItems: subTitle == '' ? 'center' : 'flex-start',
      }}>
      <Text style={styles.titleStyle}>{title}</Text>
      <Text style={styles.subTitleStyle}>{subTitle}</Text>
    </View>
  );
};

export default PageTitle;
const styles = StyleSheet.create({
  containerView: {
    marginTop: hp(3),
    marginHorizontal: wp(5),
  },
  titleStyle: {
    color: '#000000',
    fontSize: wp(5.8),
    fontWeight: '500',
  },
  subTitleStyle: {
    fontSize: wp(4),
    color: '#787878',
    marginTop: 2
  },
});
