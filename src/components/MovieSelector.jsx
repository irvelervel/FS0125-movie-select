import { Form } from 'react-bootstrap'

const MovieSelector = function (props) {
  // questo componente renderizzerà il tag <select> per scegliere il film
  //   questo componente NON utilizza uno stato locale per il proprio input controllato
  // ma dialoga "in remoto" con lo stato di App

  // MovieSelector riceve 2 props:
  // "valore" -> che rappresenta il valore dello stato di App, utile per il value dell'input
  // "cambiaValore" -> metodo scritto in App che utilizza il suo setState per cambiare con
  // una nuova scelta lo stato di App

  return (
    <Form.Select
      aria-label="Movie title selector"
      value={props.valore}
      onChange={(e) => {
        props.cambiaValore(e.target.value)
      }}
    >
      <option>Iron Man</option>
      <option>The Hulk</option>
      <option>Thor</option>
      <option>Captain America</option>
      <option>Avengers</option>
    </Form.Select>
  )
}

export default MovieSelector
