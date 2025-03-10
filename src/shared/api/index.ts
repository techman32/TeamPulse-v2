import axios, {AxiosResponse} from 'axios'

export const post = async <T, U>(uri: string, data: T): Promise<AxiosResponse<U> | null> => {
  try {
    return await axios.post<U>(`http://.../api/v1/${uri}`, data)
  } catch (error) {
    console.error(error)
    return null
  }
}

export const get = async <T>(uri: string): Promise<AxiosResponse<T> | null> => {
  try {
    return await axios.get<T>(`http://.../api/v1/${uri}`)
  } catch (error) {
    console.error(error)
    return null
  }
}