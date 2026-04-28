import { useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Header from './components/Header'
import Die from './components/Die'
import getRandomNumber from './utils/getRandomNumbers'
import Confetti from 'react-confetti'

export type Die = {
    value: number,
    isHeld: boolean,
    id: string
  }

function App() {
  
  const [dice, setDice] = useState<Die[]>(() => getNewDice())
  
  const isGameWon: boolean = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  function getNewDice(): Die[] {
    return new Array(10).fill(0).map(() => ({
      value: getRandomNumber(),
      isHeld: false,
      id: nanoid()
    }))
  }
  
  const diceContainer = dice.map(die => (<Die key={die.id} value={die.value} isHeld={die.isHeld} hold={() => hold(die.id)}/>))

  const hold = (id: string): void => {
    setDice(prev => prev.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : {...die}))
  }

  const rollDice = (): void => {
    if (!isGameWon) {
      setDice(prev => prev.map(die => !die.isHeld ? {...die, value: getRandomNumber()} : {...die}))
    }
    else {
      setDice(getNewDice())
    }
  }

  return (
    <main>
      {isGameWon && <Confetti />}
      <Header />
      <div className='dice-container'>
        {diceContainer}
      </div>
      <button className='roll-button' onClick={rollDice}>{!isGameWon ? "Roll Dice" : "New Game"}</button>
    </main>
  )
}

export default App
