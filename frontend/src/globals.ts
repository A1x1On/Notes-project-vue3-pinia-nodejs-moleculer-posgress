import type { AxiosResponse } from 'axios'

export const initGlobalData = (app: any) => {
  // app.provide(<TKeys>'NOT_FOUND', KEYS.NOT_FOUND)
  return app
}

/**
 * TYPES & INTERFACES
 */
declare global {
  type ObjectRaw = Record<string, unknown> | Record<string, unknown>[]

  interface IBody<T> {
    count: number
    data: T
    success: true
    error: string
  }

  interface IResponse<T> extends AxiosResponse {
    data: IBody<T>
  }

  interface IModal<T> {
    show: boolean
    title: string
    mode: 'update' | 'delete' | 'insert'
    data: T
  }

  interface IPopover {
    type: number
    title: string
    content: string
    showPopover: () => undefined
  }
}
