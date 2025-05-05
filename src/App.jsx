import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((responseData) => setData(responseData?.results || []))
      .catch((error) => console.error("Error:", error));
  }, []);

  // Filtrar los resultados según el texto de búsqueda
  let resultados = data;

  if (busqueda.length >= 2) {
    resultados = data.filter((unelemento) =>
      unelemento.name.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar personaje..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      {resultados.map((personaje) => (
        <div key={personaje.id}>
          <p>{personaje.name}</p>
        </div>
      ))}
    </>
  );
}

export default App;
