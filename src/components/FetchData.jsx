import { Card, Container, Col, Row, Button} from 'react-bootstrap'
import { FaTrash } from "react-icons/fa";
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider';

const FetchData = ({ books, fetchBooks }) => {
    const { user } = useAuth();

    const handleDelete = (id) => {
        axios.delete(`https://dbwebmanajemenbuku-default-rtdb.firebaseio.com/dbmanajemen/${id}.json`)
            .then(() => {
                fetchBooks()
                console.log('Delete sukses');
            })
            .catch((error) => {
                console.error('Error deleting:', error)
            })
    }

    if (!books || books.length === 0) {
        return <p className='text-center fs-2 text-danger mb-5'>DATA BUKU TIDAK ADA 😁</p>;
    }

    return (
        <div>
            <Container>
               
                <Row className='mb-5'>
                    {books.map((item) => (
                        <Col md={4} className='mt-2' key={item.id}>
                            <Card>
                                <Card.Body>
                                    <Card.Title className='fw-bold'>id buku: {item.idBuku}</Card.Title>
                                    <Card.Text className='d-flex flex-column mx-3'>
                                        <span>{item.namaBuku}</span>
                                        <span>{item.pengarang}</span>
                                        <span>{item.tahunTerbit}</span>
                                        <span>di upload oleh: {item.email}</span>
                                        {item.email === user.email && (
                                            <Button className='mt-2' variant='danger' size='sm' type='button' onClick={() => handleDelete(item.id)}>
                                                <FaTrash />
                                            </Button>
                                        )}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default FetchData
