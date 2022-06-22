import 'reset-css'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

:root {


  --wsr-color-D10: #000624;
    --wsr-color-D20: #333853;
    --wsr-color-D30: #595D70;
    --wsr-color-D40: #868AA5;
    --wsr-color-D50: #ACAFC4;
    --wsr-color-D55: #CFD1DC;
    --wsr-color-D60: #DFE5EB;
    --wsr-color-D70: #ECEFF3;
    --wsr-color-D80: #FFFFFF;
    --wsr-color-B00: #084EBD;
    --wsr-color-B05: #0F62E6;
    --wsr-color-B10: #116DFF;
    --wsr-color-B20: #5999FF;
    --wsr-color-B30: #A8CAFF;
    --wsr-color-B40: #D6E6FE;
    --wsr-color-B50: #E7F0FF;
    --wsr-color-B60: #F4F7FF;
    --wsr-color-R00: #B81206;
    --wsr-color-R05: #D0180B;
    --wsr-color-R10: #E62214;
    --wsr-color-R20: #FF6D63;
    --wsr-color-R30: #F69891;
    --wsr-color-R40: #FBD0CD;
    --wsr-color-R50: #FDE3E1;
    --wsr-color-R60: #FDECEB;
    --wsr-color-P00: #7416A5;
    --wsr-color-P10: #9A27D5;
    --wsr-color-P20: #C161F0;
    --wsr-color-P30: #CF8CF1;
    --wsr-color-P40: #E3C3F4;
    --wsr-color-P50: #F1E0F9;
    --wsr-color-P60: #F7EDFC;
    --wsr-color-G00: #1D8649;
    --wsr-color-G05: #229954;
    --wsr-color-G10: #25A55A;
    --wsr-color-G20: #51B77B;
    --wsr-color-G30: #87CEA5;
    --wsr-color-G40: #C8E8D6;
    --wsr-color-G50: #E1F4EB;
    --wsr-color-G60: #E9F6EE;
    --wsr-color-Y00: #D59900;
    --wsr-color-Y05: #E7A600;
    --wsr-color-Y10: #FFB700;
    --wsr-color-Y20: #FFC23D;
    --wsr-color-Y30: #FFD16E;
    --wsr-color-Y40: #FFE2A5;
    --wsr-color-Y50: #FFF0D1;
    --wsr-color-Y60: #FFF6E5;
    --wsr-color-O00: #DF4D00;
    --wsr-color-O10: #FE620F;
    --wsr-color-O20: #FF7D38;
    --wsr-color-F00: #A6D0FF;
    --wsr-color-A1: #1C92EF;
    --wsr-color-A2: #CC17EE;
    --wsr-color-A3: #17B0E2;
    --wsr-color-A4: #D04091;
    --wsr-color-A5: #FDB10C;
    --wsr-color-A6: #3D9FA1;
    --wsr-color-B1: #FF66C5;
    --wsr-color-B2: #FF9F41;
    --wsr-color-B3: #F9677A;
    --wsr-color-B4: #1550AC;
    --wsr-color-C1: #54CE91;
    --wsr-color-C2: #1989E5;
    --wsr-color-C3: #64B4F6;
    --wsr-color-C4: #FF9290;
    --wsr-color-D10-03: rgba(0, 6, 36, 0.03);
    --wsr-color-D10-05: rgba(0, 6, 36, 0.05);
    --wsr-color-D10-06: rgba(0, 6, 36, 0.06);
    --wsr-color-D10-10: rgba(0, 6, 36, 0.10);
    --wsr-color-D10-12: rgba(0, 6, 36, 0.12);
    --wsr-color-D10-18: rgba(0, 6, 36, 0.18);
    --wsr-color-D10-20: rgba(0, 6, 36, 0.20);
    --wsr-color-D10-24: rgba(0, 6, 36, 0.24);
    --wsr-color-D10-30: rgba(0, 6, 36, 0.30);
    --wsr-color-D10-36: rgba(0, 6, 36, 0.36);
    --wsr-color-D10-42: rgba(0, 6, 36, 0.42);
    --wsr-color-D10-66: rgba(0, 6, 36, 0.66);
    --wsr-color-D10-90: rgba(0, 6, 36, 0.90);
    --wsr-color-D10-96: rgba(0, 6, 36, 0.96);
    --wsr-color-D20-48: rgba(51, 56, 83, 0.48);
    --wsr-color-D20-54: rgba(51, 56, 83, 0.54);
    --wsr-color-D20-60: rgba(51, 56, 83, 0.60);
    --wsr-color-D40-20: rgba(134, 138, 165, 0.20);
    --wsr-color-D80-10: rgba(255, 255, 255, 0.10);
    --wsr-color-D80-20: rgba(255, 255, 255, 0.20);
    --wsr-color-D80-30: rgba(255, 255, 255, 0.30);
    --wsr-color-D80-48: rgba(255, 255, 255, 0.48);
    --wsr-color-D80-60: rgba(255, 255, 255, 0.60);
    --wsr-color-D80-70: rgba(255, 255, 255, 0.70);
    --wsr-color-B00-24: rgba(8, 78, 189, 0.24);
    --wsr-color-B00-42: rgba(8, 78, 189, 0.42);
    --wsr-color-B00-48: rgba(8, 78, 189, 0.48);

  }
