import * as React from "react";
import { Link } from "react-router-dom";
import { useQuestionIds } from "../../../../hooks/useQuestionIds";
import { AnswerType, QuestionType } from "../../../../type";
import { countResult } from "../../../../utils/countResult";
import {
    getAnswerFromLocalStorage, getCurrentQIdFromLocalStorage,
    pushAnswerIntoLocalStorage, pushCurrentQIdToLocalStorage
} from "../../../../utils/localStorageUsing";
import { QuestionCard } from "../questionCard";
import { useBeforeunload } from 'react-beforeunload'
import { SecondaryButton } from "../../../../components/buttons";
import { FlexCol, FlexRow } from "../../../../components/layout";
import { api } from "../../../../services/api";
import { useEffect, useState } from "react";
import { RequestErrorMessage } from "../../../../components/requestErrorMessage";
import { Loading } from "../../../../components/loading";
import { useKeypress } from "../../../../hooks/useKeypress";
import { useQuestions } from "../../../../hooks/useQuestions";

export type TestDisplayProps = {
    themeId: number
}

export const TestDisplay: React.FC<TestDisplayProps> = props => {

    const { questionIds } = useQuestionIds(props.themeId)

    const [testEnded, setTestEnded] = useState(false)

    const [currentAnswer, setCurrentAnswer] = useState<string>('')

    const [result, setResult] = useState<number | undefined>(undefined)

    const { currentQuestion, loading, requestError, answers, goToNextQuestion, goToPrevQuestion, pushAnswer, questionsOver } = useQuestions(props.themeId)

    
    useKeypress('Enter', () => onAnswer())
    
    useBeforeunload((e) => {
        e.returnValue = true
    })
    
    const endTest = async () => {
        const result = await countResult(answers, questionIds)

        setTestEnded(true)
        setResult(result)
        localStorage.clear()
    }

    const onAnswer = () => {
        pushAnswer(currentAnswer)
        goToNextQuestion()
    }

    const onAnswerChange = (newAnswer: string) => {
        pushAnswerIntoLocalStorage(currentQuestion.id, newAnswer)
        setCurrentAnswer(newAnswer)
    }

    const onAnswerClear = () => {
        setCurrentAnswer('')
        pushAnswerIntoLocalStorage(currentQuestion.id, '')
    }

    if (questionsOver) {
        endTest()
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
                            onClick={goToPrevQuestion}
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
                    test ended. your result {result != undefined ? result : 'loading'}
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
