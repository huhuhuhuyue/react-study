import React from 'react'
import context from './context'

export default function Provider (obj) {
  // console.log(obj) // {store: {…}, children: {…}}
  const  {store, children} = obj
  return <context.Provider value={store}>
    {children}
  </context.Provider>
}