import './App.css';

import React, { useEffect, useState } from 'react';

import Solution from './components/Solution';

const App = () => {
  const ref = React.createRef();
  const [show, setShow] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [id, setId] = useState();
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/solution/${id}`)
        .then(x => x.json())
        .then(setSolutions);
    }
  }, [id]);

  const enterHandler = async e => {
    if (e.key === 'Enter') {
      await search();
    }
  };
  const clickHandler = async () => {
    await search();
  };

  const search = async () => {
    const text = ref.current.value;
    text &&
      fetch(`/api/solution?text=${text}`)
        .then(x => x.json())
        .then(x => {
          setShow(true);
          setSymptoms(x);
          setId();
          setSolutions([]);
        });
  };

  return (
    <div className="App">
      <header className="App-header">
        Enter your problem:
        <div className="App-search">
          <input ref={ref} onKeyDown={enterHandler} type="text"></input>
          <button onClick={clickHandler}>Search</button>
        </div>
      </header>
      <main>
        {solutions.length ? (
          <>
            <div>Hope it will helps</div>
            <ul>
              {solutions.map(x => (
                <li key={x.id}>{x.data}</li>
              ))}
            </ul>
          </>
        ) : symptoms.length ? (
          <>
            <div>If it's your symptom, please, click on it</div>
            <ul>
              {symptoms.map(x => (
                <Solution key={x.id} symptom={x} handler={setId}></Solution>
              ))}
            </ul>
          </>
        ) : show ? (
          <div>Sorry, couldn't find anything related, try again</div>
        ) : null}
      </main>
    </div>
  );
};

export default App;
