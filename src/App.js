
import './App.css';
import Card from './Card';
import Modal from './Modal';
import animals from './animals';
import { useState, useLayoutEffect, useRef, useEffect, useCallback } from 'react';

const array = [...animals, ...animals, ...animals, ...animals]
shuffleArray(array)

function App() {
  const removed = useRef([])
  let timerId = useRef();
  let timeOutId = useRef();
  const [modalContent,setModalContent] = useState("Match cards with the same picture on their back to win the game")
  const [timer, setTimer] = useState(0);
  const [showModal, setShowModal] = useState(true)
  const [selected, setSelected] = useState([])
  const closeModal = () => {
    setShowModal(false)

  }
  const handleChoice = (index) => {
    if (selected.length < 2) {
      if (selected.includes(index)) setSelected(prev => prev.filter(value => value !== index))
      else {
        setSelected(prev => [...prev, index])
      }
    }
  }
  useCallback(() => {
    timerId.current = setInterval(() => {
      setTimer(prev => prev + 1)
    }, 1000)
    return ()=>{
      setTimer(0)
      clearInterval(timerId.current)
    }
  }, [])


  useEffect(() => {
    if (selected.length === 2) {
      if (array[selected[0]].name === array[selected[1]].name) {
        removed.current = [...removed.current, ...selected]
      }
      timeOutId.current = setTimeout(() => {
        setSelected([])
      }, 1200)
    }
    if (removed.current.length === array.length) {
      setShowModal(true)
      clearInterval(timerId)
    }
    return ()=>{
      clearInterval(timerId.current)
      clearTimeout(timeOutId.current)
    }
  }, [selected])

  const restartGame = () => {
    setTimer(0)
    setShowModal(false)
    timerId = setInterval(() => {
      setTimer(prev => prev + 1)
    }, 1000)
    removed.current = [];
    shuffleArray(array);
  }
  return (
    <div className="App">
      <h1>Memory game</h1>
      <p>Time playing: {Math.round(timer/60)} minutes {timer%60} seconds</p>
      <div className='board'>
        {array.map((animal, index) => (
          <Card
            key={index}
            id={index}
            {...animal}
            isRemoved={removed.current.includes(index) ? true : false}
            selected={selected.includes(index) ? true : false}
            handleChoice={handleChoice} handleFlipBack
          />
        ))}
      </div>
      {showModal && <Modal title="" closeModal={closeModal} restartHandle={restartGame} content={removed?modalContent:`You did it in ${timer} seconds`} />}
    </div>
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default App;
