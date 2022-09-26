import { createGlobalStyle } from "styled-components"
import InterReg from "./fontFiles/Inter-Regular.woff"
import InterBlack from "./fontFiles/Inter-Black.woff"
import InterSB from "./fontFiles/Inter-SemiBold.woff"
import InterB from "./fontFiles/Inter-Bold.woff"
import InterEB from "./fontFiles/Inter-ExtraBold.woff"
import InterM from "./fontFiles/Inter-Medium.woff"

export const FontStyles = createGlobalStyle`

    @font-face {
        font-family: 'Inter';
        src: 
            url(${InterReg}) format('woff');
        font-weight: normal;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'Inter';
        src:
            url(${InterBlack}) format('woff');
        font-weight: 900;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'Inter';
        src: 
            url(${InterSB}) format('woff');
        font-weight: 600;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'Inter';
        src:  
            url(${InterB}) format('woff');
        font-weight: bold;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'Inter';
        src: 
            url(${InterEB}) format('woff');
        font-weight: 800;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'Inter';
        src: 
            url(${InterM}) format('woff');
        font-weight: 500;
        font-style: normal;
    }
    
    * {
        font-family: Inter;
        color: white;
    }
    

`