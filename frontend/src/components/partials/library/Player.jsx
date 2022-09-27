import { useState, useEffect, useContext, useRef } from 'react';
import { EditContext } from '../../pages/Library';
import axios from 'axios'
import ReactAudioPlayer from 'react-audio-player';

const baseUrl = 'http://localhost:3000/soundslips/'

const Player = (props) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const {soundPlaying, setSoundPlaying, userId} = useContext(EditContext)
    const playerRef = useRef(new Audio())

    function togglePlay (e) {
        setIsPlaying(oldState => !oldState)
        let needsReset = checkOthers()
        if(needsReset){
            setSoundPlaying((oldAllSounds) => {
                return {
                    ...oldAllSounds,
                    [props.soundslip._id]: !isPlaying,
                }
            })
        }else{
            setSoundPlaying((oldAllSounds) => {
                let others = Object.entries(soundPlaying)
                for(let each = 0; each < others.length; each++){
                    if(others[each][1] && others[each][0] !== props.soundslip._id){
                        others[each][1] = false
                    }
                }
                return {
                    ...others,
                    [props.soundslip._id]: !isPlaying,
                }
            })
        }
    }

    function checkOthers () {
        let others = Object.entries(soundPlaying)
        for(let other = 0; other < others.length; other++){
            if(others[other][1] && others[other][0] !== props.soundslip._id){
                return true
            }
        }
        return true
    }

    function requestUrl(){
        let params = {
            id: userId,
            headers: {
              'Content-Type': 'audio/mpeg'
          },
        }
        axios.get(baseUrl + props.soundslip._id, {params})
            .then(response => {
                addPlayer(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function addPlayer(url){
        playerRef.current.src = url
        playerRef.current.load()
        playerRef.current.play()
    }

    function stopPlayer(){
        playerRef.current.pause()
    }

    useEffect(() => {
        if(isPlaying && playerRef.current.src === ""){
            requestUrl()
        }else if(isPlaying){
            if(playerRef?.current.src !== ""){
                playerRef.current.play()
            }
        }else if(!isPlaying){
            if(playerRef?.current.src !== ""){
                stopPlayer()
            }
        }
    }, [isPlaying])

    useEffect(() => {
        if(!soundPlaying[props.soundslip._id]){
            if(isPlaying){
                togglePlay()
            }
        }
    }, [soundPlaying])
    return (
        < div >
            <span className="audio-player" onClick={togglePlay}>{isPlaying? "pause": "play"}</span>
        </div>
    )
}

export default Player