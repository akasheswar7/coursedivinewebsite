import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class TopLevelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Top-level React render error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px 20px', fontFamily: 'sans-serif', textAlign: 'center', background: '#071F3F', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '12px' }}>Course Divine Technology</h1>
          <p style={{ color: '#94a3b8', maxWidth: '500px', fontSize: '14px', marginBottom: '20px' }}>
            {this.state.error?.message || 'The application encountered an unexpected state.'}
          </p>
          <button
            onClick={() => {
              window.location.href = '#/';
              window.location.reload();
            }}
            style={{ padding: '10px 22px', background: '#0F62FE', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Refresh Platform
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <TopLevelErrorBoundary>
    <App />
  </TopLevelErrorBoundary>
);
