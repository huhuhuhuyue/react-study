import React, { Component } from 'react'
// import {createForm} from 'rc-form'
import createForm from '../components/MyRcForm'
import Input from '../components/Input/Input'

// 定义校验规则
const nameRules = {required: true, message: "请输入姓名！"};
const passworRules = {required: true, message: "请输入密码！"};

// @createForm()
@createForm
class MyRcForm extends Component {
  // constructor (props) {
  //   super(props)
  // }
  state = {
    errMsg: {
      userName: '',
      passWord: ''
    }
  }

  componentDidMount () {
    // 组件挂载后为userName设置初始值
    // 不算哪一项发生了变化，整个表单都会重新渲染，所以后面又有了rc-field-form
    this.props.form.setFieldsValue({userName: 'zz'})
  }
  submit = () => {
    // getFieldsValue用来获取提交的值
    // console.log('1111111', this.props.form.getFieldsValue())
    const {validateFields} = this.props.form
    validateFields((err, val) => {
      if (err) {
        console.log('err', err)
        let errObj = {}
        err.forEach(item => {
          // console.log(item) //passWord: {rules: [{required: true, message: "请输入密码！"}]}
          for (let key in item) {
            errObj[key] = item[key].rules[0].message
          }
        })
        this.setState({
          errMsg: errObj
        })
      } else {
        console.log('ok', val)
      }
    })
  }
  render() {
    // console.log(this.props.form)
    // getFieldsValue是个高阶组件，用来装饰表单项
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        MyRcForm Page
        {/*<Input placeholder='UserName'/>
        <Input placeholder='PassWord'/>*/}

        {getFieldDecorator('userName', {rules: [nameRules]})(<Input placeholder='UserName'/>)}
        {this.state.errMsg.userName && <p className='red'>{this.state.errMsg.userName}</p>}
        {getFieldDecorator('passWord', {rules: [passworRules]})(<Input placeholder='PassWord'/>)}
        {this.state.errMsg.passWord && <p className='red'>{this.state.errMsg.passWord}</p>}
        <button onClick={this.submit}>提交</button>
      </div>
    )
  }
}
export default MyRcForm

// createForm
// 背景：由于我们自己写表单时候input上需要定义value、onChange事件，value还要在state中定义，如果表单项很多的话，就会很麻烦，rc-form的createForm为我们提供了这些
// 安装依赖：npm i rc-form -S
// 引入：import {createForm} from 'rc-form'
// 装饰类：@createForm()，注意createForm是个方法，需要调用