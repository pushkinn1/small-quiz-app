import * as RadioGroup from "@radix-ui/react-radio-group";
import styled from 'styled-components'

export const RadioIndicator = styled(RadioGroup.Indicator)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
    &::after {
        background: black;
        content: "";
        display: block;
        width: 11px;
        height: 11px;
        border-radius: 50%;
    }
`

export const RadioItem = styled(RadioGroup.Item)`
    all: unset;
    background-color: white;
    border: 1px solid grey;
    width: 25px;
    height: 25px;
    border-radius: 100%;
`