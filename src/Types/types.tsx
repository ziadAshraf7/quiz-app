import React, { Dispatch, SetStateAction } from "react"



export type QuizInputprops = {
    targetInputForm : boolean , 
    inputFormId : number , 
    targetInputFormId : number ,
    Increment : (e : React.MouseEvent<HTMLFormElement>) => void , 
    Decrement : () => void ,
    isLastInputForm : boolean
}


export type QuizInputComponents = [
    {type : React.FunctionComponent<QuizInputprops> , id : number } , 
    {type : React.FunctionComponent<QuizInputprops> , id : number } , 
    {type : React.FunctionComponent<QuizInputprops>, id : number } , 
]

export type QuestionsType = ["Multiple Choice" , "True / False"]


export type difficultyDataType = ["easy" , "medium" , "hard"]

export type CategoryListType = {name : string , id : string}

export type QuizComponentProps = {
    StartQuiz : boolean , 
    Diffuculty :  difficultyDataType[number] 
    CategoryId : string  ,
    questionCount : number ,
    CategoryList : CategoryListType[]
}



export type Homeprops = {
    setStartQuiz : Dispatch<SetStateAction<boolean>>
    CategoryId : string
    questionCount : number
    Diffuculty : difficultyDataType[number]
}



export type QuizDataType = {
    category : string , 
    correct_answer : string , 
    difficulty : "easy" | "medium" | "hard" , 
    incorrect_answers : string[] , 
    question : string , 
    type : "multiple" | "boolean"  
}

export type QAComponentProps = {
        setQuizEnd : React.Dispatch<React.SetStateAction<boolean>> , 
        QuizEnd : boolean , 
        setQuestionNumber: React.Dispatch<React.SetStateAction<number>> , 
        QAData : QuizDataType[] | undefined , 
        QuestionsNumber: number | undefined , 
}



export type ContextQuizComponent = {
    AllUserAnswers :  React.MutableRefObject<{
    IsCorrect: boolean;
    Answer: string;
}[]>

}


export type DiffucultyMinutesType = {
 [Difficulty : string] : number
}

export type AnswerFormProps = {
      targetAnswerForm : boolean , 
      correctAnswer : string , 
      inCorrectAnswer : string[] , 
      nextQuestion : () => void , 
      PrevQuestion : () => void , 
      AnswerFormindex : number
  }


 export type TimerProps = {
        setQuizEnd: React.Dispatch<React.SetStateAction<boolean>> , 
         QuizEnd : boolean
  }


  export  type MainContextType = {
    RoundTimeMinutes : number
     , setCategoryId: React.Dispatch<React.SetStateAction<string>>
     , setQuestionCountList: React.Dispatch<React.SetStateAction<number[]>>
     ,setCategoryList : React.Dispatch<React.SetStateAction<CategoryListType[]>> 
        , setDiffuculty : React.Dispatch<React.SetStateAction<difficultyDataType[number]>>
        ,setQuestionCount: React.Dispatch<React.SetStateAction<number>>   
        , QuestionCountList : number[]
        , CategoryList : CategoryListType[]
        , CategoryId : string 
        , questionCount : number
        , Diffuculty : difficultyDataType[number]
  }


  export type QuizContextType = {
    AllUserAnswers : React.MutableRefObject<{
        IsCorrect: boolean;
        Answer: string;
    }[]>
    , QuestionNumber : number
}