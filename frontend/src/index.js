import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { AuthProvider } from './context/AuthContext'; 

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>  {/* Envolvendo o App com o AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
