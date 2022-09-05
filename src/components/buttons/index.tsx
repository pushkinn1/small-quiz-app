import * as React from "react"
import { ButtonVariant, SecondaryButtonStyle } from "./style"

export type SecondaryButtonProps = {
    onClick?: () => void
    variant?: ButtonVariant
}

export const SecondaryButton: React.FC<React.PropsWithChildren<SecondaryButtonProps>> = props => {
    return (
        <SecondaryButtonStyle {...props}>
            {props.children}
        </SecondaryButtonStyle>
    )
}