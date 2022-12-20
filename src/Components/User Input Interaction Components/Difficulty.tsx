import {QuizInputprops , difficultyDataType} from "../../Types/types"
import {MainContext} from "../../App"
import {useContext, ChangeEvent} from 'react'


function Difficulty({
    targetInputForm , 
    targetInputFormId , 
    inputFormId ,
    Increment , 
    Decrement ,
    isLastInputForm
} : QuizInputprops){

    
    const {Diffuculty , setDiffuculty} = useContext(MainContext)
    const Data : difficultyDataType = ["easy" , "medium" , "hard"]
    let Style = targetInputFormId > inputFormId ? {transform : "translateX(-150%)" , transition : "ease 0.6s"} :
    {transform : "translateX(150%)" , transition : "ease 0.6s"}
    Style = targetInputForm ? {transform : "translateX(0)" , transition : "ease 0.6s"} : Style 



    function handleChange(e : ChangeEvent<HTMLSelectElement>){
        setDiffuculty((e.target.value as difficultyDataType[number]))
    }

    return (
        <>
        <form onSubmit={Increment} id = {`form_${inputFormId}`} className="SelectWrapper" style = {Style}>
            <div className="Head">Select Quiz Diffuculty</div>
           {<select 
           required
           form={`form_${inputFormId}`} 
           className="SelectBox" 
           value={Diffuculty}  
           onChange={(e) => handleChange(e) }>

                {Data.map((item : difficultyDataType[number] , index : number) =>{
                    return (
                        <option value = {item} key={index}>{item}</option>
                    )
                })}

            </select>}
            <div className='Buttons'>
                <button className="homeInputs" disabled = {targetInputFormId === 1} onClick={Decrement}>Prev</button>
                <input  className="homeInputs" disabled={isLastInputForm} type = {"submit"} value = {"Next"} />
              </div> 
            </form>
            
        </>
    )
}

export default Difficulty