import axios from 'axios'

//不懂的话下面这句话其实可有可无，无视掉就好，只要保证get里的路径和mock里拦截的路径一致就行
const base = ''


//()=>是e6里的箭头函数，这个函数相当于

// export const getAllCompuses = function(){
//   return axios.get(`${base}/compuses`)
// }

//也就是定义一个方法并打包，这个方法会返回一个利用axios模拟的请求


export const getAllCompuses = () => {
  return axios.get(`${base}/compuses`)
}


//下面这个唯一比上面函数多的就是一个参数，个人建议把这个箭头函数转化成正常的练一练
//这个参数是前面vue页面里调用loadBuildings时所定义的参数，具体返回去看看
export const loadBuildings = param => {
  let getParam = {}
  getParam.params = param

  return axios.get(`${base}/buildings`, getParam)
}

export const loadTimes = param => {
  let getParam = {}
  getParam.params = param

  return axios.get(`${base}/times`, getParam)
}

export const loadtypes = () => {
  return axios.get(`${base}/loadtypes`)
}

export const loadStates = () => {
  return axios.get(`${base}/loadstates`)
}

export const loadCards = param => {

  let getParam = {}
  getParam.params = param

  return axios.get(`${base}/cards`, getParam)
}