*,
*::after,
*::before {
  box-sizing: border-box;
}

html {
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  margin-left: calc(100vw - 100%);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: Madefor;
}
body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  line-height: 1.75;
  font-family: Madefor;
}

h1, h2, h3, h4, h5 {
  margin: 3rem 0 1.38rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  line-height: 1.3;
}

h1 {
  margin-top: 0;
  font-size: 11.089rem;
}

h2 {font-size: 6.854rem;}

h3 {font-size: 4.236rem;}

h4 {font-size: 2.618rem;}

h5 {font-size: 1.618rem;}

small, .text_small {font-size: 0.618rem;}
a {
  text-decoration: none;
}
button {
  text-decoration: none;
}

.mantine-Select-dropdown {
  padding: 0;
  margin: -5px 0 0 0;
  border-radius: 8px;
}

.mantine-Select-input {
  border-color: #c1e4fe;
  &:focus {
    border-color: #3899ec;
	box-shadow: 0 0 0 3px var(--wsr-color-F00, #AADBFC)
  }
}

.mantine-Select-item {
  &:hover {
    background: #eaf7ff;
  }
  &:active {
    background: #eaf7ff;
  }
  &:focus {
    background: #eaf7ff;
  }
  &:focus-within {
    background: #eaf7ff;
  }
}

.mantine-Select-selected {
  color: white;
  background: #3899ec;
  :hover {
    color: white;
    background: #3899ec;
  }
}


.mantine-Button-subtle {
  padding: 0;
  margin: 0;
  border: none;


  :hover {
    background: transparent;
    border: none;
    text-decoration: underline;
  }
}

.mantine-TextInput-error {
  font-size: 12px;
}
.mantine-Button-outline{

  :disabled {
        background: white !important;
        color: #afb8bf !important;
        border: 1px solid #afb8bf !important;
    }


:hover {
          color: white;
          background: #4EB7F5;
          border-color: #4EB7F5;
        }
    }


  .mantine-TextInput-defaultVariant {
      border-radius:  6px;
      border-color: #c1e4fe;

  &:focus {
    border-color: #3899ec;
	box-shadow: 0 0 0 3px var(--wsr-color-F00, #AADBFC)
    }
  }


  .mantine-TextInput-defaultVariant.mantine-TextInput-invalid {
    border-color: red ;
    color: #162D3D;
  }


.mantine-Input-defaultVariant {
  border-radius:  6px;
  border-color: #c1e4fe;
  &:focus {
    border-color: #3899ec;
	box-shadow: 0 0 0 3px var(--wsr-color-F00, #AADBFC)
  }
}
`

export default GlobalStyles
