import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../header.js/index.js';
import PageTitle from '../page-title';
import Loader from '../api/loader.js';
import { getApiRequest } from '../api/index.js';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast'


const Category = props => {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryData();
  }, []);
  // https://sleazy.co.il/wp-json/wp/v2/categories?per_page=100
  const getCategoryData = () => {
    setLoading(true);
    getApiRequest(
      'https://sleazy.co.il/wp-json/wp/v2/categories',
      successResponse,
      failResponse,
    );
  };

  const successResponse = response => {
    console.log('get success result', response);
    setCategoryList(response.data);
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

  const renderItemCategoryList = ({ item }) => {
    return (
      <TouchableOpacity style={styles.renderContainer} onPress = {() => props.navigation.navigate('AuthorCategory',{type:'categories',data : item.id, titleName: item.yoast_head_json ?.title})}>
        <Text style={styles.titleStyle}>
          {item.yoast_head_json ?.title} ({item ?.count} posts)
        </Text>
      </TouchableOpacity>
    );
  };

  const listHeader = () => {
    //View to set in Header
    return (
      <View style={styles.headerFooterStyle}>
        <PageTitle
          title={'Categories page'}
          subTitle={`${categoryList.length} Categories on this blog`}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingBottom: 15 }}>
      <Header clickSideMenu={() => openSideMenu()} />
      {loading && <Loader loading={loading} />}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categoryList}
        ListHeaderComponent={listHeader}
        keyExtractor={(item, index) => index}
        renderItem={renderItemCategoryList}
      />
    </View>
  );
};

export default Category;

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
