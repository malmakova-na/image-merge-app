
import './App.css';
import { useEffect } from 'react';
import {useImgs} from './hooks';
function App() {
  const [imgs, getPong] =  useImgs();
    useEffect(() => {
    getPong();
  }, []);
  
  return (
    <div className="container">
    <div className="header">
      <button onClick ={()=> getPong()}>ping</button>
    </div>
    
  </div>
    
  );
}

export default App;
