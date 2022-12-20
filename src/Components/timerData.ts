import { DiffucultyMinutesType } from "../Types/types"



export function QuestionNumberMinutes(SelectedQuestionsNumber : number){
    if(SelectedQuestionsNumber <= 10){
      return 2
    }else if(SelectedQuestionsNumber > 10 && SelectedQuestionsNumber <=15){
      return 4
    }else if(SelectedQuestionsNumber > 15 && SelectedQuestionsNumber <= 20){
      return 6
    }else{
      return 10
    }
  }

  export const DiffucultyMinutes : DiffucultyMinutesType  = {
    easy : 5 , 
    medium : 10 , 
    hard : 15
  } 
  