import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { H1 } from "../../components/typography";
import { Loading } from "../../components/loading";
import { RequestErrorMessage } from "../../components/requestErrorMessage";
import { TestDisplay } from "./components/testDisplay";

export const TestPage: React.FC = () => {
    const { themeId } = useParams()

    const [themeName, setThemeName] = useState('')

    const [loading, setLoading] = useState(false)

    const [requestError, setRequestError] = useState(false)

    useEffect(() => {
        const getThemeName = async () => {
            setLoading(true)
            try {
                const themeName = await api.questions.getThemeNameById(+themeId)
                setThemeName(themeName)
            }
            catch (err) {
                setRequestError(true)
            }
            finally {
                setLoading(false)
            }
        }

        getThemeName()
    }, [])

    if (loading)
        return (
            <Loading />
        )


    if (requestError)
        return (
            <RequestErrorMessage />
        )

    return (
        <div>
            <H1>
                Test theme: {themeName}
            </H1>
            <TestDisplay
                themeId={+themeId}
            />
        </div>
    )
}