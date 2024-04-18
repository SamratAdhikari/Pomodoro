import './App.css';
import { Timer } from './components/Timer';
import { Settings , SettingsContext} from './components/Settings';
import { useState } from 'react';



function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [grindTime, setGrindTime] = useState(50);
  const [breakTime, setBreakTime] = useState(10);

  return (
    <main>
      <div className='title'>Pomodoro</div>

      <SettingsContext.Provider value={{
        showSettings: showSettings,
        setShowSettings: setShowSettings,
        grindTime: grindTime,
        breakTime: breakTime,
        setGrindTime: setGrindTime,
        setBreakTime: setBreakTime
      }}>
        {showSettings ? <Settings/> : <Timer/>}
      </SettingsContext.Provider>
    
    </main>
  );
}

export default App;
