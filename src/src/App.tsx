import React from 'react';
import { useState  } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './pages/Home';
import Quiz from './pages/Quiz';
import {CategoryListType} from "./Types/types"
import {difficultyDataType} from "./Types/types"
import {MainContextType} from "./Types/types"
import { DiffucultyMinutes, QuestionNumberMinutes } from './Components/timerData';



export const MainContext = React.createContext<MainContextType>(
  {
    RoundTimeMinutes : 0
    , setCategoryId: () => {}
    , setQuestionCountList: () => {}
    ,setCategoryList : () => {}
    , setDiffuculty :() => {}
    ,setQuestionCount: () =>{}
    , QuestionCountList : []
    , CategoryList : []
    , CategoryId : ""
    , questionCount : 0
    , Diffuculty : "easy"
  }
)

const Provider = MainContext.Provider


function App() {

  let [CategoryList , setCategoryList] = useState<CategoryListType[]>([])
  let [CategoryId , setCategoryId] = useState<string>("")
  let [QuestionCountList , setQuestionCountList] = useState<number[] >([])
  let [questionCount , setQuestionCount]  = useState<number>(0)
  let [Diffuculty , setDiffuculty]  = useState<difficultyDataType[number]>("easy")
  let [StartQuiz , setStartQuiz] = useState(false)

  
  const RoundTimeMinutes = DiffucultyMinutes[Diffuculty] + QuestionNumberMinutes(questionCount)


    return (
      <>
  <Provider value={{
       RoundTimeMinutes
     , setCategoryId 
     , setQuestionCountList
     , setCategoryList 
     , setDiffuculty
     , setQuestionCount
     , QuestionCountList 
     , CategoryList 
     , CategoryId  
     , questionCount
     , Diffuculty  
     }}>
            
    <Router >
      <Routes>

       <Route path='' element = {
        <HomePage 
         setStartQuiz = {setStartQuiz}
         CategoryId = {CategoryId} 
         questionCount = {questionCount}
         Diffuculty = {Diffuculty}
          />}/>

        <Route path='QuizArea' element = {<Quiz 
          CategoryId = {CategoryId}
          questionCount = {questionCount}
          Diffuculty = {Diffuculty}
          CategoryList = {CategoryList}
          StartQuiz = {StartQuiz}
           />} />

      </Routes> 
    </Router>
  </Provider>
      </>
    );
  }


export default App
