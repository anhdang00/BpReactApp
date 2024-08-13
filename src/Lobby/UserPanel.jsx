

export default function UserPanel(){
    return (
        <div style={{padding: '4px'}}>
        <h1>User Info</h1>
        <h2>Anh Dang</h2>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
        }}>
            <h3>Event</h3>
            <select>
                <option>Tic-Tac-Toe</option>
                <option>Event 2</option>
                <option>Event 3</option>
            </select>
            <button>Create</button>
        </div>
        <div>
            <h3>Friend List</h3>
            <div style={{
                height: '200px',
                border: '1px solid',
            }}>

            </div>
        </div>
    </div>
    )
}