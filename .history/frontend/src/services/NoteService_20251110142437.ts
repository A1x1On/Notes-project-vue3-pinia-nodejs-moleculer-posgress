import axios from '@/plugins/axios'
import type { AxiosResponse } from 'axios'

import type { IClientEmail } from '@/entities/email'

const BACKEND_END_POINT = import.meta.env.VITE_BACKEND_ENDPOINT
const BASE_URL = BACKEND_END_POINT + '/api/v1/clientEmail'

class EmailService {
  static fetch(client_ids: string[]): Promise<AxiosResponse<IClientEmail[]>> {
    return axios.post(`${BASE_URL}`, { client_ids })
  }
}

export default EmailService
