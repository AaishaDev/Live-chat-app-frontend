
import './App.css';
import { Routes, Route} from "react-router-dom"
import Start from './components/start/Start';
import Chat from './components/chat/Chat';




function App() {

  
  return (
    <>
      
      <Routes>
      <Route path="/" element={<Start/>} /> 
  
      <Route path="/chat/:user" element={<Chat/>} /> 
      </Routes>

    
    </>
  );
}

export default App;
