import tw from 'twin.macro';
import { createGlobalStyle } from 'styled-components/macro';

export default createGlobalStyle`
    body {
        ${tw`font-sans bg-neutral-800 text-neutral-200`};
        letter-spacing: 0.015em;
    }

    h1, h2, h3, h4, h5, h6 {
        ${tw`font-medium tracking-normal font-header`};
    }

    p {
        ${tw`text-neutral-200 leading-snug font-sans`};
    }

    form {
        ${tw`m-0`};
    }

    textarea, select, input, button, button:focus, button:focus-visible {
        ${tw`outline-none`};
    }

    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield !important;
    }

    /* Scroll Bar Style */
    ::-webkit-scrollbar {
        background: none;
        width: 16px;
        height: 16px;
    }

    ::-webkit-scrollbar-thumb {
        border: solid 0 rgb(0 0 0 / 0%);
        border-right-width: 4px;
        border-left-width: 4px;
        -webkit-border-radius: 9px 4px;
        -webkit-box-shadow: inset 0 0 0 1px hsl(211, 10%, 53%), inset 0 0 0 4px hsl(209deg 18% 30%);
    }

    ::-webkit-scrollbar-track-piece {
        margin: 4px 0;
    }

    ::-webkit-scrollbar-thumb:horizontal {
        border-right-width: 0;
        border-left-width: 0;
        border-top-width: 4px;
        border-bottom-width: 4px;
        -webkit-border-radius: 4px 9px;
    }

    ::-webkit-scrollbar-thumb:hover {
        -webkit-box-shadow:
        inset 0 0 0 1px hsl(212, 92%, 43%),
        inset 0 0 0 4px hsl(212, 92%, 43%);
    }

    ::-webkit-scrollbar-corner {
        background: transparent;
    }

    input:focus,
    select:focus,
    textarea:focus,
    button:focus {
        box-shadow: none !important;
        -moz-box-shadow: none !important;
        -webkit-box-shadow: none !important;
    }

    @media only screen and (max-width: 768px) {
      .LoginButton {
      	width: 50% !important;
      	}
      }

      audio, canvas, embed, iframe, img, object, svg, video {
        display: inline;
      }

      .text24 {
      	font-size: 24px;
      }

      .text16 {
      	font-size: 16px;
      }

      .codensed {
      	font-stretch: condensed !important;
      }

      .bold {
        font-weight: bold;
      }

      .roboto {
      	font-family: roboto;
      }

      .text14 {
      	font-size: 14px;
      }
`;
