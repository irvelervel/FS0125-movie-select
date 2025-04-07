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

  // componentDidUpdate??
  componentDidUpdate = (prevProps, prevState) => {
    console.log('ENTRO NEL DIDUPDATE!')
    // componentDidUpdate è un metodo di lifecycle (come render, componentDidMount etc.)
    // che viene invocato automaticamente dal componente React...
    // ...ad ogni cambio di props e ad ogni cambio di state!
    // la differenza tra componentDidUpdate e render sta nei PARAMETRI DI COMPONENTDIDUPDATE
    // this.getMovieData()
    //
    // componentDidUpdate viene eseguito subito dopo un UPDATE -> cioè un cambio di props o di state
    // i due parametri che questo metodo riceve rappresentano l'oggetto delle props PRECEDENTI all'update
    // e l'oggetto dello stato PRECEDENTE all'update

    // grazie agli oggetti prevProps e prevState... riuscite a capire COSA ha determinato l'update del componente!

    // io voglio eseguire getMovieData() ogni volta che cambia il titolo della tendina
    // ma NON VOGLIO rieseguirlo quando cambia lo state!!
    if (
      // controllo che sia cambiata la prop "valore"
      this.props.valore !== prevProps.valore
      // con questo capisco se sono entrato nel didUpdate per un cambio di film
      // o se semplicemente ci sono rientrato "per sbaglio" a causa del setState
    ) {
      this.getMovieData()
    }
  }

  render() {
    // visto che render si re-invoca ogni volta che cambiano le props o che cambia
    // lo stato, perchè non mettere getMovieData qui??
    // this.getMovieData()
    // perchè questa cosa genere un LOOP INFINITO! è vero che la fetch verrebbe
    // richiamata ad ogni cambio di tendina (di prop), ma è anche vero che getMovieData
    // effettua un this.setState, e anch'esso è un motivo valido per re-invocare render!

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

// CRONOSTORIA DEL COMPONENTE MOVIECARD
// 1) lo stato con movieDetails viene inizializzato a { }
// 2) primo render: viene disegnata una card vuota, perchè dipende dallo stato
// 3) dopo il primo render, parte componentDidMount: viene lanciata la funzione
// per recuperare i dettagli del film, e una volta finita la fetch viene fatto un setState
// per salvare le info nello stato
// 4) a causa del setState, render() si re-invoca: aggiorna la card e ci mette dentro
// i dettagli di Iron Man (che è il valore di default della prop "valore")
// ...il componente si ferma
// 5) scegliendo un nuovo film dalla tendina, la prop "valore" si aggiorna nel componente
// MovieCard
// 6) render() si reinvoca, ma "valore" non viene utilizzato per creare la card
// quindi non cambia niente
// 7) ma viene lanciato anche componentDidUpdate(), che (come render) si reinvoca
// automaticamente ad ogni cambio di props e di state
// 8) componentDidUpdate rileva che è appena successo un cambio di props, grazie al suo if
// 9) entrando nell'if, causa una nuova invocazione di getMovieData, che recupera
// nuovamente i dettagli del nuovo film. Infine, fa un setState()
// 10) render() si aggiorna e mostra la nuova Card con i nuovi dettagli
// 11) componentDidUpdate si ri-esegue, ma questa volta il suo if non passa: rileva
// che visto che this.props.valore è uguale a prevProps.valore, la sua esecuzione
// non derivava da un cambio di props ma da un cambio di state: NON rilancerà
// quindi la fetch!
// ...il componente si ferma
