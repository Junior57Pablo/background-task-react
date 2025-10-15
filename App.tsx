import BackgroundFetch from 'react-native-background-fetch';
import PushNotification from 'react-native-push-notification';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const init = async () => {
      await BackgroundFetch.configure(
        {
          minimumFetchInterval: 15,
          stopOnTerminate: false,
          enableHeadless: true,
          startOnBoot: true,
          requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
        },
        async (taskId) => {
          console.log('[BackgroundFetch] Tarefa iniciada:', taskId);

          // 🔔 Exibe notificação
          PushNotification.localNotification({
            channelId: 'background-tasks',
            title: 'Processamento iniciado',
            message: 'O app está executando tarefas em segundo plano.',
            allowWhileIdle: true,
            importance: 'high',
            priority: 'high',
            ongoing: true, // notificação "fixa" até remover
          });

          // Simula processamento de 1 min
          await new Promise((resolve) => setTimeout(resolve, 60000));

          // ✅ Remove a notificação
          PushNotification.cancelAllLocalNotifications();

          console.log('[BackgroundFetch] Tarefa finalizada:', taskId);
          BackgroundFetch.finish(taskId);
        },
        (error) => {
          console.error('[BackgroundFetch] erro', error);
        }
      );

      const status = await BackgroundFetch.status();
      console.log('[BackgroundFetch] status', status);
    };

    init();
  }, []);

  return null;
}
