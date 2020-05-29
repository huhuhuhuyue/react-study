import React from 'react'

export const ThemeContext = React.createContext() // 创建上下文
export const ThemeProvider = ThemeContext.Provider
export const ThemeConsumer = ThemeContext.Consumer

export const UserContext = React.createContext() // 创建上下文
export const UserProvider = UserContext.Provider