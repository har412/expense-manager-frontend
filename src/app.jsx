/* eslint-disable perfectionist/sort-imports */
import { ToastContainer } from 'react-toastify';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import 'react-toastify/dist/ReactToastify.css';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { Provider } from 'react-redux';
import { store } from './redux/store';


// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <Provider store={store}>
    <ThemeProvider>
      <ToastContainer/>
      <Router />
    </ThemeProvider>
    </Provider>
  );
}
