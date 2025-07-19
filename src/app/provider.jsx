
'use client';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import ReduxInitializer from '@/components/ReduxInitializer';

export function ReduxProvider({ children }) {
  return(
    <Provider store={store}>
      <ReduxInitializer />
        {children}
    </Provider>
    ) 
}
