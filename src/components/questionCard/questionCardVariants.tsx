import * as RadioGroup from "@radix-ui/react-radio-group";
import * as React from "react";
import { QuestionCardProps } from ".";
import { SecondaryButton } from "../buttons";
import { RadioIndicator, RadioItem } from "../radio/";
import { QuestionCardStyle } from "./style";

export const QuestionCardVariants: React.FC<QuestionCardProps> = props => (
    <QuestionCardStyle>
        <div>
            {props.question}
        </div>
        <SelectOneVariantCard
            currentAnswer={props.currentAnswer?.toString()}
            onSelect={props.onAnswerChange}
            options={props.options}
        />
        <SecondaryButton
            onClick={props.onAnswer}
            variant="small"
        >
            {props.currentAnswer == '' ? 'Skip' : 'Answer'}
        </SecondaryButton>
    </QuestionCardStyle>
)

const SelectOneVariantCard: React.FC<{ options: string[], onSelect: (newAnswer: string) => void, currentAnswer: string }> = props => {
    return (
        <RadioGroup.Root
            onValueChange={(newValue) => props.onSelect(newValue)}
            value={props.currentAnswer}
        >
            {props.options.map((option, idx) => (
                <div key={idx}>
    
                    <RadioItem value={option} id={idx.toString()}>
                        <RadioIndicator />
                    </RadioItem>
    
                    <label htmlFor={idx.toString()}>{option}</label>
    
                    <br />
                </div>
            ))}
        </RadioGroup.Root>
    )
}