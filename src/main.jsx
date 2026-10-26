import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Pandora's Box Render Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          backgroundColor: '#030712',
          color: '#00f3ff',
          fontFamily: 'monospace',
          padding: '40px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>[ SEAL BREACH DETECTED ]</h1>
          <p style={{ color: '#f8fafc', marginBottom: '24px', maxWidth: '600px' }}>
            {this.state.error?.message || "An unexpected disturbance occurred in the arcane engine."}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#0e2b45',
              border: '2px solid #00f3ff',
              color: '#ffffff',
              padding: '12px 24px',
              fontFamily: 'monospace',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            RE-IGNITE SANCTUARY
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
