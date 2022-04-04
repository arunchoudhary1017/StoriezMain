import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, DeviceEventEmitter } from 'react-native';
import Header from '../header.js/index.js';
import PageTitle from '../page-title/index.js';
import Loader from '../api/loader.js';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getApiRequest } from '../api/index.js';
import moment from 'moment'

const Search = props => {
  const [loading, setLoading] = useState(false);
  const [noFound, setNoFound] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [menuSearchValue, setMenuSearch] = useState('');
  const [searchList, setSearchList] = useState([]);
  console.log('get props =====>>', props);
  const openSideMenu = () => {
    props.navigation.openDrawer();
  };
  useEffect(() => {
    const routeList = props.route ?.state ?.routes;
    const obj = routeList.find(item => item.name === "Search")
    console.log('get --------obj', obj.params.search);
    const { search } = obj.params.search
    getSearchData(search);

    const listner = DeviceEventEmitter.addListener('search', data => {
      console.log('log value=======', searchValue);
      console.log('log value=======', data);
      setMenuSearch(data.search)
      getSearchData(data.search);
    })
    return listner
  }, []);

  const getSearchData = (search) => {
    setLoading(true);
    getApiRequest(
      `https://sleazy.co.il/wp-json/wp/v2/posts?search=${search}`,
      successResponse,
      failResponse,
    );
  };

  const successResponse = response => {
    console.log('get success search result', response);
    setSearchList(response.data);
    setNoFound(response ?.data ?.length > 0 ? false : true )
    setLoading(false);
  };

  const failResponse = error => {
    console.log('get error result', error);
    setLoading(false);
  };

  const listHeader = () => {
    //View to set in Header
    return (
      <View style={styles.headerFooterStyle}>
        <PageTitle
          title={'Search results'}
          subTitle={`${searchList.length} posts found`}
        />
      </View>
    );
  };

  const renderSearchItem = ({ item }) => {
    const {title, article_published_time, description} = item?.yoast_head_json
    return (
      <View style={styles.renderContainer}>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.subTitleStyle}>
          {item.author}, {item.categories.toString()}, {moment(article_published_time).format("YYYY-MM-DD")}
        </Text>
        <Text style={{ ...styles.subTitleStyle, marginTop: 5 }} numberOfLines={4}>
          {description}</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('PostDetail', { 'data': item.id })}
          style={styles.sendButton}>
          <Text style={{ color: 'white' }}>Read post</Text>
        </TouchableOpacity>
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
        data={searchList}
        ListHeaderComponent={listHeader}
        keyExtractor={(item, index) => index}
        renderItem={renderSearchItem}
      />
      {noFound &&
        <View style={styles.content}>
          <Text style={styles.titleStyle}>{`Oops nothing found for “${menuSearchValue}”,\nsearch again please`}</Text>
          <TextInput
            style={styles.intputStyle}
            keyboardType="default"
            placeholderTextColor={'#A6A6A6'}
            placeholder={'Search...'}
            onChangeText={setSearchValue}
            value={searchValue}
          />
          <TouchableOpacity
            onPress={() => {getSearchData(searchValue), setMenuSearch(searchValue)}}
            style={styles.sendButton}>
            <Text style={{ color: 'white' }}>Search</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

export default Search;
const styles = StyleSheet.create({
  sendButton: {
    backgroundColor: '#000',
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  headerFooterStyle: {
    width: '100%',
  },
  content: {
    paddingHorizontal: '5%',
    position: 'absolute',
    top: 200,
    width: '100%'
  },
  intputStyle: {
    // flex: 1,
    marginTop: '5%',
    height: 46,
    borderColor: '#D4D4D4',
    width: '75%',
    borderWidth: 1,
    paddingLeft: 8,
    color: 'black',
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
    marginTop: wp(8),
  },
  titleStyle: {
    color: '#000000',
    fontSize: wp(4.3),
    fontWeight: '500',
    textAlign: 'left',
  },
  subTitleStyle: {
    fontSize: wp(3.5),
    color: '#787878',
    marginTop: 1,
    textAlign: 'left'
  },
});
