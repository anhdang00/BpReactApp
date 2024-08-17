import './styles.css'
import UserPanel from './UserPanel'
import EventPreview from './EventPreview'
import { useCallback, useEffect, useState } from 'react'
import useAuth from '../Auth/useAuth'
import {
  CLIENT_EVENT_LIST_EVENTS,
  EVENT_CREATE_EVENT,
  SERVER_EVENT_LIST_EVENTS,
} from '../constants/socket'
import { socket } from '../main'
import { useNavigate } from 'react-router-dom'
const EVENT_INIT_OBJECT = {}
export default function Lobby() {
  const navigate = useNavigate()
  const userName = useAuth()
  const [events, setEvents] = useState([])
  const [eventType, setEventType] = useState('Tic-Tac-Toe')

<<<<<<< Updated upstream:src/Lobby/index.jsx
import './styles.css';
import UserPanel from "./UserPanel";
import EventPreview from "./EventPreview";
import { useState } from 'react';
import useAuth from '../Auth/useAuth';

const EVENT_INIT_OBJECT={}

export default function Lobby(){
    const username = useAuth()
    const [events, setEvents] = useState([])
    const [eventType, setEventType]=useState('Tic-Tac-Toe')
    const genNewEvent= (restEventData)=>{
        return {...EVENT_INIT_OBJECT, id:`${new Date().getTime()}_event`,...restEventData}
    }
    const createEvent = () =>{
        setEvents(evts => [...evts,genNewEvent(
            {type:eventType, players:[username]}
        )])
    }
=======
  const API_GETEvents = events => {
    setEvents(events)
  }
  useEffect(() => {
    //from client
    socket.emit(SERVER_EVENT_LIST_EVENTS)
  }, [])

  useEffect(() => {
    //from server
    socket.on(CLIENT_EVENT_LIST_EVENTS, API_GETEvents)
    return () => {
      socket.off(CLIENT_EVENT_LIST_EVENTS, API_GETEvents)
    }
  })

  const createEvent = () => {
    socket.emit(EVENT_CREATE_EVENT, { userName, eventType }, id => {
      navigate(`/${id}`)
    })
  }
>>>>>>> Stashed changes:web/src/Lobby/index.jsx

  return (
    <div className="lobby-container">
      <div className="lobby-main">
        <UserPanel createEvent={createEvent} setEventType={setEventType} />
        <EventPreview events={events} />
      </div>
    </div>
  )
}