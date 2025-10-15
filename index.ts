import { AppRegistry } from 'react-native';
import App from './App';
import BackgroundFetch from 'react-native-background-fetch';

// Registra o app principal
AppRegistry.registerComponent('main', () => App);

// Headless task (executa quando o app está fechado)

//@ts-ignore
const headlessTask = async (event) => {
  const { taskId } = event;
  console.log('[BackgroundFetch HeadlessTask] executando...', taskId);

  // Simula processamento de 1 minuto
  await new Promise((resolve) => setTimeout(resolve, 60000));

  // Finaliza o fetch
  BackgroundFetch.finish(taskId);
};

// Registra a task headless no Android
BackgroundFetch.registerHeadlessTask(headlessTask);
