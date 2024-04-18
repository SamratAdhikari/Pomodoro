import React, { useContext } from 'react'
import ReactSlider from 'react-slider'

function BackButton(props){
    return(
        <button { ...props } className='settings-icon'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
            </svg>
            Back
        </button>
    )
}



export function Settings() {
    document.title = 'Settings | Pomodoro';
    const settingsInfo = useContext(SettingsContext);

  return (
    <div className='settings'>
        <label>Grind Time: {settingsInfo.grindTime} mins</label>
        <ReactSlider 
            className={'slider red'} 
            thumbClassName={'thumb'}
            trackClassName={'track'} 
            value={settingsInfo.grindTime}
            onChange={newValue => settingsInfo.setGrindTime(newValue)}
            min={5} 
            max={180}/>

        <label>Break Time: {settingsInfo.breakTime} mins</label>
        <ReactSlider 
            className={'slider green'} 
            thumbClassName={'thumb'}
            trackClassName={'track'} 
            value={settingsInfo.breakTime}
            onChange={newValue => settingsInfo.setBreakTime(newValue)}
            min={5} 
            max={180}
        />
        <div style={{marginTop: '2rem'}}>
            <BackButton onClick={() => settingsInfo.setShowSettings(false)}/>
        </div>
    </div>
  )
}


export const SettingsContext = React.createContext(0)
