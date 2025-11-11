export interface INote {
  id: number
  title: string
  content?: string
  createdAt: string
  updatedAt?: string
}

export interface INoteItem {
  title: string
  content?: string
}

/**
 * CONSTANTS
 */

export const NOTE: INote = {
  id: 0,
  title: '',
  content: '',
  createdAt: '',
}
