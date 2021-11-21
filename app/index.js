import { AppRegistry, LogBox } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

LogBox.ignoreLogs(['Require cycle:', 'Non-serializable']);

AppRegistry.registerComponent(appName, () => App);
