import { HubConnection } from '@microsoft/signalr'

declare module 'nuxt/dist/app/nuxt' {
    interface NuxtApp {
        $HubConnection: {
            SendAsync(method: string, ...args: any[]): Promise<void>,
            On<T>(methodName: string, callback: (data: T) => void): Promise<void>,
        }
    }
}