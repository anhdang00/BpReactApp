import { useNavigate } from "react-router-dom"


function RectanglePreview({event}){
    const navigate = useNavigate()
    const onJoinEvent = () => {
        navigate(`/${event.id}`)
    }
    return (
        <div className="preview" onClick={onJoinEvent}>
            <div style={{
                background:'green',
                opacity: .9,
                color: 'white',
                borderRadius:'4px',
                }}>
                {event.type}
            </div>
            {event.players.map(player =>
                <div>{player}</div>
            )}
        </div>
    )
}

export default function EventPreview({events}){
    
    return (
        <div className="preview-container">
            {events.map((event, idx) => [
                <RectanglePreview key={`preview-${idx}`} event={event}/>
            ])}
        </div>
    )
}