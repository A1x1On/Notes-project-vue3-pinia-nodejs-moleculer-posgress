import axios from '@/plugins/axios'

import type { INote, INoteItem } from '@/entities/note'

const BACKEND_END_POINT = import.meta.env.VITE_BACKEND_ENDPOINT
const BASE_URL = BACKEND_END_POINT + '/notes'

class NoteService {
  static fetch(): Promise<IResponse<INote[]>> {
    return axios.get(`${BASE_URL}`)
  }

  static fetchById(id: number): Promise<IResponse<INote>> {
    return axios.get(`${BASE_URL}/${id}`)
  }

  static insert(payload: INoteItem[]): Promise<IResponse<INote[]>> {
    return axios.post(`${BASE_URL}`, payload)
  }

  static update(payload: INote): Promise<IResponse<INote[]>> {
    return axios.patch(`${BASE_URL}/${payload.id}`, payload)
  }

  static remove(id: number): Promise<IResponse<INote[]>> {
    return axios.delete(`${BASE_URL}/${id}`)
  }
}

export default NoteService
