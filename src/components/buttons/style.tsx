import styled from "styled-components";

export type ButtonVariant = 'regular' | 'small'

export const SecondaryButtonStyle = styled.button<{variant?: ButtonVariant}>`
    ${props => {
        switch (props.variant) {
            case ('small'): return SecondaryButtonSmall
            default: return SecondaryButtonRegular
        }
    }}
    text-align: center;
    box-shadow: 0px 8px 17px 0px #1D026B17;
    color: #A07FFF;
    border: none;
    border-radius: 50px;
    font-family: Inter;
    font-weight: bold;
`

const SecondaryButtonSmall = `
    padding: 10px;
`

const SecondaryButtonRegular = `
    padding: 20px 27px;
`