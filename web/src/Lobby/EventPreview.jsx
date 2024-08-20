import { useNavigate } from 'react-router-dom'
import { socket } from '../main'
import useAuth from '../Auth/useAuth'
import { EVENT_PLAYER_JOIN } from '../constants/socket'

function RectPreview({ event }) {
  const userName = useAuth()
  const navigate = useNavigate()
  const onJoinEvent = () => {
    socket.emit(EVENT_PLAYER_JOIN, { userName, eventId: event.id })
    navigate(`/${event.id}`)
  }
  return (
    <div className="preview" onClick={onJoinEvent}>
      <div style={{ 
        background: 'green', 
        opacity: 0.9, 
        color: 'white', 
        borderRadius: '4px' }}>
        {event.type}
      </div>
      {event.players.map(player => (
        <div key={player}>{player}</div>
      ))}
    </div>
  )
}
export default function EventPreview({ events }) {
  return (
    <div className="preview-container">
      {events.map((event, idx) => (
        <RectPreview key={`preview-${idx}`} event={event} />
      ))}
    </div>
  )
}