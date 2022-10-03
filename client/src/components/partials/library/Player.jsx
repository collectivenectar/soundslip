import { useState, useEffect, useContext } from 'react';
import { AudioContext } from '../../../App';

const Player = (props) => {
    const {
        currentSoundPlaying, 
        setCurrentSoundPlaying, 
        isPlaying, 
        setIsPlaying 
    } = useContext(AudioContext)
    const [isThisOnePlaying, setIsThisOnePlaying] = useState(false)
    
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
    }, [isPlaying])
    return (
        < div >
            <span className="audio-player" onClick={togglePlay}>{isThisOnePlaying? "pause": "play"}</span>
        </div>
    )
}

export default Player