/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import AuthContext from './context'
import { socket } from '../main'
import { EVENT_USER_JOIN } from '../constants/socket'

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null)
  useEffect(() => {
    if (username) {
      localStorage.setItem('lobby_app_username', username)
      socket.emit(EVENT_USER_JOIN, username)
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
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'inherit',
          }}
        >
          <h1>Login Page</h1>
          <form
            onSubmit={e => {
              e.preventDefault() //form submission default prevention from redirect, we are developing SPA
              const formData = new FormData(e.target)
              const username = formData.get('username')
              setUsername(username)
            }}
          >
            <input type="text" name="username" 
            style={{  display: 'block', 
                      marginBottom: '40px', 
                      marginTop:'15px', 
                      padding:'3%',
                      color:'#ffdbc1',
                      backgroundColor:'#db9769',
                      border:'0',
                      fontSize:'18px'}}></input>
            <button type="submit"
              style={{
                borderRadius:'18px',
                fontSize:'18px',
                backgroundColor:'#db9769',
              }}>Submit</button>
          </form>
        </div>
      )}
      {/* else:... */}
      {username && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider