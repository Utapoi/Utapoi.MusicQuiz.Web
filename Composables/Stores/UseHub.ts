import type { HubConnection } from '@microsoft/signalr'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export const UseHub = defineStore('UseHub', () => {
  const Config = useRuntimeConfig()
  const Connection = ref<HubConnection | undefined>(undefined)

  async function ConnectAsync() {
    if (Connection.value)
      return

    Connection.value = new HubConnectionBuilder()
      .withUrl(Config.public.MQ_SIGNALR_URL)
      .configureLogging(LogLevel.Information)
      .build()

    await Connection.value.start()
  }

  async function SendAsync<T>(methodName: string, params: any): Promise<T> {
    if (!Connection.value || Connection.value.state !== 'Connected')
      await ConnectAsync()

    return Connection.value!.invoke(methodName, params)
  }

  async function On<T>(methodName: string, callback: (data: T) => void) {
    if (!Connection.value || Connection.value.state !== 'Connected')
      await ConnectAsync()

    return Connection.value!.on(methodName, (data: T) => {
      callback(data)
    })
  }

  return {
    Connection,
    ConnectAsync,
    SendAsync,
    On,
  }
})
