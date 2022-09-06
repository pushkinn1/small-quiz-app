import * as React from "react";
import { QuestionCardProps } from ".";
import { SecondaryButton } from "../../../../components/buttons";
import { FlexRow } from "../../../../components/layout";
import { TextInput } from "../../../../components/textInput";
import { QuestionCardStyle } from "./style";

export const QuestionCardText: React.FC<QuestionCardProps> = props => (
    <QuestionCardStyle>
        <div>
            {props.question}
        </div>

        <FlexRow gap={20}>
            <TextInput
                value={props.currentAnswer}
                onChange={(e) => props.onAnswerChange(e.target.value)}
            />

            <SecondaryButton
                onClick={props.onAnswer}
                variant="small"
            >
                {props.currentAnswer == '' ? 'Skip' : 'Answer'}
            </SecondaryButton>
        </FlexRow>

    </QuestionCardStyle>
)