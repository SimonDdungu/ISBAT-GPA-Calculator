// app/store/Provider.jsx
'use client'; // <-- THIS IS CRITICAL

import { Provider } from 'react-redux';
import { store } from './store'; // Assuming your store is exported from here

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}