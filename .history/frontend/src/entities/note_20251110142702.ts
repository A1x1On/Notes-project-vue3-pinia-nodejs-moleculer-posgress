export interface INote {
  id: number
  title: string
  content?: string
  createdAt: string
  updatedAt?: string
}

export interface IUserSettings {
  create_timestamp: string
  page_name: string
  params: string
  update_timestamp: string
  user_id: number
}

export interface IUserSettingsCriteria {
  page_name: string
  user_id: number
  params?: string
}

/**
 * CONSTANTS
 */

export const USER: INote = {
  id: 0,
  title: '',
  createdAt: '',
}
