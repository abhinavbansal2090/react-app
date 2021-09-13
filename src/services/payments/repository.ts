import { httpServiceMoyasar } from 'services/httpService'

const moyasarRequest = async (body: FormData) => {
  const response = await httpServiceMoyasar.request({
    body,
  })
  return response.json()
}

export const paymentsRepositiory = {
  moyasarRequest,
}
