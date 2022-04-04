import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Header from '../header.js/index.js';
import PageTitle from '../page-title';
import Toast from 'react-native-simple-toast'


const ContactUs = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {}, []);
  const openSideMenu = () => {
    props.navigation.openDrawer();
  };

  return (
    <View style={{flex: 1}}>
      <Header clickSideMenu={() => openSideMenu()} />
      <PageTitle
        title={'Contact us'}
        subTitle={'If you have any problem Contact us.'}
      />
      {/* <View style={styles.bodyContainer}> */}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>
          <TextInput
            style={styles.intputStyle}
            autoCapitalize="words"
            keyboardType="default"
            placeholderTextColor={'#A6A6A6'}
            placeholder={'Name'}
            onChangeText={setName}
            value={name}
          />
          <TextInput
            style={styles.intputStyle}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor={'#A6A6A6'}
            placeholder={'Email'}
            onChangeText={text => setEmail(text.replace(/ /g, ''))}
            value={email}
          />
          <View style={styles.textViewStyle}>
            <TextInput
              style={{paddingLeft: 8, color: 'black'}}
              autoCapitalize="none"
              placeholder={'Stuff to stay...'}
              onChangeText={text => setComment(text)}
              value={comment}
              numberOfLines={7}
              textAlignVertical="top"
              multiline={true}
              placeholderTextColor={'#A6A6A6'}
            />
          </View>

          <TouchableOpacity
            onPress={() => alert('Under progress')}
            style={styles.sendButton}>
            <Text style={{color: 'white'}}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {/* </View> */}
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },

  sendButton: {
    backgroundColor: '#000',
    height: 40,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: '5%',
    marginTop: '2%',
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
  textViewStyle: {
    borderColor: '#D4D4D4',
    color: '#000',
    width: '100%',
    borderWidth: 1,
    height: 140,
    // paddingVertical: 5,
    // paddingLeft: 8,
    // textAlign: 'left',
    marginVertical: '5%',
  },
});
