import React, { Component } from 'react'
import { connect } from 'dva'
import {Table} from 'antd'
import { Link } from 'dva/router'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataIndex: 'city',
    key: 'city'
  }
]
@connect(
  // mapStateToProps，接收一个state，返回一个新的state
  (state) => {
    // console.log(state) // {routing: {…}, @@dva: 0, example: {…}}
    return state.example
  },
  // mapDispatchToProps
  {
    getProductDate: (payload) => ({type: 'example/getProductData', payload})
  }
)
export default class ExpamplePage extends Component {
  // 获取异步数据，dva项目自带mock文件夹
  dataSearch = () => {
    this.props.getProductDate()
  }
  render() {
    console.log(this.props) // {match: {…}, location: {…}, history: {…}, staticContext: undefined}
    const {data} = this.props
    return (
      <div>
        <h3>ExpamplePage</h3>
        <button onClick={this.dataSearch}>获取数据</button>
        <Table columns={columns} dataSource={data}/>
        <Link to='/user'>to user</Link>
      </div>
    )
  }
}
