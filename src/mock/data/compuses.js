const Compuses = []

Compuses.push({
  id: 'a',
  name: '旅顺校区',
  times:[
    {
      tag: 'x',
      name: '第一节课',
      startTime: '08:00:00',
      endTime: '10:00:00'
    },
    {
      tag: 'y',
      name: '第二节课',
      startTime: '10:30:00',
      endTime: '11:30:00'
    },
    {
      tag: 'z',
      name: '第三节课',
      startTime: '13:30:00',
      endTime: '15:30:00'
    }
  ],
  buildings: [
    {
      id: 'aa',
      name: '3号楼'
    },
    {
      id: 'ab',
      name: '4号楼'
    },
    {
      id: 'ac',
      name: '5号楼'
    }
  ]
})

Compuses.push({
  id: 'c',
  name: '本部校区',
  times:[
    {
      tag: 'a',
      name: '第一节课',
      startTime: '08:20:00',
      endTime: '10:20:00'
    },
    {
      tag: 'b',
      name: '第二节课',
      startTime: '10:50:00',
      endTime: '11:50:00'
    },
    {
      tag: 'c',
      name: '第三节课',
      startTime: '13:50:00',
      endTime: '15:50:00'
    }
  ],
  buildings: [
    {
      id: 'ca',
      name: '2号楼'
    },
    {
      id: 'cb',
      name: '实验楼'
    },
    {
      id: 'cc',
      name: '图书馆'
    }
  ]
})

export { Compuses }
