import { useContext, useEffect, useState } from "react"
import {TimerProps} from "../Types/types"
import {MainContext} from "../App"

function Timer({ 
    QuizEnd , 
    setQuizEnd
} : TimerProps){
    let {RoundTimeMinutes} = useContext(MainContext)

    let [seconds , setSeconds] = useState<number>(0)
    let [minutes , setMinutes] = useState<number>(RoundTimeMinutes)



    function handleSeconds(seconds : number):number{
        if(seconds == 0){
            setMinutes(minutes - 1) 
            return 59
        }
        return seconds - 1
    }


    useEffect(() =>{
        let TimerInterval : NodeJS.Timer

        if(seconds == 0 && minutes == 0){
            setQuizEnd(true)
            return
        }
            if(!QuizEnd){
                TimerInterval = setInterval(() =>{
                    setSeconds(prev => handleSeconds(prev)) 
                },1000)
            }
        
        return () =>{
                clearInterval(TimerInterval)
          }

    },[QuizEnd , seconds])
   


    return(
        <span >
         {!QuizEnd &&<div >
            {minutes + ":" + (seconds < 10 ? `0${seconds}` : seconds)}
             </div>}
         {QuizEnd && <span>TimeOut!</span>}
        </span>
    )
}

export default Timer