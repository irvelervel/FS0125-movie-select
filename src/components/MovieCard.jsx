// MovieCard recupererà i dettagli con cui riempire la card (poster, anno, id etc.)
// tramite una chiamata alle API di OMDB.
// Poichè devo fare una chiamata e poichè dovrò salvare i dati ricevuti da qualche parte...
// ...dovrò salvare queste informazioni dentro lo stato del componente!
// Concentro questa parte di logica in MovieCard (e non in App) perchè NON prevedo
// di dover condividere queste informazioni con altri componenti che non siano
// nella discendenza di MovieCard

import { Component } from 'react'
import { Card } from 'react-bootstrap'

class MovieCard extends Component {
  state = {
    movieDetails: {}, // stato iniziale
  }

  // scriviamo la funzione che si occuperà di fare la chiamata GET a OMDBApi
  getMovieData = () => {
    // "valore" è una prop che trasporta sempre il valore scelto nella tendina!
    fetch('http://www.omdbapi.com/?apikey=24ad60e9&s=' + this.props.valore)
      .then((response) => {
        if (response.ok) {
          // i dati sono arrivati!
          // però li devo recuperare
          return response.json()
        } else {
          throw new Error('chiamata non riuscita')
        }
      })
      .then((data) => {
        console.log('DATA', data.Search[0]) // il primo risultato della ricerca
        // ora che abbiamo recuperato i dati, per poterli mostrare nella card
        // dobbiamo sempre passare attraverso il "ponte di collegamento": lo state
        this.setState({
          movieDetails: data.Search[0], // da oggetto vuoto -> primo risultato di ricerca
        })
      })
      .catch((err) => {
        console.log('ERRORE NEL RECUPERO FILM', err)
      })
  }

  componentDidMount = () => {
    // viene eseguito una volta sola, al termine del primo render!
    this.getMovieData()
  }

  //   componentDidUpdate??

  render() {
    return (
      <Card className="mt-2">
        <Card.Img variant="top" src={this.state.movieDetails.Poster} />
        <Card.Body className="text-center">
          <Card.Title>{this.state.movieDetails.Title}</Card.Title>
          <Card.Text>
            {this.state.movieDetails.Year} - {this.state.movieDetails.Type}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default MovieCard
