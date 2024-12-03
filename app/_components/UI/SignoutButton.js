'use client';

import { useActionState } from 'react';
import { logoutAction } from '@libs/actions';
import Spinner from '@/app/_components/UI/Spinner';

function SignoutButton({ children }) {
  const [, action, isPending] = useActionState(logoutAction, undefined);

  if (isPending) return <Spinner />;

  return <form action={action}>{children}</form>;
}

export default SignoutButton;
