import { useNavigate } from "react-router-dom";

export default function Lobby(){
    const navigate = useNavigate()
    return <div>
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