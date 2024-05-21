import { useEffect, useRef, useState } from "react"
import { getGames } from "../utils/Arcade-Backend-Functions"
const Ageform = ({setGames, setPath}) => { 
    const [age, setAge] = useState(0)
    const ageRef = useRef(age);

    useEffect(() => {
        // Update the ref whenever age changes
        ageRef.current = age;
    }, [age]);

    useEffect(() => {
        const keydown = (e) => {
            if(e.key === "ArrowUp"){
                setAge((prevAge) => prevAge + 1)
            }
            if(e.key === "ArrowDown"){
                setAge((prevAge) => prevAge - 1)
            }
            if(e.key === "Enter"){
                getGames(setGames, setPath, ageRef.current)
            }
        }
    window.addEventListener('keydown', keydown);

    // Clean up event listener when component unmounts
    return () => {
        window.removeEventListener('keydown', keydown);
    };
    }, []);

    return(
        <div className="ageCheck">
            <h1>Enter your age</h1>
            <h2>^</h2>
            <h2>{age}</h2>
            <h2>v</h2>
            <p>Press Enter to submit age</p>
        </div>
    )
}

export default Ageform