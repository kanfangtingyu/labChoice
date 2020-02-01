import { Compuses } from '../data/compuses'
import { Labstate } from '../data/labstate'
import { Labtypes } from '../data/labtype'

import { Cards } from '../data/cards'
import { loadBuildings } from '../../api/lib'

export default {
  getAllCompuses: config => {
    let arr = Compuses

    return new Promise((resolve,reject) => {
      setTimeout(()=>{
        resolve([200,{
          compuses: arr
        }])
      },500)
    })
  },
  loadBuildings: config => {
    let compuses = Compuses.filter((u, index) => (config.params.compusId == u.id))
    let buildings = compuses[0].buildings

    return new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve([200,{
          buildings: buildings
        }])
      },500)
    })
  },
  loadTimes: config => {
    let compuses = Compuses.filter((u, index) => (config.params.compusId == u.id))
    let times = compuses[0].times

    return new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve([200,{
          times: times
        }])
      },500)
    })
  },
  loadtypes: config => {
    let arr = Labtypes

    return new Promise((resolve,reject) => {
      setTimeout(()=>{
        resolve([200,{
          labtypes: arr
        }])
      },500)
    })
  },
  loadStates: config => {
    let arr = Labstate
    return new Promise((resolve,reject) => {
      setTimeout(()=>{
        resolve([200,{
          loadStates: arr
        }])
      },500)
    })
  },

  loadCards: config => {
    let param = config.params

    let result = Cards;

    // let arr = Cards.filter()
    if(param.compusId){
      // 通过compusId过滤符合校区条件的数据
      if (param.compusId) {
        result = result.filter((card) => {
          return card.compusId === param.compusId
        })
      }

      // 通过buildingIds过滤符合建筑条件的数据
      if (param.buildingIds.length > 0) {
        result = result.filter((card) => {
          return param.buildingIds.includes(card.buildingId)
        })
      }


      // 通过date和time过滤符合日期和时间条件的数据

      // 通过labtype过滤符合状态条件的数据
      if (param.typeId.length > 0) {
        result = result.filter((card) => {
          return param.typeId.includes(card.type)
        })
      }
      // 通过status过滤符合状态条件的数据
      if (param.stateId.length > 0) {
        result = result.filter((card) => {
          return param.stateId.includes(card.state)
        })
      }

      return new Promise((resolve,reject) => {
        setTimeout(()=>{
          resolve([200,{
            cards: result
          }])
        },500)
      })

    }
  }
}

