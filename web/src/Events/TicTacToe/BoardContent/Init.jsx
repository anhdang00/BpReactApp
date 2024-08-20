/* eslint-disable react/prop-types */
export default function Init({ gameMetadata, userName, eventId, onPlayerReady }) {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10%' }}>
          {(gameMetadata.players || []).map((player, idx) => (
            <div key={player}>
              <h1
                style={{
                  background: ['red', 'green'][idx % 2],
                  opacity: 0.9,
                  borderRadius: '2rem',
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
            <button
              style={{ fontSize: '1.5rem', background: 'blue', opacity: 0.5, color: 'white' }}
              onClick={onPlayerReady}
            >
              Ready
            </button>
          </div>
        )}
      </>
    )
  }