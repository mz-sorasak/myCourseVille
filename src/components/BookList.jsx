import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'

function BookList() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetchBooks();
    }, [])

    const fetchBooks = async () => {
        await axios.get(`http://localhost:8100/api/book`).then(({data}) => {
            setBooks(data);
        })
    }

    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            return result.isConfirmed
        })

        if (!isConfirm) {
            return;
        }

        await axios.delete(`http://localhost:8100/api/book/${id}`).then(({data}) => {
            Swal.fire({
                icon: 'success',
                text: data.message
            })
            fetchBooks()
        }).catch(({response:{data}}) => {
            Swal.fire({
                text: data.message,
                icon: 'error'
            })
        })
    }
    
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <Link className='btn btn-primary mb-2 float-end' to={"/book/create"}>
                        Create Book
                    </Link>
                </div>
                <div className='col-12'>
                    <div className="card card-body">
                        <div className="table-responsive">
                            <table className='table table-bordered mb-0 text-center'>
                                <thead>
                                    <tr>
                                        <td>Title</td>
                                        <td>Auth</td>
                                        <td>Description</td>
                                        <td>Price</td>
                                        <td>Tag</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.length > 0 ? (
                                        books.map((row, key) => (
                                            <tr key={key}>
                                                <td>{row.title}</td>
                                                <td>{row.auth}</td>
                                                <td>{row.description}</td>
                                                <td>{row.price}</td>
                                                <td>{row.tags}</td>
                                                <td>
                                                    <Link to={`/book/edit/${row.id}`} className="btn btn-success me-2">
                                                        Edit
                                                    </Link>
                                                    <Button variant='danger' onClick={() => deleteProduct(row.id)}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No products found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookList