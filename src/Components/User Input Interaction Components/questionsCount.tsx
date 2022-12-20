
import {QuizInputprops} from "../../Types/types"
import {MainContext} from "../../App"

import { useEffect , useContext, ChangeEvent} from 'react'
import { getTotalQuestionsCount } from "../../Api/api"

function QuestionCount({
    targetInputForm , 
    targetInputFormId , 
    inputFormId ,
    Increment , 
    Decrement ,
    isLastInputForm
} : QuizInputprops){

    const {QuestionCountList , setQuestionCount, setQuestionCountList , CategoryId , Diffuculty } = useContext(MainContext)
   
    let Style = targetInputFormId > inputFormId? {transform : "translateX(-150%)" , transition : "ease 0.6s"} :
    {transform : "translateX(150%)" , transition : "ease 0.6s"}

    Style = targetInputForm ? {transform : "translateX(0)" , transition : "ease 0.6s"} : Style 
    
   function handleChange(e : ChangeEvent<HTMLSelectElement>) : void{
    setQuestionCount((Number(e.target.value)))
   }

   function questionCountListGenerate (questionsCount : number){
    console.log(questionsCount)
       let ack = 5
       let GeneratedArray : number[] = []
       for(let i = 0 ; i < questionsCount ; i++){
        if(questionsCount <= 10){
            GeneratedArray.push(questionsCount) 
            break;
        }

        if(questionsCount < 50){
            if(ack > questionsCount){
                GeneratedArray.push(questionsCount)
                break;
            }
            GeneratedArray.push(ack)
            ack += 5
        }else{
            if(ack <= 50){
                GeneratedArray.push(ack)
                ack += 5
            }else{
                break;
            }
        }
       }  
        return GeneratedArray
   }

    useEffect(() =>{
        let abort = false
        if(CategoryId && Diffuculty){
            if(!abort){
                getTotalQuestionsCount(CategoryId).then(res =>{
                    switch(Diffuculty){
                        case "easy" : 
                        let totalEasyQuestionCount = res.total_easy_question_count
                        setQuestionCountList(questionCountListGenerate(totalEasyQuestionCount))
                        setQuestionCount(totalEasyQuestionCount < 10 ? totalEasyQuestionCount : 5)
                        break;
                        case "medium" : 
                        let totalMedQuestionCount = res.total_medium_question_count
                        setQuestionCountList(questionCountListGenerate(totalMedQuestionCount))
                        setQuestionCount(totalMedQuestionCount < 10 ? totalMedQuestionCount : 5)
                        break;
                        case "hard" : 
                        let totalHardQuestionCount = res.total_hard_question_count
                        setQuestionCountList(questionCountListGenerate(totalHardQuestionCount))
                        setQuestionCount(totalHardQuestionCount < 10 ? totalHardQuestionCount : 5)
                        break;
                    }
                })

            }
        }
        return () => {
            abort = true
        }

    },[CategoryId,Diffuculty])


    return (
        <>
<form onSubmit={(e) => e.preventDefault()} id={`form_${inputFormId}`} className="SelectWrapper" style = {Style}>
    <div className="Head">Select Number of Question</div>
   {<select 
   required
   defaultValue={""}
   form = {`form_${inputFormId}`}
   className="SelectBox"  
   onChange={(e) => handleChange(e)}>

        {QuestionCountList?.map((item: number ) =>{
            return (
                <option value={item} key = {item}>
                    {item}
                </option>
            )
        })}

        </select>}
        <div className='Buttons'>
                <button className="homeInputs" disabled = {targetInputFormId === 1} onClick={Decrement}>Prev</button>
                <input className="homeInputs" disabled={isLastInputForm} type = {"submit"} value = {"Next"} />
            </div> 
    </form>
        </>
    )
}

export default QuestionCount