import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { PauseButton, PlayButton, SettingsButton } from './Buttons';
import { useContext, useState, useEffect, useRef } from 'react';
import { SettingsContext } from './Settings';

import alarm from '../assets/alarm.wav'


const red = '#f54e4e';
const green = '#3cb371'
const rotation = 90; // Define rotation variable
const strokeLinecap = 'round'; // Define strokeLinecap variable



export function Timer(){
    document.title = 'Clock | Pomodoro';

    const settingsInfo = useContext(SettingsContext)
    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('grind')
    const [secondsLeft, setSecondsLeft] = useState(settingsInfo.grindTime*60);

    const secondsLeftRef = useRef(secondsLeft) 
    const isPausedRef = useRef(isPaused) 
    const modeRef = useRef(mode) 

    const totalSeconds = (mode === 'grind' ? settingsInfo.grindTime : settingsInfo.breakTime) * 60 
    const percentage = Math.round(secondsLeft / totalSeconds * 100) ;
    const minutes = Math.floor(secondsLeft / 60)
    let seconds = secondsLeft % 60
    if (seconds < 10) seconds = '0' + seconds

    function switchMode(){
        const nextMode = modeRef.current === 'grind' ? 'break' : 'grind'
        const nextSeconds = (nextMode === 'grind' ? settingsInfo.grindTime : settingsInfo.breakTime) * 60
        
        new Audio(alarm).play();

        setMode(nextMode)
        modeRef.current = nextMode 
        setSecondsLeft(nextSeconds)
        secondsLeftRef.current = nextSeconds

        setIsPaused(true);
        isPausedRef.current = true
    }

    function tick(){
        secondsLeftRef.current--
        setSecondsLeft(secondsLeftRef.current)
    }

    function initTimer(){
        setSecondsLeft(settingsInfo.grindTime * 60);
    }


    useEffect( () => {
        initTimer()

        const interval = setInterval( () => {
            if (isPausedRef.current){
                return;
            }
            if (secondsLeftRef.current === 0){
                return switchMode();
            }

            tick();
        }, 1000 );
        return () => clearInterval(interval)

    }, [settingsInfo]);



    return (
        <div>
            <CircularProgressbar className='progress-bar' 
                value={percentage} 
                text={minutes + " : " + seconds}
                styles={buildStyles({ rotation, 
                    strokeLinecap,
                    textColor:'#fff',
                    pathColor: mode === 'grind' ? red : green,
                    tailColor:'rgba(255, 255, 255, .2)',
                })}
            />

            <div>
                {isPaused 
                ? <PlayButton onClick={() => {setIsPaused(false);
                                            isPausedRef.current = false} }/> 
                : <PauseButton onClick={() => {setIsPaused(true);
                                            isPausedRef.current = true} }/>}
            </div>

            <div>
                <SettingsButton onClick ={() => {settingsInfo.setShowSettings(true)}}/>
            </div>

        </div>
    )
}

