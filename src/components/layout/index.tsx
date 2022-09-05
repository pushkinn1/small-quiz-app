import styled from "styled-components";

export const FlexRow = styled.div<{gap?: number}>`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: ${props => props.gap}px;
`

export const FlexCol = styled.div<{gap?: number}>`
    display: flex;
    flex-direction: column;
    gap: ${props => props.gap}px;
`
export const Wrapper = styled.div`
    max-width: 1341px;
    margin: 0 auto;
    padding: 1em;
`