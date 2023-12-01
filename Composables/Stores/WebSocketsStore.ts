export enum WebSocketConnectionStatus {
  Disconnected = 'Disconnected',
  Connecting = 'Connecting',
  Connected = 'Connected',
  Reconnecting = 'Reconnecting',
  Reconnected = 'Reconnected',
  Closed = 'Closed',
}

export const useWebSocketsStore = defineStore('WebSocketsStore', () => {
  const ConnectionStatus = ref<WebSocketConnectionStatus>(WebSocketConnectionStatus.Disconnected)

  function SetStatus(status: WebSocketConnectionStatus): void {
    ConnectionStatus.value = status
  }

  return {
    ConnectionStatus,
    SetStatus,
  }
})
