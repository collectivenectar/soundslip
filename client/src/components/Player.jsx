import { useState, useEffect, useContext } from 'react'
import { AudioContext } from '../App'

// This player is duplicated for however many samples there are on the page.
// This needs to queue the id of the sample into the AudioContext useRef()
// audio element attribute. Then state manages 'hitting play/pause' only on 
// one sample.

// This makes it ideal to expand to an audio player that can queue a playlist.

const Player = (props) => {
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
            setIsPlaying(playState => false)
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
        < div className="user-audio-player">
            <span onClick={ togglePlay }>{ isThisOnePlaying? <i className="fa-solid fa-pause"></i>: <i className="fa-solid fa-play"></i> }</span>
        </div>
    )
}

export default Player