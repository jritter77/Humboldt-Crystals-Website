import React from 'react';
import axios from 'axios';
import {Container, Row, Col, Button, Navbar, Nav, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


const API_ENDPOINT = "http://localhost:8080/";

function App() {

  const [articles, setArticles] = React.useState([]);

  const getArticles = async () => {
    const result = await axios.get(API_ENDPOINT);
    setArticles(result.data.response);
  }

  const makePost = async () => {
    await axios.post(API_ENDPOINT, {title: "more stuff", description: "this is stuff", price: 0, image: "none"});
    getArticles();
  }




  const arrangeArticles = articles => {
    const rows = [];
    let row = [];
    articles.map((article, index) => {
      row.push(article);
      if ((index+1) % 3 === 0) {
        rows.push(row);
        row = [];
      }
    })
    rows.push(row);
    return (
      rows.map((row) => <Row>{row.map(article => <Col><Article id={article.id} title={article.title} /></Col>)}</Row>)
    );
  }




  React.useEffect(() => {
    getArticles();
  }, []);

  

  return (
    <Container>
      
        <Navbar bg="light" expand="lg" >        
        <Navbar.Brand>Humboldt Crystals</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>Home</Nav.Link>
          </Nav>
          <Form inline onSubmit={"handleSubmit"}>
            <Form.Control type="text" placeholder="Search" onChange={"e => setSearchTerm(e.target.value)"} />
            <Button variant="outline-secondary" onClick={"handleSubmit"}>Search</Button>
          </Form>
          </Navbar.Collapse>
        </Navbar>
      
      
        <Button onClick={makePost}>New Post</Button>

        {arrangeArticles(articles)}
      
    </Container>
  );
}



const Article = ({id, title, index}) => (
  <div>id: {id}  title: {title}</div>
)


export default App;
