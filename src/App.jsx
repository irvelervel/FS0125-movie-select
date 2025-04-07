import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNavbar from './components/MyNavbar'
import MovieSelector from './components/MovieSelector'
import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// l'informazione su quale sia il film da caricare deve venire condivisa
// SIA tra MovieSelector (perchè contiene un input controllato, il campo <select>)
// SIA tra MovieCard (perchè deve recuperare quel film da OMDB e mostrarne i dettagli)
// ...per questa ragione lo stato NON PUÒ VIVERE in nessuno dei due, perchè NON sono
// in una relazione padre-figlio
// bisogna ELEVARE lo stato nel componente padre più prossimo di entrambi (App)

class App extends Component {
  state = {
    // qui verrà salvato in ogni momento il valore del dropdown in MovieSelector
    movieTitle: 'Iron Man',
  }

  handleChange = (nuovoValore) => {
    // nuovoValore è il valore appena scelto nella tendina dropdown
    // "Avengers", "Hulk", "Thor" etc.
    this.setState({
      movieTitle: nuovoValore,
    })
  }

  render() {
    return (
      <>
        <MyNavbar />
        <Container>
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={8} lg={6}>
              <MovieSelector
                valore={this.state.movieTitle} // valore corrente dello state
                cambiaValore={this.handleChange} // metodo per cambiare lo state
              />
              {/* <MovieCard /> */}
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default App
