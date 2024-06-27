import Form from './components/Form'
import FetchData from './components/FetchData'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { AuthProvider, useAuth } from './Context/AuthProvider'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import NavigasiBar from './components/NavigasiBar'

const App = () => {
  const [books, setBooks] = useState([])

  const fetchBooks = () => {
    axios.get('https://dbwebmanajemenbuku-default-rtdb.firebaseio.com/dbmanajemen.json')
      .then((response) => {
        const data = response.data;
        if (data) {
          const booksArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setBooks(booksArray);
        }
      })
      .catch((error) => {
        console.error('Error Fetching:', error)
      })
  }
  useEffect(() => {
    fetchBooks()
  }, [])

  // hah jika tidak ada user tendang ke login, jika ada user dan web di refresh pertahankan path /app
  const RequireAuth = ({ children }) => {
    const { user } = useAuth()
    const location = useLocation()
    if (!user) {
      return <Navigate to='/login' state={{from: location}} replace />
    }
    return children
  }


  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <RequireAuth>
                <>
                  <NavigasiBar/>
                  <Form fetchBooks={fetchBooks} />
                  <FetchData books={books} fetchBooks={fetchBooks} />
                </>

              </RequireAuth>
            } />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App