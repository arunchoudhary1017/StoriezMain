import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getApiRequest } from '../api/index.js';
import Header from '../header.js/index.js';
import PageTitle from '../page-title';
import Loader from '../api/loader.js';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import moment from 'moment'
import Toast from 'react-native-simple-toast'

const Home = props => {
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState([]);

  const openSideMenu = () => {
    props.navigation.openDrawer();
  };

  useEffect(() => {
    getPostData();
  }, []);

  const getPostData = () => {
    getApiRequest(
      'https://sleazy.co.il/wp-json/wp/v2/posts?per_page=20',
      successResponse,
      failResponse,
    );
    setLoading(true);
  };

  const successResponse = response => {
    setLoading(false);
    console.log('get success result', response);
    setPostList(response.data);
  };

  const failResponse = error => {
    console.log('get error result', error);
    alert(error)
    setLoading(false);
  };

  const renderItemPostList = ({ item }) => {
    return (
      <TouchableOpacity style={styles.renderContainer} onPress = {() => props.navigation.navigate('PostDetail',{'data': item.id})}>
        <Text style={styles.titleStyle}>{item.yoast_head_json.title}</Text>
        <Text style={styles.subTitleStyle}>
          {item.author}, {item.categories.toString()}, {moment(item.yoast_head_json.article_published_time).format("YYYY-MM-DD")}
        </Text>
      </TouchableOpacity>
    );
  };  

  const listHeader = () => {
    //View to set in Header
    return (
      <View style={styles.headerFooterStyle}>
        <PageTitle title={'Main Page'} subTitle={''} />
        <View style={styles.blogCountView}>
          <Text style={styles.titleStyle}>
            {postList.length} latest blog posts
        </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingBottom: 15}}>
      <Header clickSideMenu={() => openSideMenu()} />
      {loading && <Loader loading={loading} />}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={postList}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={listHeader}
        renderItem={renderItemPostList}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerFooterStyle: {
    width: '100%',
  },
  blogCountView: {
    marginLeft: wp(5),
    paddingBottom: 4,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    maxWidth: '40%',
    marginTop: wp(2)
  },
  renderContainer: {
    marginHorizontal: wp(5),
    justifyContent: 'center',
    marginTop: 16,
  },
  titleStyle: {
    color: '#000000',
    fontSize: wp(4.4),
    fontWeight: '500',
    textAlign: 'left'
  },
  subTitleStyle: {
    fontSize: wp(3.5),
    color: '#787878',
  },
});
