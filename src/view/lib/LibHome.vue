<template>
  <div>
    <el-form ref="form" label-width="80px"  :gutter="20">
      <el-form-item label="校区">
        <el-radio-group v-model="condition.compus" @change = "compusChanged">
            <el-radio v-for = "compus in compuses" :key = "compus.id" :label="compus.id">{{ compus.name }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="楼">
        <el-checkbox-group v-model="condition.buildings" @change = "allChanged">
          <el-checkbox v-for="building in buildings" :label="building.id" :key="building.id">{{ building.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="类型">
        <el-checkbox-group v-model="condition.labtype" @change = "allChanged">
          <el-checkbox v-for="labtype in labtypes" :label="labtype.name" :key="labtype.id">{{ labtype.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="时间" :span="8">
          <el-date-picker v-model="condition.date" type="date" placeholder="选择日期">
          </el-date-picker>
      </el-form-item>

      <el-form-item label="课时段" :span="8">
        <el-radio-group v-model="condition.time">
          <el-radio v-for="time in times" :label="time.tag" :key="time.tag">{{time.name}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="状态">
        <el-checkbox-group v-model="condition.labState" @change = "allChanged">
          <el-checkbox v-for="labState in labStates" :label="labState.name" :key="labState.id">{{ labState.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

    </el-form>

    <el-row>
      <el-col :span="5" v-for="lab in labs" class="card" v-bind:key="lab.id">
        <el-card>
          <div>{{ lab.state }}</div>
          <div style="padding: 14px;text-align: center;">
            <h2>{{ lab.id }}</h2>
            <h3>{{ lab.type }}</h3>
            <p>容纳人数：{{ lab.people }}</p>
            <div class="bottom clearfix">
              <el-button type="text" class="button">>>详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAllCompuses, loadBuildings, loadStates, loadtypes, loadTimes,  loadCards } from '@/api/lib'

//总的前后端分离过程：首先是这个vue页面，在这个页面的script中引入了一堆api方法（vue）
//                  这里api方法的作用为模拟请求，包括有参和无参两种，具体往后看（api/lib/index）
//                  然后是api发出的请求在mock中的index被拦截到，并且做出响应（mock/index）
//                  接着就是响应的方法，在lib.js里面，这里的方法基本为数据处理，具体看里面
//                  具体的数据在data里面，把data里的数据打包引入lib方法进行处理
//                  然后回到vue页面来看调用，也就是执行了上面一系列的api中的方法后返回一个res，
//                  最后将res里的数据给data
  export default {
    data () {
      return {
        condition: {
          compus: '',
          labtype: [],
          labState: [],
          buildings: [],
          date:[],
          time:[]
        },
        compuses: [],
        buildings: [],
        labtypes: [],
        labStates: [],
        labs:[],
        times:[]
      }
    },
    methods: {
    //加载所有的校区    也就是说这个方法打开页面后只调用了一次就没用了（刷新除外）
    loadCompuses: function () {
      //使用上面引入的getAllCompuses方法模拟一个请求，然后经过一系列响应，then返回一个响应，res为组件里定义的返回请求
      getAllCompuses().then((res) => {
        let compuses = res.data.compuses

        if (compuses) {
          //然后让返回的compuses数组赋值给该页面的compuses
          this.compuses = compuses
          //让condition中的compus赋值为响应回来的第一个数组的id（默认选中第一个校区）
          this.condition.compus = res.data.compuses[0].id
          //调用compusChanged方法加载楼号
          this.compusChanged(this.condition.compus)
          //调用allChanged方法加载卡片
          this.allChanged(this.condition.compus)
        }
      })
    },

    //改变校区以加载楼号
    compusChanged: function (value) {       //value是选中的label的值
      //首先，function里的参数是最上面templete里的这个:label="compus.id"，别管为什么，模版里带的
      //然后判断，如果value有值，定义一个参数对象，让其中的compusId属性为value(也就是说，之后的参数为一个对象
                                              //至于为啥要是对象，我也不知道，刘哥说这么好就这么着吧)
      if (value) {
        let param = {
          compusId: value
        }
        //然后加载api里定义的这个loadBuildings的方法，传这个参数进去，返回响应，之后略，不懂往前翻
        loadBuildings(param).then((res) => {
          let buildings = res.data.buildings

          this.buildings = buildings
        }),
        loadTimes(param).then((res) => {
          let times = res.data.times

          this.times = times
        })
        //加载所有该校区的卡片，实际和上面loadCompuses里最后一句相等
        this.allChanged(value)
      }

    },

    //加载所有的类型及状态，因为这俩不是联动的，所以和第一个加载校区的方法相差不大，不懂往前翻
    loadalltype: function () {
      loadtypes().then((res) => {
        let labtypes = res.data.labtypes
        if (labtypes) {
          this.labtypes = labtypes
        }
      })
    },
    loadallstate: function () {
      loadStates().then((res) => {
        let loadStates = res.data.loadStates
        if (loadStates) {
          this.labStates = loadStates
        }
      })
    },

    //这个坑爹的日期项，先跳过，吧其它的都理解会了之后再看这个



    //全项目的灵魂，但实际很简单
    //加载所有的卡片：首先，把这个方法绑定到了每一个点击事件上，也就是@change那个玩意，
    //当然加载校区那个除外，因为它需要被点击以加载校区，所以在加载校区这个方法下面会调用一次allChanged方法来加载卡片
    //then进入正题：
    //首先无论点击哪个单选/多选框，都会将整个condition对象传过来，condition里包含了所有可选项的当前选的是那个
    //这就是为啥刘哥一开始就让整个condition的原因(要是不知道condition是啥，自己在if条件句之前输出看看)
    //然后这是一个可以就收一堆属性的参数（实际上和上面的param是一样样的）
    //接受了所有condition属性以后，返回响应，剩下的同上
    allChanged: function (condition) {
      if (condition) {
        let param = {
          compusId: this.condition.compus,
          buildingIds: this.condition.buildings,
          typeId: this.condition.labtype,
          stateId:this.condition.labState
        }
        loadCards(param).then((res) => {
          let cards = res.data.cards
          this.labs = cards
      })
      }
    }
  },

  //mounted为生命周期中的一个（不知道啥玩意的自个查）
  //作用为在页面刚出现的时候，就执行里面这一堆方法
  //(看完了想想为啥要加载这3个方法)
  mounted () {
    this.loadCompuses();
    this.loadalltype();
    this.loadallstate();
  }
}
</script>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both;
  }
  .card{
    margin:5px;
  }
</style>

