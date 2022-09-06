import * as React from "react";
import { Home } from "../pages/homePage";
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