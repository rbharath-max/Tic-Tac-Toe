import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Square from './Components/Square'
import { Patterns } from './Patterns'
import Confetti from 'react-confetti'

function App() {
  const [board, setBoard] = useState(["","","","","","","","",""])
  const [player, setPlayer] = useState("O")
  const [result, setResult] = useState({
    winner: "none",
    state:"none"
  })
  useEffect(() => {
    checkWin()
    checkTie()
    if (player == 'X'){
      setPlayer("O")
    }else {
      setPlayer("X")
    }
  },[board])

  useEffect(() => {
    if(result.state != "none"){
      alert(`Game over Player ${result.winner} is the winner`)
      
    }
  },[result])

  function chooseSquare(square) {
    setBoard(prevBoard => prevBoard.map((value, idx) => {
      if (idx == square && value == ""){
        return player
      }
      return value
    })
   )
   
  }

  function checkWin(){
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]]
      if (firstPlayer == "") return
      let foundWinningPattern = true
      currPattern.forEach((idx) => {
        if(board[idx] != firstPlayer){
          foundWinningPattern = false
        }
      })
      if (foundWinningPattern){
        setResult({winner: player, state:"won"})

      }
    })
  }

  function checkTie(){
    let filled = true
    board.forEach((square) => {
      if(square == ""){
        filled = false
      }
    })
    if(filled){
      setResult({
        winner : "No one",
        state: "Tie"
      })
    }
    
  }
  function restart(){
    setBoard(["","","","","","","","",""])
    setPlayer("O")

  }

  return (
    <>
    <div className='btn' onClick={() => {restart()}}>
    <h1>Restart</h1>
    </div>
    
    
    <div className='app'>
      <div className='board'>
        <div className='row'>
          <Square value={board[0]} onSquare={ () =>chooseSquare(0)}  />
          <Square value={board[1]} onSquare={ () =>chooseSquare(1)}  />
          <Square value={board[2]} onSquare={ () =>chooseSquare(2)}  />
        </div>
        <div className='row'>
        <Square value={board[3]} onSquare={ () =>chooseSquare(3)}  />
          <Square value={board[4]} onSquare={ () =>chooseSquare(4)}  />
          <Square value={board[5]} onSquare={ () =>chooseSquare(5)}  />
        </div>
        <div className='row'>
        <Square value={board[6]} onSquare={ () =>chooseSquare(6)}  />
          <Square value={board[7]} onSquare={ () =>chooseSquare(7)}  />
          <Square value={board[8]} onSquare={ () =>chooseSquare(8)}  />
        </div>
      </div>
    </div>
    
     
    </>
  )
}

export default App
