import * as React from "react";
import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "../buttons";
import { ThemeCardStyle } from "./style";

export type ThemeCardProps = {
    name: string
    link: string
}

export const ThemeCard: React.FC<React.PropsWithChildren<ThemeCardProps>> = props => {
    const navigate = useNavigate()
    return ( 
        <ThemeCardStyle>
            <h2>
                {props.name}
            </h2>
            <SecondaryButton onClick={() =>{
                localStorage.clear()
                navigate(props.link)
            }}>
                Start quiz
            </SecondaryButton>
        </ThemeCardStyle>
    )
}