import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
  baseURL:isDev?'http://rap2.taobao.org:38080/app/mock/258898':''
})

const service1 = axios.create({
  baseURL:isDev?'http://rap2.taobao.org:38080/app/mock/258898':''
})


//请求拦截器
service.interceptors.request.use((config)=>{
  config.data=Object.assign({},config.data,{
    authToken:'itIsAToken'
  })
  return config
})

//响应拦截器
service.interceptors.response.use((resp)=>{
  if (resp.data.code === 200){
    return resp.data.data
  }else{
    //全局处理错误
  }
})

//获取文章列表
export const getArticles = (offset=0,limited=10)=>{
  return service.post('/api/v1/articleList',{
    offset,
    limited
  })
}
//删除单篇文章
export const deleteArticleById = (id)=>{
  return service.post(`/api/v1/articleDelete/${id}`)
}

//获取单篇文章
export  const getArticleById = (id) => {
  return service.post(`/api/v1/article/${id}`)
}

//修改文章
export const saveArticle = (id,data) =>{
  return service.post(`/api/v1/articleEdit/${id}`,data)
}

//获取文章阅读量
export const getArticleAmount = () =>{
  return service.post(`/api/v1/articleAmount`)
}

//获取通知
export const getAllNotifications = () =>{
  return service.post('/api/v1/notifications')
}

//用户登录
export const userLogin = (userInfo) =>{
  return service1.post('/api/v1/login',userInfo)
}