import styled, { css } from 'styled-components/macro';
import tw from 'twin.macro';

export interface Props {
    isLight?: boolean;
    hasError?: boolean;
}

const light = css<Props>`
    ${tw`bg-neutral-915 border-t-0 border-r-0 border-l-0 border-b-2 border-transparent text-white`};
    &:focus { ${tw`border-yellow-915`} }

    &:disabled {
        ${tw`bg-neutral-915 border-white`};
    }
`;

const checkboxStyle = css<Props>`
    ${tw`bg-neutral-500 cursor-pointer appearance-none inline-block align-middle select-none flex-shrink-0 w-4 h-4 text-white border border-neutral-300 rounded-sm`};
    color-adjust: exact;
    background-origin: border-box;
    transition: all 75ms linear, box-shadow 25ms linear;

    &:checked {
      ${tw`bg-yellow-915 border-transparent bg-no-repeat bg-center`};
      background-size: 100% 100%;
  }

    &:focus {
        ${tw`outline-none border-yellow-915`};
        box-shadow: 0 0 0 1px rgba(253, 236, 186, 45%);
    }
`;

const inputStyle = css<Props>`
    // Reset to normal styling.
    resize: none;
    ${tw`appearance-none outline-none w-full min-w-0`};
    ${tw`p-3 border-t-0 border-r-0 border-l-0 border-b-2 rounded text-sm transition-all duration-150`};
    ${tw`bg-neutral-915 border-transparent hover:border-yellow-915 text-white shadow-none focus:ring-0`};

    & + .input-help {
        ${tw`mt-1 text-xs`};
        ${props => props.hasError ? tw`text-red-200` : tw`text-white`};
    }

    &:required, &:invalid {
        ${tw`shadow-none`};
    }

    &:not(:disabled):not(:read-only):focus {
        ${tw`shadow-md border-yellow-915`};
        ${props => props.hasError && tw`border-red-300 ring-red-200`};
    }

    &:disabled {
        ${tw`opacity-75`};
    }

    ${props => props.isLight && light};
    ${props => props.hasError && tw`text-red-100 border-red-400 hover:border-red-300`};
`;

const Input = styled.input<Props>`
    &:not([type="checkbox"]):not([type="radio"]) {
        ${inputStyle};
    }

    &[type="checkbox"], &[type="radio"] {
        ${checkboxStyle};

        &[type="radio"] {
            ${tw`rounded-full`};
        }
    }
`;
const Textarea = styled.textarea<Props>`${inputStyle}`;

export { Textarea };
export default Input;
