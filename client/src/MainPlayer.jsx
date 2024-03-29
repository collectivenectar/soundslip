import { useContext } from 'react'
import { AudioContext } from './App'
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';


// TODO: this needs refactoring, possibly finding another more secure solution

function MainPlayer() {
    const { isLoaded, isSignedIn, user } = useUser()
    const userId = !isLoaded || !isSignedIn ? null: user.id;
    const { setUserId } = useContext(AudioContext)

    useEffect(() => {
        setUserId(oldId => userId)
    }, [ userId ])

    return (
        <></>
    )
}

export default MainPlayer