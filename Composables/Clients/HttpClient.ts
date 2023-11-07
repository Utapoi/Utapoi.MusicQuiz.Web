import { createFetch } from '@vueuse/core'
import { ApiError } from '~/Core/Models/Error'

export function useHttpClient() {
  const RuntimeConfig = useRuntimeConfig()

  const ApiFetcher = createFetch({
    baseUrl: RuntimeConfig.public.MQ_API_URL,
    options: {
      updateDataOnError: false,
      onFetchError(ctx) {
        ctx.error = ctx.data

        return ctx
      },
    },
  })

  async function Delete(url: string, options?: RequestInit): Promise<void> {
    if (options === undefined)
      options = {}

    options.credentials = 'include'

    await ApiFetcher(url, options).delete()
  }

  async function Get<T>(url: string, options?: RequestInit): Promise<T | undefined> {
    if (options === undefined)
      options = {}

    options.credentials = 'include'

    const { data: r } = await ApiFetcher(url, options)
      .get()
      .json<T>()

    if (r.value !== null)
      return r.value

    return undefined
  }

  async function Post<T>(url: string, options?: RequestInit, body: any = undefined): Promise<T | ApiError | undefined> {
    if (options === undefined)
      options = {}

    if (body === undefined)
      body = {}

    options.credentials = 'include'

    const { data, error } = await ApiFetcher(url, options).post(body).json<T>()

    if (error.value != null)
      return ApiError.FromJson(error.value)

    if (data.value !== null)
      return data.value as T

    return undefined
  }

  async function Patch<T>(url: string, options?: RequestInit, body: any = undefined): Promise<T | undefined> {
    if (options === undefined)
      options = {}

    if (body === undefined)
      body = {}

    options.credentials = 'include'

    const { data: r } = await ApiFetcher(url, options).patch(body)

    if (r.value !== null)
      return r.value as T

    return undefined
  }

  return {
    Delete,
    Get,
    Post,
    Patch,
  }
}
