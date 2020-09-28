import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:10086',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  }
})

axios.interceptors.request.use(
  req => req,
  err => Promise.reject('Request rejected', err)
)

instance.interceptors.response.use(
  res => {
    if (res.status !== 200) return Promise.reject(res)

    return Promise.resolve(res.data)
  },
  err => err
)

export default instance
