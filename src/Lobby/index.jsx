import { useNavigate } from "react-router-dom";

export default function Lobby(){
    const navigate = useNavigate()
    return <div>
        Lobby {' '}
        <button onClick={()=>{
            navigate('/newSession')
        }}> take me to the game</button>
    </div>
      
}