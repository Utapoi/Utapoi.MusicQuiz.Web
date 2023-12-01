import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { useIdentityStore } from '~/Composables/Stores/IdentityStore'
import { WebSocketConnectionStatus, useWebSocketsStore } from '~/Composables/Stores/WebSocketsStore'

export default defineNuxtPlugin((_) => {
  const IdentityStore = useIdentityStore()
  const WebSocketsStore = useWebSocketsStore()
  const Config = useRuntimeConfig()

  if (!IdentityStore.IsAuthenticated) {
    console.warn('Not Authenticated. SignalR will not be available.')
    return
  }

  console.warn('Connecting...')

  const HubConnection = new HubConnectionBuilder()
    .withUrl(Config.public.MQ_SIGNALR_URL)
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build()

  HubConnection.on('Connected', () => {
  })

  HubConnection.on('Disconnected', () => {
    WebSocketsStore.SetStatus(WebSocketConnectionStatus.Disconnected)

    console.warn('Disconnected')
  })

  function ConnectAsync() {
    HubConnection.start().then(() => {
      WebSocketsStore.SetStatus(WebSocketConnectionStatus.Connected)
      console.warn('Connected')
    }).catch((err) => {
      WebSocketsStore.SetStatus(WebSocketConnectionStatus.Reconnecting)
      return console.error(err)
    })
  }

  async function SendAsync(method: string, ...args: any[]) {
    if (HubConnection.state !== 'Connected')
      return

    return await HubConnection.send(method, ...args)
  }

  async function On<T>(methodName: string, callback: (data: T) => void) {
    return HubConnection.on(methodName, (data: T) => {
      callback(data)
    })
  }

  ConnectAsync()

  watch(() => IdentityStore.IsAuthenticated(), (v) => {
    if (v && HubConnection.state !== 'Connected')
      ConnectAsync()
  })

  return {
    provide: {
      HubConnection: {
        SendAsync,
        On,
      },
    },
  }
})
