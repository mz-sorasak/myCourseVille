import React , { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


function CreateBook() {
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [auth, setAuth] = useState("")
    const [price, setPrice] = useState()
    const [tags, setTags] = useState("")
    const [validationError, setValidationError] = useState({})

    const createBook = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', title);
        formData.append('auth', auth);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('tags', tags);

        await axios.post(`http://localhost:8100/api/book`, formData).then(({data}) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            navigate("/");
        }).catch(({response}) => {
            if (response.status === 422) {
                setValidationError(response.data.errors);
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                })
            }
        })
    }

    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create Book</h4>
                            <hr />
                            <div className="form-wrapper">
                                {Object.keys(validationError).length > 0 && (
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="alert alert-danger">
                                                <ul className="mb-0">
                                                    {Object.entries(validationError).map(([key, value]) => (
                                                        <li key={key}>{value}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <Form onSubmit={createBook}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Name">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control type="text" value={title} onChange={(event) => {
                                                    setTitle(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Auth">
                                                <Form.Label>Auth</Form.Label>
                                                <Form.Control type="text" value={auth} onChange={(event) => {
                                                    setAuth(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>      
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Description">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control as="textarea" rows={3} value={description} onChange={(event) => {
                                                    setDescription(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>      
                                    <Row>
                                        <Col>
                                        <Form.Group controlId="Price">
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control type="number" value={price} onChange={(event) => {
                                                    setPrice(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row> 
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="tags">
                                                <Form.Label>tags</Form.Label>
                                                <Form.Control type="text" value={tags} onChange={(event) => {
                                                    setTags(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>    
                                    <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                                        Save
                                    </Button>         
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBook