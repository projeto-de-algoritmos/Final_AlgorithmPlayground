import React, { useState } from 'react';

function App() {
  const [algorithmRendered, setAlgorithmRendered] = useState(false);
  const [choosedAlgorithm, setChoosedAlgorithm] = useState(0);

  const setAlgorithm = (value) => {
    setAlgorithmRendered(true);
    setChoosedAlgorithm(value);
  }

  const renderAlgo = () => {
    switch (choosedAlgorithm) {
      case 1:
        return <h1>1</h1>
      case 2:
        return <h2>2</h2>
      case 3:
        return <h3>3</h3>
      default:
        break;
    }
  }

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection:'column', backgroundColor: '#CCC', justifyContent: 'center',
      alignItems: 'center', width: window.innerWidth - 10, height: window.innerHeight - 20
    }}>
      {!algorithmRendered && (
        <>
          <h2>
            Trabalho final projeto de algoritmos. Escolha qual algoritmo voce deseja visualizar
          </h2>
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'}}>
            <button
              style={{width: 200, height: 50, padding: 15, marginRight: 20}}
              onClick={() => setAlgorithm(1)}
            >
              Algoritmo1
            </button>
            <button
              style={{ width: 200, height: 50, padding: 15, marginRight: 20 }}
              onClick={() => setAlgorithm(2)}
            >
              Algoritmo2
            </button>
            <button
              style={{ width: 200, height: 50, padding: 15, marginRight: 20 }}
              onClick={() => setAlgorithm(3)}
            >
              Algoritmo3
            </button>
          </div>
        </>
      )
      }
      {renderAlgo()}
    </div>
  );
}

export default App;
