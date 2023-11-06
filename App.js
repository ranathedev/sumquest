import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import Game from './components/game'

export default function App() {
  const [key, setKey] = useState(0)
  const [won, setWon] = useState(0)
  const [lost, setLost] = useState(0)

  const lenOfArray = 6
  const initialTime = 15

  return (
    <View style={styles.container}>
      <Game
        key={key}
        lenOfArray={lenOfArray}
        initialTime={initialTime}
        setKey={setKey}
        won={won}
        setWon={setWon}
        lost={lost}
        setLost={setLost}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
})
