
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