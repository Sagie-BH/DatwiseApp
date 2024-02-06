// withAppLayout.tsx
import React from 'react';
import AppLayout from './AppLayout';

const withAppLayout = (Component: React.ComponentType<any>) => (props: any) => (
  <AppLayout>
    <Component {...props} />
  </AppLayout>
);

export default withAppLayout;
