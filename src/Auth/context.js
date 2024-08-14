// App.js
import React from 'react';
import { AuthProvider } from './useAuth';
import Lobby from '../Lobby';

function App() {
  return (
    <AuthProvider>
      <Lobby />
    </AuthProvider>
  );
}

export default App;