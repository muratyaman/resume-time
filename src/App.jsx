import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ResumePage } from './pages/ResumePage';
import { HomePage } from './pages/HomePage';
import { ErrorPage } from './pages/ErrorPage';
import { RegisterPage } from './pages/RegisterPage';
import { UpdatePage } from './pages/UpdatePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'register', element: <RegisterPage />,
      { path: 'update', element: <UpdatePage />,
            <Route path='/' render={() => <DefaultContent history={history} /> }/>
            <Route path='*' render={() => <DefaultContent history={history} /> }/>
    ]
  },
  {
    path: '/resume/:username',
    element: <ResumePage />,
  },
  {
    path: '/cv/:username',
    element: <ResumePage />,
  },
]);

export function App() {
  return (
    <RouterProvider router={router} />
  );
}
