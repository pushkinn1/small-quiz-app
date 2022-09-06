import * as React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import { Header } from "./components/header";
import { Wrapper, Main } from "./components/layout";
import { FontStyles } from "./fonts/fontStyles";
import { GlobalStyle } from "./globalStyle";
import { TestPage } from "./pages/testPage";
import { Home } from "./pages/homePage";
import { ThemeSelection } from "./pages/themeSelection";
import 'normalize-css'

export const App: React.FC = () => (
    <React.StrictMode>

        <FontStyles />

        <GlobalStyle />

        <Router>

            <Wrapper>

                <Header />

                <Main>
                    <Routes>
                        <Route
                            path="/test/:themeId"
                            element={<TestPage />}
                        />
                        <Route
                            path="/theme-selection"
                            element={<ThemeSelection />}
                        />
                        <Route
                            path="/"
                            element={<Home />}
                        />
                    </Routes>
                </Main>

            </Wrapper>

        </Router>

    </React.StrictMode>
)
