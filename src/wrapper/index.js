import React from 'react';
import {StatusBar} from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';

const Wrapper = props => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white'}}
      edges={[ 'left', 'right']}
      >
      {/* <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      /> */}

      {props.children}
    </SafeAreaView>
  );
};

export default Wrapper;
