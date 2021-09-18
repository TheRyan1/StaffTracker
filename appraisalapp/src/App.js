import {useState } from 'react'
import './App.css';
import DashBoard from './components/DashBoard'
import { PopUpContext } from './PopUpContext';
import {useAuth0} from '@auth0/auth0-react'
import Login from './components/Login';
function App() {
  const {isAuthenticated} = useAuth0()
  const [view, setView] = useState("")
  return (
    isAuthenticated ? (
<PopUpContext.Provider value={{view, setView}}>
    <DashBoard />
    </PopUpContext.Provider>
    ) : (
<Login />
    )
    
  );
}

export default App;
