import { useNavigate } from "react-router-dom"


function RectanglePreview(){
    const navigate = useNavigate()
    const onJoinEvent = () => {
        navigate('/newEvent')
    }
    return <div className="preview" onClick={onJoinEvent}>
        <div style={{
            background:'green',
            opacity: .9,
            color: 'white',
            borderRadius:'4px',
            }}>Tic Tac Toe</div>
        <user>User1</user>
        <user>User2</user>
    </div>
}

export default function EventPreview(){
    const mockupEvents = new Array(20).fill(0)
    return (
        <div className="preview-container">
            {mockupEvents.map((event, idx) => [
                <RectanglePreview key={`preview-${idx}`}/>
            ])}
        </div>
    )
}