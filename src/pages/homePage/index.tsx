import * as React from "react";
import { PropsWithChildren } from "react";
import { H1 } from "../../components/typography";

export const Home: React.FC<PropsWithChildren<{}>> = () => {
    return (
        <div>
            <H1>
                Welcome to test app
            </H1>
        </div>
    )
}
