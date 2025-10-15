import { AppRegistry } from 'react-native';
import App from './App';
import BackgroundFetch from 'react-native-background-fetch';
import PushNotification from 'react-native-push-notification';

// 🔔 Cria o canal de notificações (apenas uma vez)
PushNotification.createChannel(
  {
    channelId: 'background-tasks',
    channelName: 'Tarefas em segundo plano',
    importance: 4, // alta prioridade
  },
  (created) => console.log(`Canal criado: ${created}`)
);

// 📱 Registra o app principal
AppRegistry.registerComponent('main', () => App);

// 🧠 Headless task (executa quando app está fechado)
//@ts-ignore
const headlessTask = async (event) => {
  const { taskId } = event;
  console.log('[BackgroundFetch HeadlessTask] executando...', taskId);

  try {
    // Exibe notificação de início
    PushNotification.localNotification({
      channelId: 'background-tasks',
      title: 'Tarefa em segundo plano',
      message: 'O app iniciou uma tarefa em background.',
      allowWhileIdle: true,
      priority: 'high',
      importance: 'high',
      ongoing: true,
    });

    // Simula processamento de 1 min
    await new Promise((resolve) => setTimeout(resolve, 60000));

    // Remove notificações ao finalizar
    PushNotification.cancelAllLocalNotifications();

    console.log('[BackgroundFetch HeadlessTask] finalizada:', taskId);
  } catch (err) {
    console.error('[HeadlessTask] erro', err);
  }

  // Finaliza o fetch
  BackgroundFetch.finish(taskId);
};

// 🔧 Registra a task headless no Android
BackgroundFetch.registerHeadlessTask(headlessTask);
