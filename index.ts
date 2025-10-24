import { AppRegistry } from 'react-native';
import App from './App';
import BackgroundFetch from 'react-native-background-fetch';
import { Notifications } from 'react-native-notifications';

AppRegistry.registerComponent('main', () => App);

// Headless task
//@ts-ignore
const headlessTask = async (event) => {
  const { taskId } = event;
  console.log('[BackgroundFetch HeadlessTask] executando...', taskId);

  // 🕒 Horário atual
  const agora = new Date().toLocaleTimeString();

  // 🔔 Dispara a notificação
  Notifications.postLocalNotification({
    title: 'Tarefa em segundo plano (Headless)',
    body: `Executada às ${agora}`,
    sound: 'default',
    //@ts-ignore
    silent: false,
    category: 'TASK_EXECUTED',
    userInfo: { taskId },
  });

  // Simula processamento de 1 minuto
  await new Promise((resolve) => setTimeout(resolve, 60000));

  console.log('[BackgroundFetch HeadlessTask] finalizado:', taskId);
  BackgroundFetch.finish(taskId);
};

// Registra a task headless no Android
BackgroundFetch.registerHeadlessTask(headlessTask);
