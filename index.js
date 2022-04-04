/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
// TextInput.defaultProps.allowFontScaling = false;
// Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
