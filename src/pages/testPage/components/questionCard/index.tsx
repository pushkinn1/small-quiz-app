import * as React from "react";
import { ClientQuestionData, QuestionType } from "../../../../type";
import { QuestionCardText } from "./questionCardText";
import { QuestionCardVariants } from "./questionCardVariants";

export type QuestionCardProps = ClientQuestionData & {
    onAnswerChange: (newAnswer: string) => void
    onAnswer: () => void
    currentAnswer: string 
}

export const QuestionCard: React.FC<QuestionCardProps> = props => {

    if (props.type == 'text')
        return <QuestionCardText {...props} />

    return <QuestionCardVariants {...props} />
}