import { useEffect, useRef } from 'react';

export const Logs = () => {
  const containerRef = useRef();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ping');

    ws.onmessage = (event) => {
      if (containerRef.current) {
        containerRef.current.innerHTML += event.data;
      }
    };
  }, []);

  return (
    <div className="ui message" style={{ whiteSpace: 'pre-wrap' }}>
      <p ref={containerRef} />
    </div>
  );
};