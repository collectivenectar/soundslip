import { useState, useEffect, useContext } from 'react';
import { EditContext } from './partials/profile/ManageSoundslips';



const Player = (props) => {
    const {setSoundPlaying} = useContext(EditContext)
    const [url, setUrl] = useState(null)
    // need to manage a few things:
    // Play/Pause - if other sound is playing, stop that sound, then play this one
    // Loading metadata


    return (
        <audio controls className="audio-player">
            <source src=""></source>
        </audio>
    )
}

export default Player