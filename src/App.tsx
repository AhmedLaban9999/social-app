
import { createHashRouter, RouterProvider, Navigate } from 'react-router'
import Layout from './components/layout/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import AuthContextProvider from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Feed from './pages/Feed';
import PostDetails from './pages/PostDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AllSuggestions from './pages/AllSuggestions'
import { Offline } from "react-detect-offline";
import UserProfile from './pages/UserProfile'
import Notifications from './pages/Notifications';
import ChangePassword from './pages/ChangePassword'

// Fix #2: QueryClient created once at module scope — never re-created on re-render
const queryClient = new QueryClient()

const routes = createHashRouter([
  {path: '', element: <Layout />, children: [
    {index: true, element: <Register />},
    {path: 'Login', element: <Login />},
    {path: 'Suggestions', element: <ProtectedRoute><AllSuggestions /></ProtectedRoute>},
    {path: 'Profile', element: <ProtectedRoute><Profile /></ProtectedRoute>},
    {path: 'PostsDetails/:id', element: <ProtectedRoute><PostDetails /></ProtectedRoute>},
    {path: 'ChangePassword', element: <ProtectedRoute><ChangePassword /></ProtectedRoute>},
    {path: 'user/:id', element: <ProtectedRoute><UserProfile /></ProtectedRoute>},
    {path: 'Feed', element: <ProtectedRoute><Feed /></ProtectedRoute>},
    {path: 'Notifications', element: <ProtectedRoute><Notifications /></ProtectedRoute>},
    {path: '*', element: <Navigate to="/Feed" replace />},
  ]},
])

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={routes} />
        </AuthContextProvider>
        {/* Fix #6: DevTools only included in development builds */}
        {import.meta.env.DEV && <ReactQueryDevtools />}
      </QueryClientProvider>
      <Offline>
        <p className='fixed bottom-0 right-0 bg-red-600 text-white p-2'>
          You're offline right now. Check your connection.
        </p>
      </Offline>
    </>
  )
}


