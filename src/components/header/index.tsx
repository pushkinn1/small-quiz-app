import * as React from "react";
import { Link } from "react-router-dom";
import { SecondaryButton } from "../buttons";
import { HeaderLogoStyle, HeaderStyle } from "./style";

export const Header = () => (
    <HeaderStyle>
        {/* <HeaderLogo /> */}
        <Link to="/">
            <SecondaryButton>
                Go home
            </SecondaryButton>
        </Link>
        
        <Link to="/theme-selection">
            <SecondaryButton>
                Start testing
            </SecondaryButton>
        </Link>
    </HeaderStyle>
)

const HeaderLogo = () => (
    <HeaderLogoStyle>
        <Link to="/">
            Go home
        </Link>
    </HeaderLogoStyle>
)