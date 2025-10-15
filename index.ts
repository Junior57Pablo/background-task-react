// import { registerRootComponent } from 'expo';

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);

import { AppRegistry } from 'react-native';
import App from './App';
import BackgroundFetch from 'react-native-background-fetch';

AppRegistry.registerComponent('main', () => App);

//@ts-ignore
const headlessTask = async (event) => {
  const { taskId } = event;
  console.log('[BackgroundFetch HeadlessTask] executando...', taskId);

  // Faz o mesmo processamento
  await new Promise((resolve) => setTimeout(resolve, 60000));

  BackgroundFetch.finish(taskId);
};

BackgroundFetch.registerHeadlessTask(headlessTask);
