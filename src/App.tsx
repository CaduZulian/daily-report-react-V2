import { ToastContainer } from 'react-toastify';
import { Navigate, Route, Routes } from 'react-router-dom';

// global styles
import GlobalStyles from './styles/global';

// themes
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

// pages
import { Login, Home, ToClockIn } from './Pages';
import { AuthLayout, DefaultLayout } from './Pages/_Layouts';

// providers
import { FormProvider, DownloadProvider, AuthProvider } from './context';
import { ProtectedRoute } from './routes/ProtectedRoutes';

function App() {
  return (
    <AuthProvider>
      <FormProvider>
        <DownloadProvider>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route
                path='/auth/*'
                element={
                  <ProtectedRoute hasSigned={false}>
                    <AuthLayout>
                      <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='*' element={<Navigate to='/login' />} />
                      </Routes>
                    </AuthLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path='*'
                element={
                  <ProtectedRoute hasSigned={true}>
                    <DefaultLayout>
                      <Routes>
                        <Route path='/home' element={<Home />} />
                        <Route path='/bater-ponto' element={<ToClockIn />} />
                        <Route path='*' element={<Navigate to='/home' />} />
                      </Routes>
                    </DefaultLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>

            <GlobalStyles />
            <ToastContainer theme='colored' icon={false} autoClose={3000} />
          </ThemeProvider>
        </DownloadProvider>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;
