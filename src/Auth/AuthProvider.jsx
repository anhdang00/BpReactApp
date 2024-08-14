/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import AuthContext from './context'

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null)
  useEffect(() => {
    if (username) {
      localStorage.setItem('lobby_app_username', username)
    }
  }, [username])
  useEffect(() => {
    const cachedUsername = localStorage.getItem('lobby_app_username')
    if (cachedUsername) {
      setUsername(cachedUsername)
    }
  }, [])
  return (
    <AuthContext.Provider value={username}>
      {/* If username is invalid */}
      {!username && (
        <>
          <h1>Login Page</h1>
          <form
            onSubmit={e => {
              e.preventDefault() //form submission default prevention from redirect, we are developing SPA
              const formData = new FormData(e.target)
              const username = formData.get('username')
              setUsername(username)
            }}
          >
            <input type="text" name="username"></input>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
      {/* else:... */}
      {username && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider