import { useState, useEffect } from 'react';

const Player = (props) => {
    const [playing, setPlaying] = useState(false);
    const [soundslip, setSoundslip] = useState(null)
    return (
        <audio controls controlsList="nodownload" src="">

        </audio>
    )
}

export default Player