import {useState } from 'react'
import Category from "../Components/User Input Interaction Components/Category"
import Difficulty from "../Components/User Input Interaction Components/Difficulty"
import QuestionCount from "../Components/User Input Interaction Components/questionsCount"
import { useNavigate } from 'react-router-dom'
import {QuizInputComponents}  from "../Types/types"
import {Homeprops} from "../Types/types"
import backGround from "../Pics/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg"


const inputComponents : QuizInputComponents  = [
    {type : Category , id : 1 } , 
    {type : Difficulty , id : 2 } , 
    {type : QuestionCount , id : 3 } , 
]

function HomePage({
     setStartQuiz ,
     CategoryId ,
     questionCount , 
     Diffuculty 
    } : Homeprops){

    const navigate = useNavigate()


    let [targetInputFormId , settargetInputFormId] = useState<number>(1)
    const isLastInputForm = inputComponents.length === targetInputFormId


    function Increment(e : React.MouseEvent<HTMLFormElement>){
        e.preventDefault()
        settargetInputFormId(prev => prev + 1)
    }

    function Decrement(){
        settargetInputFormId(prev => prev - 1)
    }

    
    return(

 <div style={{
    width : "100vw" ,
    height : "100vh" ,
    backgroundImage : `url(${backGround})` ,
    backgroundSize : "cover" ,
    backgroundColor : "#000000b3",
    backgroundBlendMode : "multiply"
 }}>

    <div className='inputWrapp'>
      <div className='QuizInput'>
        {inputComponents.map((item) =>{
            const QuizTypeInput = item.type 
            return (
                <QuizTypeInput 
                targetInputFormId={targetInputFormId} 
                inputFormId={item.id} 
                targetInputForm={item.id === targetInputFormId}  
                key={item.id}
                isLastInputForm = {isLastInputForm}
                Increment = {Increment}
                Decrement = {Decrement}
                />
            )
          })}
        </div>

    <div className='HomeButtons'>
        {isLastInputForm && <button className='homeInputs' onClick={() => {
                if(CategoryId && questionCount && Diffuculty){
                    navigate("../QuizArea")
                    setStartQuiz(true)
                }
                    }}>Start Quiz</button>}
        </div>
    </div>

        </div>
    )
}


export default HomePage