
import './styles.css';
import UserPanel from "./UserPanel";
import EventPreview from "./EventPreview";

export default function Lobby(){
    return <div className="lobby-container">
        <nav>Welcome!</nav>
        <div className="lobby-main">
            <UserPanel/>
            <EventPreview/>
        </div>
    </div>
      
}


/**
 * Lobby {' '}
        <button onClick={()=>{
            navigate('/newSession')
        }}> take me to the game</button>
 */