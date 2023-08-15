import React, { useState, useEffect, useContext } from 'react'

import { AudioContext } from '../../../App'

// * State management (sort of) for the html audio element that plays all the samples.
// * Using useRef() to keep a reference to the element outside of rendering cycles
// * The useRef() is actually created in the App.jsx file, and it's hooks are passed here
// * for the ability to import the player into multiple pages without losing place in
// * the currently playing sample.

const Player = ( props ) => {
    const {
        currentSoundPlaying, 
        setCurrentSoundPlaying, 
        isPlaying, 
        setIsPlaying 
    } = useContext(AudioContext)

    const [ isThisOnePlaying, setIsThisOnePlaying ] = useState(false)
    
    function togglePlay() {
        let soundslipId = props.soundslip._id
        if(!isThisOnePlaying && currentSoundPlaying !== soundslipId){
            setIsPlaying(oldState => false)
            setCurrentSoundPlaying(oldSound => soundslipId)
        }else if(!isThisOnePlaying && currentSoundPlaying === soundslipId){
            setIsPlaying(playState => true)
        }else{
            setIsPlaying(playState => false)
        }
        
    }

    useEffect(() => {
        if(currentSoundPlaying === props.soundslip._id){
            setIsThisOnePlaying(playState => isPlaying)
        }else{
            setIsThisOnePlaying(playState => false)
        }
    }, [ isPlaying, currentSoundPlaying ])

    return (
        <div className="lib-player-container">
            <span className="audio-player-lib" onClick={ togglePlay }>{ isThisOnePlaying? <i className="fa-solid fa-pause"></i>: <i className="fa-solid fa-play"></i> }</span>
        </div>
    )
}

export default Player