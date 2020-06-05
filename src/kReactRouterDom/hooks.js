import context from './context'
import { useContext } from 'react'

// useHistory,
// useLocation,
// useRouteMatch,
// useParams

export function useHistory () {
  // console.log(useContext(context)) // {history: {…}, location: {…}, match: {…}, pathname: "/product/2/detail/2", search: "", …}
  return useContext(context).history
}
export function useLocation () {
  return useContext(context).location
}
export function useRouteMatch () {
  return useContext(context).match
}
export function useParams () {

}

