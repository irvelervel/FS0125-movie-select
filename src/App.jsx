import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNavbar from './components/MyNavbar'
import MovieSelector from './components/MovieSelector'
import MovieCard from './components/MovieCard'
import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// l'informazione su quale sia il film da caricare deve venire condivisa
// SIA tra MovieSelector (perchè contiene un input controllato, il campo <select>)
// SIA tra MovieCard (perchè deve recuperare quel film da OMDB e mostrarne i dettagli)
// ...per questa ragione lo stato NON PUÒ VIVERE in nessuno dei due, perchè NON sono
// in una relazione padre-figlio
// bisogna ELEVARE lo stato nel componente padre più prossimo di entrambi (App)

const App = function () {
  // state = {
  //   // qui verrà salvato in ogni momento il valore del dropdown in MovieSelector
  //   movieTitle: 'Iron Man',
  // }

  const [movieTitle, setMovieTitle] = useState('Iron Man')

  const handleChange = (nuovoValore) => {
    // nuovoValore è il valore appena scelto nella tendina dropdown
    // "Avengers", "Hulk", "Thor" etc.
    // this.setState({
    //   movieTitle: nuovoValore, // da 'Iron Man' es. a 'Thor'
    // })
    setMovieTitle(nuovoValore)
  }

  return (
    <>
      <MyNavbar />
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={8} lg={6}>
            <MovieSelector
              valore={movieTitle} // valore corrente dello state
              cambiaValore={handleChange} // metodo per cambiare lo state
            />
            <MovieCard valore={movieTitle} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
