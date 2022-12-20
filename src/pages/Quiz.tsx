
import {QuizComponentProps, QuizDataType} from "../Types/types"
import { useEffect, useState , useRef } from 'react'
import { useNavigate } from "react-router-dom"
import QA from "../Components/Q&A"
import React from "react"
import Timer from "../Components/TimeCounter"
import {QuizContextType} from "../Types/types"
import { getQuizData } from "../Api/api"


export const QuizContext = React.createContext<QuizContextType>({
    AllUserAnswers : {current:[{ IsCorrect: false , Answer: ""}]} , 
    QuestionNumber : 1
})

 const Provider = QuizContext.Provider


function Quiz({
    CategoryId , 
    questionCount ,
    Diffuculty , 
    StartQuiz ,
    CategoryList
} : QuizComponentProps){

    const navigate = useNavigate()

    let [Round , setRound] = useState<number>(1)
    let [QAData , setQAData] = useState<QuizDataType[] | undefined>()
    let [IsLoading , setIsLoading] = useState<boolean>(true)
    let [QuestionNumber , setQuestionNumber] = useState<number>(1)
    const AllUserAnswers = useRef<{IsCorrect : boolean , Answer : string}[]>([])
    const [QuizEnd , setQuizEnd] = useState<boolean>(false)
    const Category = CategoryList?.find(item => item.id == CategoryId)
    const QuestionsNumber = QAData?.length

    const Score : number = QuizEnd ? AllUserAnswers.current.reduce((acc , answer) => {
      if(answer.IsCorrect === true){
          acc++
      }
      return acc
    },0) : 0

    const RoundResult = Score >= ((QuestionsNumber as number) / 2) ? "Passed" : "Failed"
    const ProgressWidth : number = ((QuestionNumber) / (QuestionsNumber as number)) * 100


    AllUserAnswers.current = QuizEnd ? [] : AllUserAnswers.current 

    console.log(QAData)
    function RetryQuiz(){
        setQuizEnd(false)
        setIsLoading(true)
        setRound(prev => prev + 1)
        setQuestionNumber(1)
    }


      useEffect(() =>{  
        let abort = false
        if(StartQuiz || Round > 1){
                    getQuizData(CategoryId , questionCount , Diffuculty).then(res =>{
                        console.log(res)
                        setQAData(res.results)
                        setIsLoading(false)
                    })
        }
        return () => {
            abort = true
        }
    },[StartQuiz,Round , questionCount , CategoryId , Diffuculty])



    if(!StartQuiz){
        return (
            <div style = {{width : "100vw"  , height : "100vh" , display : "flex" , justifyContent : "center" , alignItems : "center"}}>
                <button className="RedirectBtn" onClick={() => navigate("../")}>Back To HomePage To Filter Your Quiz Questions type</button>
            </div>
        )
    }else if(IsLoading){
        return ( 
        <div className="LoadingPage">
        <h2>Loading ...</h2>
      </div>
      )
    }
    return (
        <>

    <div className="QuizArea">

        <div className="RoundData">
            <div className="MainData">
                <div>Category : <span>{Category?.name}</span></div>
                <div>Diffuculty : <span>{Diffuculty}</span></div>
            </div>
            <div className="Counter">
                   <Timer QuizEnd = {QuizEnd} setQuizEnd = {setQuizEnd} />
            </div>
        </div>


          <Provider value={{AllUserAnswers , QuestionNumber}}>
          {!QuizEnd && <QA 
          setQuizEnd = {setQuizEnd} 
          QuizEnd = {QuizEnd}
          setQuestionNumber = {setQuestionNumber} 
          QAData = {QAData} 
          QuestionsNumber = {QuestionsNumber}
           />}
          </Provider>
        
        {QuizEnd && <div className="GameResult">
        {RoundResult == "Passed" && <h2><span style = {{color : "green"}}>Congratulations</span></h2>}
        {RoundResult == "Failed" && <h2> <span style = {{color : "red"}}>Failed</span> ,Please try again</h2>}
        <h3>Score : {Score}/{QuestionsNumber}</h3>
            </div>}


        <div className="Buttons">
        {QuizEnd &&  <button onClick={() => RetryQuiz() } >Retry Quiz</button>}
        {QuizEnd &&  <button onClick={() => navigate("../")}>Return To Home Page</button>}
        </div>

       {!QuizEnd && <div className="ProgressWrapper">
        <div className="ProgressData">
                    {QuestionNumber} / {QuestionsNumber}
                </div>
          <div className="Progress">
            <div>
                <div style = {{width : `${ProgressWidth}%` , backgroundColor : "#eee" , height : "100%" }}></div>
            </div>
          </div>
        </div>}
    </div>
       
        </>
    )
}


export default Quiz