import styled from 'styled-components/macro';
import tw from 'twin.macro';

const Label = styled.label<{ isLight?: boolean }>`
    ${tw`text-18 block text-xs uppercase text-yellow-915 mb-1 sm:mb-2`};
    ${props => props.isLight && tw`text-18 text-yellow-915`};
`;

export default Label;
