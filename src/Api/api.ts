
import axios from "axios"

export async function getQuizData( CategoryId: string ,questionCount: number , Diffuculty: string){
    return await axios.get(`https://opentdb.com/api.php?amount=${questionCount}&category=${CategoryId}&difficulty=${Diffuculty}`).then(res => res.data)
}

export async function getTotalQuestionsCount(CategoryId : string){
    return await axios.get(`https://opentdb.com/api_count.php?category=${CategoryId}`).then(res => res.data.category_question_count)
}


export async function getCategoriesList(){
    return await  axios.get(`https://opentdb.com/api_category.php`).then(res => res.data)
}

