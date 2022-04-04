import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../header.js/index.js';
import PageTitle from '../page-title';
import Loader from '../api/loader.js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getApiRequest } from '../api/index.js';
import Toast from 'react-native-simple-toast'
import moment from 'moment'

const AllPost = props => {
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [allPostList, setAllPostList] = useState([]);

  const openSideMenu = () => {
    props.navigation.openDrawer();
  };
  useEffect(() => {
    getAllPostData(1);
  }, []);

  const getAllPostData = (page) => {
    setLoading(true);
    getApiRequest(
      `https://sleazy.co.il/wp-json/wp/v2/posts?page=${page}`,
      successResponse,
      failResponse,
    );
  };

  const successResponse = response => {
    console.log('get success result', response);
    const newArray = [...allPostList, ...response.data]
    let updatedArray = newArray.filter((ele, ind) => ind === newArray.findIndex(elem => elem.id === ele.id))
    setAllPostList(updatedArray)
    setPageNumber(pageNumber + 1)
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
          onPress={() => props.navigation.navigate('PostDetail', { 'data': item.id })}
          style={styles.sendButton}>
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
          title={'All posts'}
          subTitle={`${allPostList.length} posts on this blog from new to old`}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header clickSideMenu={() => openSideMenu()} />
      {loading && <Loader loading={loading} />}
      <FlatList
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
        data={allPostList}
        ListHeaderComponent={listHeader}
        onEndReachedThreshold={0.9}
        onEndReached={() => getAllPostData(pageNumber + 1)}
        keyExtractor={(item, index) => index}
        renderItem={renderPostItem}
      />
      {/* </View> */}
    </View>
  );
};

export default AllPost;

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
