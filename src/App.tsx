import * as React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import { Header } from "./components/header";
import { Wrapper } from "./components/layout";
import { FontStyles } from "./fonts/fontStyles";
import { Main } from "./components/general/Main";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize-css'
import { ROUTES } from "./utils/routes";

export const App: React.FC = () => (
    <React.StrictMode>

        <FontStyles />

        <Router>

            <Wrapper>

                <Header />

                <Main>
                    <AppRoutes />
                </Main>

            </Wrapper>

        </Router>

    </React.StrictMode>
)

const AppRoutes = () => {
    return (
        <Routes>
            {ROUTES.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                />
            ))}
        </Routes>
    )
}
