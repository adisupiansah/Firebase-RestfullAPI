import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import axios from 'axios'
import { useAuth } from '../Context/AuthProvider'

const FormComponent = ({ fetchBooks }) => {
  // state id buku
  const [idBuku, setIdBuku] = useState('')
  const [namaBuku, setNamaBuku] = useState('')
  const [pengarang, setPengarang] = useState('')
  const [tahunTerbit, setTahunTerbit] = useState('')
  const { user } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()

    // create data
    const books = {
      idBuku: parseInt(idBuku, 10),
      namaBuku,
      pengarang,
      tahunTerbit: parseInt(tahunTerbit, 10),
      email: user.email
    }
    axios.post('https://dbwebmanajemenbuku-default-rtdb.firebaseio.com/dbmanajemen.json', books)
      .then(() => {
        fetchBooks()
        clearForm()
      })
      .catch((error) => {
        console.error('Error Fetching:', error)
      })
    console.log(books);

  }

  const clearForm = () => {
    setIdBuku('')
    setNamaBuku('')
    setPengarang('')
    setTahunTerbit('')
  }


  return (
    <>
      <div className='d-flex flex-wrap justify-content-center align-items-center vh-100 '>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>id buku</Form.Label>
              <Form.Control type="number" placeholder="id buku" value={idBuku} onChange={(e) => setIdBuku(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>nama buku</Form.Label>
              <Form.Control type="text" placeholder="nama buku" value={namaBuku} onChange={(e) => setNamaBuku(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>pengarang</Form.Label>
              <Form.Control type="text" placeholder="pengarang" value={pengarang} onChange={(e) => setPengarang(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>tahun terbit</Form.Label>
              <Form.Control type="number" placeholder="tahun terbit" value={tahunTerbit} onChange={(e) => setTahunTerbit(e.target.value)} required />
            </Form.Group>
            <div className="d-flex justify-content-center align-items-center">
              <Button variant="primary" type="submit" className='col-6'>
                Submit
              </Button>
            </div>
          </Form>

        </Container>
      </div>
    </>
  )
}

export default FormComponent