import {Outlet} from 'react-router-dom'
import Navigation from './pages/Auth/Navigation'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useState, useEffect} from 'react';
import './App.css';
import Switch from './components/themeToggle';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);
  
  useEffect(() => {
    const bodyClass = isDarkMode ? 'dark-mode' : 'light-mode';
    document.body.className = bodyClass;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);  
  
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <>
    <ToastContainer />
    <Navigation/>
    <Outlet/>
    <div className="App">
      <Switch
        handleChange={toggleDarkMode}
        isChecked={isDarkMode}
      />
    </div>
    </>
  )
}

export default App
