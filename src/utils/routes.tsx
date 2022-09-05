import * as React from "react";
import { Home } from "../components/screens/Home";
import { TestThemeRouter } from "../components/testThemeRouter";
import { ThemeSelection } from "../components/themeSelection";
import { RouteConfType } from "../type";

export const ROUTES: RouteConfType[] = [
    {
        path: '/test/:themeId',
        element: <TestThemeRouter />
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