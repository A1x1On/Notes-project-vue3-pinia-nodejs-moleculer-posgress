export interface INote {
  id: number
  title: string
  content?: string
  createdAt: string
  updatedAt?: string
}

/**
 * CONSTANTS
 */

export const USER: INote = {
  id: 0,
  title: '',
  createdAt: '',
}
