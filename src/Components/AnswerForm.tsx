import { useRef , useContext, useEffect } from "react"
import {QuizContext} from "../pages/Quiz"
import {AnswerFormProps} from "../Types/types"


function AnswerForm({ 
    AnswerFormindex, 
    nextQuestion , 
    PrevQuestion , 
    targetAnswerForm , 
    correctAnswer , 
    inCorrectAnswer
} : AnswerFormProps){

    const RandomAnswers = [...inCorrectAnswer , correctAnswer].sort(() => Math.random() - 0.5)
    let {AllUserAnswers , QuestionNumber} = useContext(QuizContext)
    let SelectedAnswer = useRef<string>("")

    let Style = AnswerFormindex < (QuestionNumber - 1) ? {transform : "translateX(-150%)",transition: "ease 0.4s"} : {transform : "translateX(150%)" , transition: "ease 0.4s"}
    Style = targetAnswerForm ? {transform : "translateX(0)" , transition: "ease 0.4s"} : Style



    function SelectAnswer(e : React.MouseEvent<HTMLInputElement>) : void{
        const target = e.target as HTMLInputElement;
        SelectedAnswer.current = target.value
    }


    function checkAnswer(selectedAnswer : string , CorrectAnswer : string) : boolean{
        if(selectedAnswer == CorrectAnswer){
           return true
        }else{
            return false
        }
    }

    function SubmitedAnswer(){
        let CheckedAnswer = checkAnswer(SelectedAnswer.current , correctAnswer)
        AllUserAnswers.current[QuestionNumber - 1] = {IsCorrect : CheckedAnswer  , Answer : SelectedAnswer.current}
    }


    return (
        <>
       
<form  style={Style} className="AnswersForm"  onSubmit={(e) =>{
                        e.preventDefault()
                        nextQuestion()
                        SubmitedAnswer()
}}>
          <div className="Answers">
                {RandomAnswers?.map((item : string , index : number) =>{
                    return (
                        <label key = {index}  htmlFor={item}  className="Answer" >
                        <input  onClick={(e) => {
                            SelectAnswer(e)
                            } }  className="AnswerInput" required name={`${QuestionNumber}`}  value = {item} id={item} type="radio"/>
                        {item}
                        </label>
                    )
                })}
                </div>

            <div style = {{columnGap : 40 , display : "flex"}} >
                <input className="btn" type={"button"} value = {"Prev"} disabled = {QuestionNumber === 1} onClick={() =>{ 
                    PrevQuestion()
                    }}/>
                <input className="btn" type = {"submit"} value = {"Next"} />
            </div>
</form>
        </>
    )


}

export default AnswerForm