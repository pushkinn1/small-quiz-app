import * as React from "react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { ThemeDataType } from "../../type";
import { FlexRow } from "../../components/layout";
import { Loading } from "../../components/loading";
import { RequestErrorMessage } from "../../components/requestErrorMessage";
import { ThemeCard } from "./components/themeCard";

export const ThemeSelection: React.FC = () => {
    const [themes, setThemes] = useState<ThemeDataType[]>([])
    const [requestError, setRequestError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchThemes = async () => {
            setLoading(true)
            try {
                const themes = await api.questions.getThemes()

                setThemes(themes)
            }

            catch (err) {
                setRequestError(true)
            }

            finally {
                setLoading(false)
            }
        }

        fetchThemes()

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
        <FlexRow
            gap={30}
        >
            {themes.map(
                theme => (
                    <ThemeCard
                        key={theme.name}
                        name={theme.name}
                        link={`/test/${theme.id}`}
                    />
                )
            )}
        </FlexRow>
    )
}