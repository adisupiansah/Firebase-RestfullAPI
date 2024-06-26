import React, { useState } from 'react'
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../Context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import '../App.css'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login, loginWithGoogle, loginWithFacebook } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(email, password)
            navigate('/app')
        } catch (error) {
            setError('Username / password anda salah, login kembali')
        }
    }

    const handleGoogleLogin= async () => {
        try {
            await loginWithGoogle()
            navigate('/app')
        } catch {
            setError('login dengan google gagal, silahkan login kembli')
        }
    }

    const handleFacebookLogin = async () => {
        try {
            await loginWithFacebook()
            navigate('/app')
        } catch (error) {
            console.error(error)
            setError('login dengan facebook gagal, silahkan login kembli')
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Container>
                {error && <Alert variant="danger">{error}</Alert>}
                <h3 className='text-center'>Login</h3>
                <Row>
                    <div className="d-flex justify-content-center align-items-center">
                        <Col md={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
                                <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className='mt-3' />
                                <div className="d-flex justify-content-center align-items-center">
                                    <Link to='/register' className='text-decoration-none'>Register</Link>
                                    <Button variant='primary' type='submit' size='sm' className='mt-3 col-md-4 ms-auto'>Login</Button>
                                </div>

                                <div className="login-with d-flex justify-content-center align-items-center flex-column">
                                    <span>Login with</span>
                                    <div className="social-login col-12 d-flex justify-content-center align-items-center gap-2">
                                        <Button className='login-google col-md-6' onClick={handleGoogleLogin}><FcGoogle className='icon-google'/> Account Google</Button>

                                        <Button className='login-google col-md-6' onClick={handleFacebookLogin}><FaFacebookF className='icon-google bg-primary text-white rounded-circle p-1 fs-4'/> Account Facebook</Button>
                                     
                                    </div>
            
                                </div>
                            </Form>
                        </Col>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Login