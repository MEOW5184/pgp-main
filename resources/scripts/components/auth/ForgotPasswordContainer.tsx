import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import requestPasswordResetEmail from '@/api/auth/requestPasswordResetEmail';
import { httpErrorToHuman } from '@/api/http';
import LoginFormContainer from '@/components/auth/LoginFormContainer';
import { useStoreState } from 'easy-peasy';
import Field from '@/components/elements/Field';
import { Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';
import tw from 'twin.macro';
import Button from '@/components/elements/Button';
import Reaptcha from 'reaptcha';
import useFlash from '@/plugins/useFlash';

interface Values {
    email: string;
}

export default () => {
    const ref = useRef<Reaptcha>(null);
    const [ token, setToken ] = useState('');

    const { clearFlashes, addFlash } = useFlash();
    const { enabled: recaptchaEnabled, siteKey } = useStoreState(state => state.settings.data!.recaptcha);

    useEffect(() => {
        clearFlashes();
    }, []);

    const handleSubmission = ({ email }: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
        clearFlashes();

        // If there is no token in the state yet, request the token and then abort this submit request
        // since it will be re-submitted when the recaptcha data is returned by the component.
        if (recaptchaEnabled && !token) {
            ref.current!.execute().catch(error => {
                console.error(error);

                setSubmitting(false);
                addFlash({ type: 'error', title: 'Error', message: httpErrorToHuman(error) });
            });

            return;
        }

        requestPasswordResetEmail(email, token)
            .then(response => {
                resetForm();
                addFlash({ type: 'success', title: 'Success', message: response });
            })
            .catch(error => {
                console.error(error);
                addFlash({ type: 'error', title: 'Error', message: httpErrorToHuman(error) });
            })
            .then(() => {
                setToken('');
                if (ref.current) ref.current.reset();

                setSubmitting(false);
            });
    };

    return (
    <>
        <Formik
            onSubmit={handleSubmission}
            initialValues={{ email: '' }}
            validationSchema={object().shape({
                email: string().email('A valid email address must be provided to continue.')
                    .required('A valid email address must be provided to continue.'),
            })}
        >
            {({ isSubmitting, setSubmitting, submitForm }) => (
                <LoginFormContainer css={tw`w-full flex`}>
                <div css={tw`w-35 pb-2 flex justify-center`}>
                <h1 className="roboto condensed text24" css={tw`w-full text-white text-2xl text-center`}>[i] Private Game Panel</h1>
                </div>
                <div css={tw`w-35 pb-2 flex justify-center`}>
                <p className="roboto condensed text16" css={tw`w-full text-sm text-center text-red-905`}>Request a password reset for your account</p>
                </div>
                <div css={tw`w-35 pb-3 flex justify-center`}>
                <p className="text14 bold" css={tw`w-full text-xs text-center text-white`}>Enter the email address associated with your accountto receive instructions on how to reset your password.</p>
                </div>
                <div css={tw`w-35 pb-5 flex justify-center`}>
                <p className="text14 bold" css={tw`w-full text-xs text-center text-white`}>Make sure to check your spam box!</p>
                </div>
                    <Field
                        light
                        className="text18"
                        css={tw`h-41 w-35`}
                        placeholder={'> enter your email address...'}
                        label={'[i] Email Address'}
                        name={'email'}
                        type={'email'}
                    />
                    <div css={tw`mt-6`}>
                        <Button
                            type={'submit'}
                            size={'xlarge'}
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                        >
                          <span className="bold condensed text24">[i] SEND EMAIL</span>
                        </Button>
                    </div>
                    {recaptchaEnabled &&
                    <Reaptcha
                        ref={ref}
                        size={'invisible'}
                        sitekey={siteKey || '_invalid_key'}
                        onVerify={response => {
                            setToken(response);
                            submitForm();
                        }}
                        onExpire={() => {
                            setSubmitting(false);
                            setToken('');
                        }}
                    />
                    }
                </LoginFormContainer>
            )}
        </Formik>
      </>
    );
};
