/* eslint-disable react/prop-types */
export default function Init({ gameMetadata, userName, eventId, onPlayerReady }) {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10%' }}>
          {(gameMetadata.players || []).map((player, idx) => (
            <div key={player}>
              <h1
                style={{
                  background: ['#EFBF9D', '#A6B5BF'][idx % 2],
                  borderRadius: '1rem',
                  padding: '1rem',
                  color: 'white',
                }}
              >
                {player}
              </h1>
              <h2 style={{ textDecoration: 'underline' }}>
                {gameMetadata.playerReady.includes(player) ? 'Ready' : 'Not Ready'}
              </h2>
            </div>
          ))}
        </div>
        {!gameMetadata.playerReady.includes(userName) && eventId && (
          <div>
            <button id="readyButton" onClick={onPlayerReady}>
              Ready
            </button>
          </div>
        )}
      </>
    )
  }