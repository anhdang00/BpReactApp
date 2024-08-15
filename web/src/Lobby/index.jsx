
import './styles.css';
import UserPanel from "./UserPanel";
import EventPreview from "./EventPreview";
import { useEffect, useState } from 'react';
import useAuth from '../Auth/useAuth';
import { socket } from '../main';
import { EVENT_CREATE_EVENT, EVENT_LIST_EVENTS } from '../constants/socket';
import { useNavigate } from 'react-router-dom';

const EVENT_INIT_OBJECT={}

export default function Lobby(){
    const username = useAuth()
    const [events, setEvents] = useState([])
    const [eventType, setEventType]=useState('Tic-Tac-Toe')
    const navigate = useNavigate()
    const API_GETEvents = events => {
    setEvents(events)
  }
  useEffect(() => {
    //from client
    socket.emit(EVENT_LIST_EVENTS)
  }, [])

  useEffect(() => {
    //from server
    socket.on(EVENT_LIST_EVENTS, API_GETEvents)
    return () => {
      socket.off(EVENT_LIST_EVENTS, API_GETEvents)
    }
  })

  const createEvent = () => {
    socket.emit(EVENT_CREATE_EVENT, { username, eventType }, id => {
      navigate(`/${id}`)
    })
  }

    return <div className="lobby-container">
        <div className="lobby-main">
            <UserPanel createEvent={createEvent} setEventType={setEventType }/>
            <EventPreview events={events}/>
        </div>
    </div>
      
} 


/**
 * Lobby {' '}
        <button onClick={()=>{
            navigate('/newSession')
        }}> take me to the game</button>
 */