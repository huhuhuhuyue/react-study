import React, { useContext } from 'react'
import {ThemeContext, UserContext} from './context'

export default function ChildUseContext () {
  const ThemeContextData = useContext(ThemeContext) // 获取上下文
  const UserContextData = useContext(UserContext) // useContext可以有多个，contextType不能有多个
  // 函数组件没有render，只有return
  return (
    <div className={ThemeContextData.themeColor}>
      ChildUseContext page
      <p>{UserContextData.user}</p>
    </div>
  )
}
