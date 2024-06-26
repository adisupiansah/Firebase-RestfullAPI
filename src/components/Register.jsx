import React, { useState } from 'react'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'
import { useAuth } from '../Context/AuthProvider'
import { Link } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { register } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await register(email, password)
        } catch (error) {
            console.error('WOy Register Error', error)
        }
    }


    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Container>
                <h3 className='text-center'>Register</h3>
                <Row>
                    <div className="d-flex justify-content-center align-items-center">
                        <Col md={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Control type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <Form.Control type='password' placeholder='password' className='mt-3' value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <div className="d-flex justify-content-center align-items-center">
                                    <Button className='col-md-4 mt-3' type='submit' variant='primary' size='sm' >Register</Button>
                                    <Link to='/' className='ms-auto text-decoration-none'>Login Now</Link>
                                </div>
                            </Form>
                        </Col>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Register