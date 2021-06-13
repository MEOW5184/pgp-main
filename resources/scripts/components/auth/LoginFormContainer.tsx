import React, { forwardRef } from 'react';
import { Form } from 'formik';
import styled from 'styled-components/macro';
import { breakpoint } from '@/theme';
import FlashMessageRender from '@/components/FlashMessageRender';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
  title?: string;
}

const Container = styled.div`
    ${breakpoint('sm')`
        ${tw`w-4/5 mx-auto`}
    `};

    ${breakpoint('md')`
        ${tw`p-10`}
    `};

    ${breakpoint('lg')`
        ${tw`w-3/5`}
    `};

    ${breakpoint('xl')`
        ${tw`w-full`}
        max-width: 700px;
    `};
`;

export default forwardRef<HTMLFormElement, Props>(({ title, ...props }, ref) => (
  <Container css={tw`mt-16`}>
    <FlashMessageRender css={tw`mb-2 px-1`} />
    <Form {...props} ref={ref}>
      <div css={tw`md:flex w-full bg-transparent rounded-lg p-6 mx-1`}>
        <div css={tw`flex-1`}>
          {props.children}
        </div>
      </div>
    </Form>
    <p css={tw`text-center text-neutral-500 text-xs`}>
      {location.pathname.startsWith('/auth/login') &&
        <Link
          to={'/auth/password'}
          css={tw`no-underline text-white hover:text-neutral-300`}
        >
          <span className="text14">[i] Click here if you forgot your password :/</span>
            </Link>
      }
      {location.pathname.startsWith('/auth/password') &&
        <Link
          to={'/auth/login'}
          css={tw`no-underline text-white hover:text-neutral-300`}
        >
        <span className="text14">[i] Click here to return back to the login page</span>
              </Link>
      }
    </p>
    <div css={tw`flex justify-center w-full`}>
      <img src="https://media.discordapp.net/attachments/596792232313487360/853498688185565184/unknown.png" />
    </div>
    <p css={tw`text-center text-neutral-500 text-xs mt-4`}>
      <p className="text12" css={tw`no-underline text-neutral-500`}>
        © 2021 Game Hosting - Private Game Panel - Pterodactyl Software
          </p>
    </p>
  </Container>
));
