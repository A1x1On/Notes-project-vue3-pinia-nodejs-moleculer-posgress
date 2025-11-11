import axios from '@/plugins/axios'
import type { AxiosResponse } from 'axios'

import type { INote } from '@/entities/note'

const BACKEND_END_POINT = import.meta.env.VITE_BACKEND_ENDPOINT
const BASE_URL = BACKEND_END_POINT + '/api/notes'

class NoteService {
  static fetch(): Promise<AxiosResponse<INote[]>> {
    return axios.get(`${BASE_URL}`)
  }
}

export default NoteService
