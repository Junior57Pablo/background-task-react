import { useEffect } from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import { Notifications } from 'react-native-notifications';

export default function App() {
  useEffect(() => {
    const init = async () => {
      const status = await BackgroundFetch.configure(
        {
          minimumFetchInterval: 1, // intervalo em minutos
          stopOnTerminate: false,
          enableHeadless: true,
          startOnBoot: true,
          requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
        },
        async (taskId) => {
          console.log('[BackgroundFetch] Tarefa iniciada:', taskId);

          // 🕒 Pega o horário atual formatado
          const agora = new Date().toLocaleTimeString();

          // 🔔 Exibe uma notificação com som e vibração
          Notifications.postLocalNotification({
            title: 'Tarefa em segundo plano',
            body: `Executada às ${agora}`,
            sound: 'default',
            //@ts-ignore
            silent: false,
            category: 'TASK_EXECUTED',
            userInfo: { taskId },
          });

          // Simula processamento de 1 minuto
          await new Promise((resolve) => setTimeout(resolve, 60000));

          console.log('[BackgroundFetch] Tarefa finalizada:', taskId);
          BackgroundFetch.finish(taskId);
        },
        (error) => {
          console.error('[BackgroundFetch] Erro', error);
        }
      );

      BackgroundFetch.scheduleTask({
        taskId: 'com.teste.fetch',
        delay: 5000, // em ms (5 segundos)
        forceAlarmManager: true,
        periodic: true, // executa só uma vez
      });

      console.log('[BackgroundFetch] status', status);
    };

    // 🚀 Inicializa e pede permissão de notificação
    Notifications.registerRemoteNotifications();
    init();
  }, []);

  return null;
}
