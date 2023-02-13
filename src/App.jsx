import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar } from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import BookList from './components/BookList'
import CreateBook from './components/CreateBook'
import EditBook from './components/EditBook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar bg="primary" >
        <Container>
          <Link to={"/"} className="navbar-brand text-white">
            CRUD App
          </Link>
        </Container>
      </Navbar>
      <Container className='mt-4'>
        <Row>
          <Col>
            <Routes>
              <Route exact path="/" element={<BookList />} />
              <Route path="/book/create" element={<CreateBook />} />
              <Route path="/book/edit/:id" element={<EditBook />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  )
}

export default App
