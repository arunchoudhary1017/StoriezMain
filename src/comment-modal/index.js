import React, {useState} from 'react';
import {Modal, StyleSheet, Text, Pressable, View, Image} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import {getApiRequest} from '../api/index.js';
import cross_icon from '../assets/cross.png';

const CommentModal = ({modalVisible, onClick, onCancel}) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const sendButton = () => {
    if (name.trim().length == 0) {
      Toast.show('Please enter name');
    } else if (comment.trim().length == 0) {
      Toast.show('Please enter comment');
    } else {
      getApiRequest(
        `https://sleazy.co.il/wp-json/wp/v2/posts?page=$}`,
        successResponse,
        failResponse,
      );
    }
  };

  const successResponse = response => {
    console.log('get success result', response);
  };

  const failResponse = error => {
    console.log('get error result', error);
    setLoading(false);
  };
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Your Comment</Text>
          <TextInput
            style={styles.intputStyle}
            autoCapitalize="words"
            keyboardType="default"
            placeholderTextColor={'#A6A6A6'}
            placeholder={'Name'}
            onChangeText={setName}
            value={name}
          />
          <View style={styles.textViewStyle}>
            <TextInput
              style={{paddingLeft: 8, color: 'black'}}
              autoCapitalize="none"
              placeholder={'Comment...'}
              onChangeText={text => setComment(text)}
              value={comment}
              numberOfLines={7}
              textAlignVertical="top"
              multiline={true}
              placeholderTextColor={'#A6A6A6'}
            />
          </View>
          <Pressable style={styles.button} onPress={() => onClick()}>
            <Text style={styles.textStyle}>Send</Text>
          </Pressable>
          <Pressable style={styles.crossButton} onPress={() => onCancel()}>
            <Image style={styles.crossImage} source={cross_icon} />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    // borderRadius: 20,
    // padding: 10,
    // elevation: 2,
    backgroundColor: '#000',
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 4,
    right: 4,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  intputStyle: {
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
    height: 120,
    marginVertical: '5%',
  },
  crossImage: {
    width: 22,
    height: 22,
  },
});

export default CommentModal;
