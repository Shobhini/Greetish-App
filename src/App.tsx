import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './routes/ProtectedRoute'
import Login from './pages/Login'
import Setup from './pages/Setup'
import Home from './pages/Home'
import Preview from './pages/Preview'

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/setup"
          element={
            <ProtectedRoute>
              <Setup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preview/:id"
          element={
            <ProtectedRoute>
              <Preview />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  )
}
