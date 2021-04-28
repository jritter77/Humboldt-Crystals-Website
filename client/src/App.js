import React from 'react';
import axios from 'axios';
import {Container, Row, Col, Button, Navbar, Nav, Form, Card} from 'react-bootstrap';
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
      
        <img src="https://github.com/jritter77/images-test/blob/main/donut_circle.png?raw=true"/>
      
        <Button onClick={makePost}>New Post</Button>

        {arrangeArticles(articles)}
      
    </Container>
  );
}



const Article = ({id, title, description, price, image}) => (
  <Card style={{ width: '18rem' }} style={{margin: "32px"}}>
  <Card.Img variant="top" src="image" />
  <Card.Body>
    <Card.Title>{title}</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
  </Card>
)


export default App;
