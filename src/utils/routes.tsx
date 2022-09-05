import * as React from "react";
import { Home } from "../components/screens/Home";
import { TestPage } from "../components/testThemeRouter";
import { ThemeSelection } from "../components/themeSelection";
import { RouteConfType } from "../type";

export const ROUTES: RouteConfType[] = [
    {
        path: '/test/:themeId',
        element: <TestPage />
    },
    {
        path: '/theme-selection',
        element: <ThemeSelection />
    },
    {
        path: '/',
        element: <Home />
    }
]