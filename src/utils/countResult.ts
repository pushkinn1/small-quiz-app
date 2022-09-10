import { api } from "../services/api";
import { AnswerType } from "../type";
import { getAnswerFromLocalStorage } from "./localStorageUsing";

export const countResult = async (qIds: number[]) => {
    let result = 0

    let storageAnswers: AnswerType[] = []

    qIds.forEach(id => {
        const storageAnswer = getAnswerFromLocalStorage(id)

        if (storageAnswer)
            storageAnswers.push({
                qId: id,
                answer: storageAnswer
            })
    })

    console.log(storageAnswers, 'st');
    
    

    for (let answer of storageAnswers) {

        const correctAnwer = (await api.questions.getQuestionById(answer.qId)).answer

        if (answer.answer == correctAnwer) {
            result++
        }
    }

    return result
}