import {useContext} from 'react'
import context from './context'
export default function useStore() {
  const store = useContext(context)
  return store
}
