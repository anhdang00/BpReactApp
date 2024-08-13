import { useNavigate } from "react-router-dom";
import './styles.css'

export default function Lobby(){
    const navigate = useNavigate()
    return <div className="lobby-container">
        <nav>Welcome!</nav>
        <div>
            <div></div>
            <div></div>
        </div>
    </div>
      
}


/**
 * Lobby {' '}
        <button onClick={()=>{
            navigate('/newSession')
        }}> take me to the game</button>
 */