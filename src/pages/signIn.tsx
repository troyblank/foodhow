import React from 'react';
import { type User } from '../types';
import { AuthProvider } from '../contexts';
import { Head, SignIn } from '../components';

export const SignInPage = ({ user }: { user: User }) => (
  <AuthProvider user={user}>
    <React.Fragment>
      <Head />
      <SignIn />
    </React.Fragment>
  </AuthProvider>
);

export default SignInPage;
