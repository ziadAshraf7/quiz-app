import {CategoryListType, QuizInputprops} from "../../Types/types"
import {MainContext} from "../../App"
import { useEffect , useContext, ChangeEvent} from 'react'
import { getCategoriesList } from "../../Api/api"




function Category({
    targetInputForm , 
    targetInputFormId , 
    inputFormId ,
    Increment , 
    Decrement ,
    isLastInputForm
} : QuizInputprops){

    const {
        CategoryList,
        setCategoryList,
        setCategoryId ,
        CategoryId} = useContext(MainContext)

    let Style = targetInputFormId > inputFormId ? {transform : "translateX(-150%)" , transition : "ease 0.6s"} :
    {transform : "translateX(150%)" , transition : "ease 0.6s"}
    Style = targetInputForm ? {transform : "translateX(0)" , transition : "ease 0.6s"} : Style 


    function handleChange  (e : ChangeEvent<HTMLSelectElement>) : void {
        setCategoryId(e.target.value)
    }


    useEffect(() =>{ 
        let abort = false
         getCategoriesList().then(res =>{
            if(!abort){
                setCategoryList(res.trivia_categories)
                setCategoryId(res.trivia_categories[0].id)
            }
         })
        return () => {
            abort = true
        }
      },[])



    return (
        <>
        <form id = {`form_${inputFormId}`} onSubmit={Increment} className="SelectWrapper" style = {Style}>
         <div className="Head">Select Quiz Category</div>
        {<select 
        required 
        form={`form_${inputFormId}`} 
        className="SelectBox" 
        defaultValue = {CategoryId} 
        onChange={(e) => handleChange(e)}>

        {CategoryList?.map((item : CategoryListType) =>{
            return (
                <option  value={item.id} key = {item.id}>
                    {item.name}
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

export default Category