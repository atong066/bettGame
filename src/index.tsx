
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './components/globalFunctions/globalContext';
import { EventProvider } from './components/globalFunctions/eventContext';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { LoginProvider } from './components/globalFunctions/loginContext';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5,
    },
  },
})


const localStoragePersistor = createWebStoragePersistor({ storage: window.localStorage })
persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
})
root.render(
  <QueryClientProvider client={queryClient} >
    <UserProvider>
      <LoginProvider>
        <EventProvider>
          <App />
        </EventProvider>
      </LoginProvider>
    </UserProvider>
  </QueryClientProvider>
);
