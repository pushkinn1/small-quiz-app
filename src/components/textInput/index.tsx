import * as React from "react";
import styled from "styled-components";
import { TextInputStyle } from "./style";

export type TextInputProps = {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

export const TextInput: React.FC<TextInputProps> = props => (
    <TextInputStyle {...props} />
)