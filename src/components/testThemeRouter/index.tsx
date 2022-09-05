import * as React from "react";
import { useParams } from "react-router-dom";
import { TestPage } from "../screens/testPage";

export const TestThemeRouter: React.FC = () => {
    const { themeId } = useParams()

    return <TestPage themeId={+themeId} />
}