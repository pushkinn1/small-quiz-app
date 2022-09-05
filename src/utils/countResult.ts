import { api } from "../services/api";
import { AnswerType } from "../type";
import { getAnswerFromLocalStorage } from "./localStorageUsing";

export const countResult = async (answers: AnswerType[], qIds: number[]) => {
    let result = 0

    let storageAnswers: AnswerType[] = []

    let fullAnswers = answers

    qIds.forEach(id => {
        if (!answers.find(el => el.qId == id)) {
            const storageAnswer = getAnswerFromLocalStorage(id)

            if (storageAnswer)  
                storageAnswers.push({
                    qId: id,
                    answer: storageAnswer
                })
        }
    })

    fullAnswers = answers.concat(storageAnswers)

    for (let answer of fullAnswers) {

        const correctAnwer = (await api.questions.getQuestionById(answer.qId)).answer
    
        if (answer.answer == correctAnwer) {
            result++
        }
    }

    return result
}