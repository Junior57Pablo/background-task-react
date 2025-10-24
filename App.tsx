import { useEffect } from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import { Notifications } from 'react-native-notifications';

export default function App() {
  useEffect(() => {
    const init = async () => {
      // 🧩 Configura a tarefa periódica de background
      const status = await BackgroundFetch.configure(
        {
          minimumFetchInterval: 5, // intervalo mínimo em minutos
          stopOnTerminate: false, // continua após fechar o app
          enableHeadless: true, // permite executar mesmo se app estiver "morto"
          startOnBoot: true, // inicia junto com o sistema
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
            sound: 'default', // usa o som padrão
            //@ts-ignore
            silent: false, // garante que o som toque
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

      //(opcional) Força uma execução manual agendada após 5 segundos
      // Pode ser útil para testar rapidamente
      await BackgroundFetch.scheduleTask({
        taskId: 'com.teste.fetch',
        delay: 5000, // em ms
        forceAlarmManager: true,
        periodic: true, 
      });

      console.log('[BackgroundFetch] status', status);
    };

    // Inicializa e pede permissão de notificação
    Notifications.registerRemoteNotifications();

    //(Android) registra evento de recebimento (opcional)
    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log('Notificação recebida no foreground:', notification);
        completion?.({ alert: true, sound: true, badge: false });
      }
    );

    init();
  }, []);

  return null;
}
