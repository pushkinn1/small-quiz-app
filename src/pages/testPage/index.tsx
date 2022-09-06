import * as React from "react";
import { Link } from "react-router-dom";
import { useQuestionIds } from "../../hooks/useQuestionIds";
import { AnswerType, QuestionType } from "../../type";
import { countResult } from "../../utils/countResult";
import {
    getAnswerFromLocalStorage, getCurrentQIdFromLocalStorage,
    pushAnswerIntoLocalStorage, pushCurrentQIdToLocalStorage
} from "../../utils/localStorageUsing";
import { QuestionCard } from "../../components/questionCard";
import { useBeforeunload } from 'react-beforeunload'
import { SecondaryButton } from "../../components/buttons";
import { FlexCol, FlexRow } from "../../components/layout";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { RequestErrorMessage } from "../../components/requestErrorMessage";
import { Loading } from "../../components/loading";

export type TestDisplayProps = {
    themeId: number
}

export const TestDisplay: React.FC<TestDisplayProps> = props => {

    const { questionIds } = useQuestionIds(props.themeId)

    const [questionNumber, setQuestionNumber] = useState<number | undefined>(undefined)

    const [currentQuestion, setCurrentQuestion] = useState<QuestionType | undefined>(undefined)

    const [testEnded, setTestEnded] = useState(false)

    const [answers, setAnswers] = useState<AnswerType[]>([])

    const [currentAnswer, setCurrentAnswer] = useState<string>('')

    const [result, setResult] = useState<number | undefined>(undefined)

    const [requestError, setRequestError] = useState(false)

    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const checkIfNoQuestionsLeft = () => (questionIds.length && (questionNumber == questionIds.length))

        const endTest = async () => {
            const result = await countResult(answers, questionIds)

            setTestEnded(true)
            setResult(result)
            localStorage.clear()
        }

        const actualizeQuestion = () => {
            if (!questionIds.length)
                return

            if (questionNumber !== undefined)
                return

            const currentQIdFromStorage = getCurrentQIdFromLocalStorage()

            if (currentQIdFromStorage) {
                setQuestionNumber(questionIds.findIndex(el => el == currentQIdFromStorage))
                return
            }

            setQuestionNumber(0)
        }

        const setQuestionAndAnswer = async () => {

            if (!questionIds[questionNumber])
                return

            setLoading(true)

            try {
                const currentQId = questionIds[questionNumber]

                const question = await api.questions.getQuestionById(currentQId)

                if (question) {
                    pushCurrentQIdToLocalStorage(question.id)
                    setCurrentQuestion(question)
                    const dataAnswer = answers.find(answer => answer.qId == question.id)
                    if (dataAnswer) {
                        setCurrentAnswer(dataAnswer.answer)
                        return
                    }

                }

                const storageAnswer = getAnswerFromLocalStorage(getCurrentQIdFromLocalStorage())

                if (storageAnswer) {
                    setCurrentAnswer(storageAnswer)
                    return
                }

                setCurrentAnswer('')
            }

            catch (err) {
                setRequestError(true)
            }

            finally {
                setLoading(false)
            }

        }

        if (checkIfNoQuestionsLeft()) {
            endTest()
            return
        }

        actualizeQuestion()

        setQuestionAndAnswer()

    }, [questionNumber, questionIds])

    useBeforeunload((e) => {
        e.returnValue = true
    })

    const onBackButtonClick = () => {
        if (questionNumber == 0)
            return

        setQuestionNumber(questionNumber - 1)
    }

    const onAnswer = () => {

        if (!answers[questionNumber]) {
            pushAnswerIntoLocalStorage(currentQuestion.id, currentAnswer)
            setAnswers(answers.concat({
                qId: currentQuestion.id,
                answer: currentAnswer
            }))
        }

        else {
            let newAnswers = answers
            newAnswers[questionNumber].answer = currentAnswer
            setAnswers(newAnswers)
        }

        setQuestionNumber(questionNumber + 1)
    }

    const onAnswerChange = (newAnswer: string) => {
        pushAnswerIntoLocalStorage(currentQuestion.id, newAnswer)
        setCurrentAnswer(newAnswer)
    }

    const onAnswerClear = () => {
        setCurrentAnswer('')
        pushAnswerIntoLocalStorage(currentQuestion.id, '')
    }

    if (loading)
        return (
            <Loading />
        )

    if (requestError)
        return (
            <RequestErrorMessage />
        )

    return (
        <FlexCol gap={20}>
            <FlexRow gap={30}>
                {testEnded ||
                    <FlexRow gap={20}>

                        <SecondaryButton
                            onClick={onBackButtonClick}
                            variant="small"
                        >
                            Back
                        </SecondaryButton>

                        {currentAnswer !== '' &&
                            <SecondaryButton
                                variant="small"
                                onClick={onAnswerClear}
                            >
                                Clear answer
                            </SecondaryButton>
                        }
                    </FlexRow>
                }

            </FlexRow>

            {
                currentQuestion && !testEnded &&

                <QuestionCard
                    {...currentQuestion}
                    onAnswerChange={onAnswerChange}
                    onAnswer={onAnswer}
                    currentAnswer={currentAnswer}
                />
            }

            {
                testEnded &&
                <>
                    test ended. your result {result ? result : 'loading'}
                    <Link to='/'>
                        <SecondaryButton variant="small">
                            Go home
                        </SecondaryButton>
                    </Link>
                </>
            }
        </FlexCol>
    )
}
