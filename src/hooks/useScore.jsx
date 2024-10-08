import { useState, useEffect, useCallback } from 'react'
import { TURNS } from '../constants'
import { clearScoreFromStorage, getItemFromStorage, saveScoreToStorage } from '../storage'

export function useScore ({ winner }) {
  const scoreFromStorage = getItemFromStorage({
    key: 'score',
    fallback: 0
  })
  const [oWins, setOWins] = useState(() => scoreFromStorage && scoreFromStorage.oWins)
  const [xWins, setXWins] = useState(() => scoreFromStorage && scoreFromStorage.xWins)
  const [draws, setDraws] = useState(() => scoreFromStorage && scoreFromStorage.draws)

  const resetScore = useCallback(() => {
    clearScoreFromStorage()
    setOWins(0)
    setXWins(0)
    setDraws(0)
  }, [])

  useEffect(() => {
    if (winner !== null) {
      if (winner === TURNS.X) setXWins(xWins + 1)
      else if (winner === TURNS.O) setOWins(oWins + 1)
      else setDraws(draws + 1)
    }
  }, [winner])

  useEffect(() => {
    saveScoreToStorage({
      score: {
        oWins,
        xWins,
        draws
      }
    })
  }, [oWins, xWins, draws])

  return { oWins, xWins, draws, resetScore }
}
