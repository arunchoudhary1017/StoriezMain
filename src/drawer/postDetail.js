import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Header from '../header.js/index.js';
import PageTitle from '../page-title';
import Loader from '../api/loader.js';
import {getApiRequest} from '../api/index.js';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import CommentModal from '../comment-modal/index.js';

const regex = /(<([^>]+)>)/gi;
const PostDetail = props => {
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [postData, setPostData] = useState(undefined);
  const [postCommentData, setPostCommentData] = useState([]);

  useEffect(() => {
    const routeList = props.route?.state?.routes;
    const obj = routeList.find(item => item.name === 'PostDetail');
    getPostDetailData(obj.params.data);
    getPostCommentData(obj.params.data);
  }, []);

  const getPostDetailData = id => {
    setLoading(true);
    getApiRequest(
      `https://sleazy.co.il//wp-json/wp/v2/posts/${id}`,
      successResponse,
      failResponse,
    );
  };
  const getPostCommentData = id => {
    getApiRequest(
      `https://sleazy.co.il/wp-json/wp/v2/comments?id=${id}`,
      successCommentResponse,
      failResponse,
    );
  };

  const successResponse = response => {
    console.log('get success post id result', response);
    setPostData(response.data);
    setLoading(false);
  };
  const successCommentResponse = response => {
    console.log('get success post id result', response);
    setPostCommentData(response.data);
    setLoading(false);
  };

  const failResponse = error => {
    console.log('get error result', error);
    alert(error);
    setLoading(false);
  };

  const openSideMenu = () => {
    props.navigation.openDrawer();
  };

  const listHeader = () => {
    console.log('get ========', postData);
    const data = postData?.content?.rendered;
    const newString = data?.replace(regex, '');
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.titleStyle}>
          {postData?.yoast_head_json?.title}
        </Text>
        <Text style={styles.postStyle}>Author: {postData?.author}</Text>
        <Text style={styles.postStyle}>
          Date published:{' '}
          {moment(postData?.yoast_head_json?.article_published_time).format(
            'YYYY-MM-DD',
          )}
        </Text>
        <Text style={styles.postStyle}>
          Categories: {postData?.categories?.toString()}
        </Text>
        {/* <Text style={styles.postStyle}>Reading time: 13 minutes (based on character amount)</Text> */}
        <Text
          style={{...styles.postStyle, marginVertical: hp(1.5), marginTop: 12}}>
          {newString}
        </Text>
        <Text style={styles.authorPost}>Post rating: 3.5 out of 5</Text>
        <Text style={styles.authorPost}>
          More posts from this Author: (show 5 more)
        </Text>
        <ScrollView
          style={{marginTop: 2}}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {postList.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.scrollContainer}
                onPress={() => console.log('hello kilo-------')}>
                <Text style={styles.commentScrollStyle}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={styles.commentsView}>
          <Text style={styles.authorPost}>Comments:</Text>
        </View>
      </View>
    );
  };

  const renderPostItem = ({item}) => {
    const data = item?.content?.rendered;
    const newString = data.replace(regex, '');
    return (
      <View style={styles.commentContainer}>
        <Text style={styles.authorPost}>{item?.author_name}</Text>
        <Text style={styles.postStyle}>
          {moment(item?.date).format('YYYY-MM-DD')}
        </Text>
        <Text style={styles.postStyle}>{newString}</Text>
        <Text
          style={{...styles.authorPost, textDecorationLine: 'underline'}}
          onPress={() => setIsShow(true)}>
          Reply to this comment
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.containerView}>
      <Header clickSideMenu={() => props.navigation.goBack()} isBack={true} />
      {loading && <Loader loading={loading} />}
      <CommentModal
        modalVisible={isShow}
        onCancel={() => setIsShow(false)}
        onClick={() => setIsShow(false)}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={postCommentData}
        ListHeaderComponent={listHeader}
        keyExtractor={(item, index) => index}
        renderItem={renderPostItem}
      />
    </View>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    paddingBottom: 15,
  },
  headerContainer: {
    width: wp(100),
    padding: wp(5),
    paddingBottom: 0,
  },
  commentContainer: {
    margin: wp(5),
    marginTop: 0,
    padding: 8,
    borderColor: 'black',
    borderWidth: 1,
  },
  titleStyle: {
    color: '#000000',
    fontSize: wp(5.8),
    fontWeight: '500',
    marginVertical: hp(1),
    textAlign: 'left',
  },
  authorPost: {
    color: '#000000',
    fontSize: wp(4.5),
    lineHeight: 32,
    textAlign: 'left',
  },
  postStyle: {
    fontSize: wp(4),
    color: '#787878',
    marginTop: 4,
    textAlign: 'left',
  },
  commentScrollStyle: {
    fontSize: wp(4),
    color: '#ffff',
    padding: 12,
    backgroundColor: '#000000',
  },
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  commentsView: {
    borderBottomColor: 'black',
    borderTopWidth: 1,
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
  },
});

const postList = ['Post Name', 'Post Name 2'];
const comments =
  'The REST API provides public data accessible to any client anonymously, as well as private data only available after authentication. Once authenticated the REST API supports most content management actions, allowing you to build alternative dashboards for a site, enhance your plugins with more responsive management tools, or build complex single-page applications.';
