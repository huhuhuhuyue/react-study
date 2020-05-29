import React, { Component } from 'react'

export default function createForm(Comp) {
  return class extends Component {
    constructor (props) {
      super(props)
      this.state = {

      }
      this.options = {}
    }

    // 实现getFieldDecorator
    getFieldDecorator = (filed, options) => {
      // 保存校验规则
      this.options[filed] = options
      return (InputComp) => {
        // 克隆InputComp节点，并给新的节点增加属性
        return React.cloneElement(InputComp, {
          value: this.state[filed] || '',
          onChange: (e) => {
            this.setState({[filed]: e.target.value})
          }
        })
      }
    }
    // 实现setFieldsValue重新赋值
    setFieldsValue = (newStore) => {
      this.setState(newStore)
    }
    // 实现getFieldsValue获取数据方法
    getFieldsValue = () => {
      return this.state
    }
    // 实现validateFields校验方法
    validateFields = (cb) => {
      let err = [] 
      for (let key in this.options) {
        // console.log(key, this.options[key])
        // 如果this.state[key]为undefined或者''，把校验规则返回，供表单页面显示错误信息使用
        if (!this.state[key]) {
          err.push({[key]: this.options[key]})
        }
      }
      if (!err.length) {
        // 如果err的length为0，校验成功
        cb(null, this.state)
      } else {
        cb(err, this.state)
      }
    }

    // 保存form
    getForm =() => {
      return {
        form: {
          getFieldDecorator: this.getFieldDecorator,
          setFieldsValue: this.setFieldsValue,
          getFieldsValue: this.getFieldsValue,
          validateFields: this.validateFields
        }
      }
    }
    render() {
      return (
        <Comp {...this.props} {...this.getForm()}/>
      )
    }
  }
  
}
