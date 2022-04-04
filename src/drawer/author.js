import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../header.js/index.js';
import PageTitle from '../page-title';
import Loader from '../api/loader.js';
import { getApiRequest } from '../api/index.js';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast'


const Author = props => {
  const [loading, setLoading] = useState(false);
  const [authorList, setAuthorList] = useState([]);

  useEffect(() => {
    getAuthorData();
  }, []);
  // 'https://sleazy.co.il/wp-json/wp/v2/posts?auther_names',
  const getAuthorData = () => {
    setLoading(true);
    getApiRequest(
      'https://sleazy.co.il/wp-json/wp/v2/users',
      successResponse,
      failResponse,
    );
  };

  const successResponse = response => {
    console.log('get success author result', response);
    setAuthorList(response.data);
    setLoading(false);
  };

  const failResponse = error => {
    console.log('get error result', error);
    alert(error)
    setLoading(false);
  };

  const openSideMenu = () => {
    props.navigation.openDrawer();
  };

  const renderAuthorList = ({ item }) => {
    return (
      <TouchableOpacity style={styles.renderContainer} onPress = {() => props.navigation.navigate('AuthorCategory',{type:'author',data : item.id, titleName: item.name})}>
        <Text style={styles.titleStyle}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const listHeader = () => {
    //View to set in Header
    return (
      <View style={styles.headerFooterStyle}>
        <PageTitle title={'Authors page'} subTitle={`${authorList.length} Authors on this blog`} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingBottom: 15 }}>
      <Header clickSideMenu={() => openSideMenu()} />
      {loading && <Loader loading={loading} />}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={authorList}
        ListHeaderComponent={listHeader}
        keyExtractor={(item, index) => index}
        renderItem={renderAuthorList}
      />
    </View>
  );
};

export default Author;

const styles = StyleSheet.create({
  headerFooterStyle: {
    width: '100%',
  },
  renderContainer: {
    marginHorizontal: wp(5),
    justifyContent: 'center',
    marginTop: 12,
    backgroundColor: '#000000',
    padding: 9,
  },
  titleStyle: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: '500',
    textAlign: 'left',
  },
  subTitleStyle: {
    fontSize: wp(3.6),
    color: '#787878',
  },
});
