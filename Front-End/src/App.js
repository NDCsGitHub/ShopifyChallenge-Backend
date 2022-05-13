import './App.css';
import DashBoard from './components/DashBoard/DashBoard';
import {DashboardContextProvider} from './contexts/DashboardContext'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>

      <Route 
          path="/"
          element={
            <DashboardContextProvider>
              <DashBoard />
            </DashboardContextProvider>
          }
        />  


      </Routes>
    </Router>


  );
}


export default App;
