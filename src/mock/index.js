import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import LibMock from './lab/lib'

const base = ''

const mock = new MockAdapter(axios)

//这里面没啥可说的，就是单纯的拦截到请求，返回响应，reply后面是响应，LibMOCK是引入的lib那个页面,
//然后后面那个.是lib页面里定义的一堆方法

mock.onGet(`${base}/compuses`).reply(LibMock.getAllCompuses)

mock.onGet(`${base}/buildings`).reply(LibMock.loadBuildings)

mock.onGet(`${base}/times`).reply(LibMock.loadTimes)

mock.onGet(`${base}/loadtypes`).reply(LibMock.loadtypes)

mock.onGet(`${base}/loadstates`).reply(LibMock.loadStates)

mock.onGet(`${base}/cards`).reply(LibMock.loadCards)
