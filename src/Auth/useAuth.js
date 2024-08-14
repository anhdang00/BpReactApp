import { useContext } from 'react'
import AuthContext from './context'

const useAuth = () => {
  const username = useContext(AuthContext)
  return username
}
export default useAuth