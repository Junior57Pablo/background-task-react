import BackgroundFetch from 'react-native-background-fetch';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const init = async () => {
      const status = await BackgroundFetch.configure(
        {
          minimumFetchInterval: 15,
          stopOnTerminate: false,
          enableHeadless: true,
          startOnBoot: true,
          requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
        },
        async (taskId) => {
          console.log('[BackgroundFetch] Tarefa iniciada:', taskId);

          // Simula processamento de 1 minuto
          await new Promise((resolve) => setTimeout(resolve, 60000));

          console.log('[BackgroundFetch] Tarefa finalizada:', taskId);

          // Finaliza o fetch
          BackgroundFetch.finish(taskId);
        },
        (error) => {
          console.error('[BackgroundFetch] erro', error);
        }
      );

      console.log('[BackgroundFetch] status', status);
    };

    init();
  }, []);

  return null;
}
