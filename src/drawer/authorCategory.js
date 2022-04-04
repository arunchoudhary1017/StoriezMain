import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Header from '../header.js/index.js';
import PageTitle from '../page-title';
import Toast from 'react-native-simple-toast'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getApiRequest } from '../api/index.js';
import Loader from '../api/loader.js';
import moment from 'moment'


const AuthorCategory = props => {
  const [loading, setLoading] = useState(false);
  const [allList, setCatAuthList] = useState([]);
  const [pageSubTitle, setPageSubTitle] = useState('');
  const [pageTitle, setPageTitle] = useState('');

  const openSideMenu = () => {
    props.navigation.openDrawer();
  };
  useEffect(() => {
    console.log('get auther data', props);
    const routeList = props.route ?.state ?.routes;
    const obj = routeList.find(item => item.name === "AuthorCategory")
    console.log('get --------obj', obj);
    const { type, data, titleName } = obj.params
    setPageTitle(titleName)
    getAllData(type, data);
  }, []);

  const getAllData = (type, value) => {
    setLoading(true);
    getApiRequest(
      `https://sleazy.co.il/wp-json/wp/v2/posts?${type}=${value}`,
      (res) => successResponse(res, type),
      failResponse,
    );
  };

  const successResponse = (response, type) => {
    console.log('get success result', response);
    console.log('get success result type', type);
    setCatAuthList(response.data);
    setPageSubTitle(type === 'author' ? `Author has ${response ?.data ?.length} posts` : `${response ?.data ?.length} posts in this category`)
    setLoading(false);
  };

  const failResponse = error => {
    console.log('get error result', error);
    alert(error)
    setLoading(false);
  };

  const renderPostItem = ({ item }) => {
    return (
      <View style={styles.renderContainer}>
        <Text style={styles.titleStyle}>{item.yoast_head_json ?.title}</Text>
        <Text style={styles.subTitleStyle}>
        {item.author}, {item.categories.toString()}, {moment(item.yoast_head_json.article_published_time).format("YYYY-MM-DD")}
          </Text>
        <Text style={{ ...styles.subTitleStyle, marginTop: 5 }} numberOfLines={4}>
          {item.yoast_head_json ?.description}
        </Text>
        <TouchableOpacity
          onPress={() => alert('Under progress')}
          style={styles.sendButton} onPress={() => props.navigation.navigate('PostDetail',{'data': item.id})}>
          <Text style={{ color: 'white' }}>Read post</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const listHeader = () => {
    //View to set in Header
    return (
      <View style={styles.headerFooterStyle}>
        <PageTitle
          title={ pageTitle}
          subTitle={pageSubTitle}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header clickSideMenu={() => props.navigation.goBack()} isBack= {true} />
      {loading && <Loader loading={loading} />}
      <FlatList
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
        data={allList}
        ListHeaderComponent={listHeader}
        keyExtractor={(item, index) => index}
        renderItem={renderPostItem}
      />
      {/* </View> */}
    </View>
  );
};

export default AuthorCategory;

const styles = StyleSheet.create({
  headerFooterStyle: {
    width: '100%',
  },
  sendButton: {
    backgroundColor: '#000',
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2)
  },
  blogCountView: {
    marginLeft: wp(5),
    paddingBottom: 4,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    maxWidth: '40%',
  },
  renderContainer: {
    marginHorizontal: wp(5),
    justifyContent: 'center',
    marginTop: hp(2),
  },
  titleStyle: {
    color: '#000000',
    fontSize: wp(4),
    fontWeight: '500',
    textAlign: 'left',
  },
  subTitleStyle: {
    fontSize: wp(3.5),
    color: '#787878',
    marginTop: 1,
    textAlign: 'left',
  },
});
