import {QAComponentProps} from "../Types/types"
import {  useContext} from 'react'
import {QuizContext} from "../pages/Quiz"
import {QuizDataType} from "../Types/types"
import AnswerForm from "./AnswerForm";


function QA({
    setQuizEnd , 
    setQuestionNumber , 
    QAData , 
    QuestionsNumber
} : QAComponentProps){

    const {QuestionNumber} = useContext(QuizContext)

    const IsNextQuestion = QuestionNumber < (QuestionsNumber as number)

function nextQuestion(){
    if(IsNextQuestion){
            setQuestionNumber((prev: number) => prev + 1)
    }else{
        setQuizEnd(true)
    }
    }

    function PrevQuestion(){
        setQuestionNumber((prev: number) => prev - 1)
    }

    return (
        <>
       <div className="QA">
          <div className="Questions">
                {QAData?.map((item : QuizDataType , index : number) =>{
                    return (
                            <div 
                            dangerouslySetInnerHTML={{__html : item.question}} 
                            className="Question" 
                            style={{display : QuestionNumber - 1 === index ? "initial" : "none" , width : "100%"}} 
                            key={index} 
                            />
                    )
                })}
            </div>

  <div className="AnswerFormWrapper" >
    {QAData?.map((item : QuizDataType , AnswerFormindex : number) =>{
            return (
                <AnswerForm key={AnswerFormindex} 
                    AnswerFormindex = {AnswerFormindex}
                    targetAnswerForm = {(QuestionNumber-1) === AnswerFormindex }
                    correctAnswer = {item.correct_answer }
                    inCorrectAnswer = {item.incorrect_answers} 
                    nextQuestion = {nextQuestion} 
                    PrevQuestion = {PrevQuestion}
                 />
            )
        })}
    </div>
</div>
        </>
    )
}

export default QA