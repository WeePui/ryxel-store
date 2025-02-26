'use client';

import { useActionState, ReactNode } from 'react';
import { logoutAction } from '@libs/actions';
import Spinner from '@components/UI/Spinner';

function SignoutButton({ children }: { children: ReactNode }) {
  const [, action, isPending] = useActionState(logoutAction, undefined);

  if (isPending) return <Spinner />;

  return <form action={action}>{children}</form>;
}

export default SignoutButton;
