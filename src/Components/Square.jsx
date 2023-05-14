import React from 'react'
import "../App.css"
function Square({value, onSquare}) {
  return (
    <div className='square' onClick={onSquare}>{value}</div>
  )
}

export default Square