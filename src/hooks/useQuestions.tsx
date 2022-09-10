import { useEffect, useState } from "react"
import { api } from "../services/api"
import { AnswerType, QuestionType } from "../type"
import { getCurrentQIdFromLocalStorage, pushAnswerIntoLocalStorage, pushCurrentQIdToLocalStorage } from "../utils/localStorageUsing"
import { useQuestionIds } from "./useQuestionIds"

export const useQuestions = (themeId: number) => {
    const [questionNumber, setQuestionNumber] = useState<number | null>(null)
    const { questionIds } = useQuestionIds(themeId)
    const [currentQuestion, setCurrentQuestion] = useState<QuestionType | undefined>(undefined)
    const [requestError, setRequestError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [answers, setAnswers] = useState<AnswerType[]>([])
    const [questionsOver, setQuestionsOver] = useState(false)

    useEffect(() => {
        const actualizeQuestion = () => {
            if (!questionIds.length)
                return

            if (questionNumber !== null)
                return

            const currentQIdFromStorage = getCurrentQIdFromLocalStorage()

            if (currentQIdFromStorage) {
                setQuestionNumber(questionIds.findIndex(el => el == currentQIdFromStorage))
                return
            }

            setQuestionNumber(0)
        }

        const setQuestion = async () => {

            if (!questionIds[questionNumber])
                return

            setLoading(true)

            try {
                const currentQId = questionIds[questionNumber]

                const question = await api.questions.getQuestionById(currentQId)

                if (question) {
                    pushCurrentQIdToLocalStorage(question.id)
                    setCurrentQuestion(question)
                }
            }

            catch (err) {
                setRequestError(true)
            }

            finally {
                setLoading(false)
            }

        }

        if (questionNumber == questionIds.length) {
            setQuestionsOver(true)
            return
        }

        actualizeQuestion()

        setQuestion()

    }, [questionIds, questionNumber])

    const goToNextQuestion = () => {
        setQuestionNumber(questionNumber + 1)
    }

    const goToPrevQuestion = () => {
        if (questionNumber > 0)
            setQuestionNumber(questionNumber - 1)
    }

    const pushAnswer = (answer: string) => {
        if (!answers[questionNumber])
            pushAnswerIntoLocalStorage(currentQuestion.id, answer)

        setAnswers(prevAnswers => {
            return ([
                ...prevAnswers,
                {
                    qId: questionIds[questionNumber],
                    answer: answer
                }
            ])
        })
    }

    return {
        currentQuestion,
        loading,
        requestError,
        answers,
        goToNextQuestion,
        goToPrevQuestion,
        pushAnswer,
        questionsOver
    }
}