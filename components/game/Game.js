import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, Pressable, SafeAreaView } from 'react-native'
import shuffle from 'lodash.shuffle'

import TargetNum from '../target-num'
import OptionNum from '../option-num'

const Game = ({
  lenOfArray,
  initialTime,
  setKey,
  won,
  lost,
  setWon,
  setLost,
}) => {
  const [gameStatus, setGameStatus] = useState('Playing')
  const [remainingTime, setRemainingTime] = useState(initialTime)
  const [slctdIndex, setSlctdIndex] = useState([])
  const [targetNum, setTargetNum] = useState()
  const [optionNums, setOptionNums] = useState([])
  const [sumOfSlctd, setSumOfSlct] = useState(0)

  const intervalIdRef = useRef(null)

  useEffect(() => {
    const randomNumbers = []
    for (let i = 0; i < lenOfArray; i++) {
      randomNumbers.push(1 + Math.floor(20 * Math.random()))
    }

    const randomNumber = randomNumbers
      .slice(0, lenOfArray - 2)
      .reduce((acc, curr) => acc + curr, 0)

    setTargetNum(randomNumber)
    setOptionNums(shuffle(randomNumbers))

    intervalIdRef.current = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime > 1) {
          return prevTime - 1
        } else {
          clearInterval(intervalIdRef.current)
          return 0
        }
      })
    }, 1000)

    return () => {
      clearInterval(intervalIdRef.current)
    }
  }, [])

  useEffect(() => {
    if (remainingTime === 0) {
      setGameStatus('Lost')
      setLost(prevState => prevState + 1)
    }
  }, [remainingTime])

  useEffect(() => {
    if (sumOfSlctd > targetNum) {
      setGameStatus('Lost')
      setLost(prevState => prevState + 1)
      clearInterval(intervalIdRef.current)
    } else if (sumOfSlctd === targetNum) {
      setGameStatus('Won')
      setWon(prevState => prevState + 1)
      clearInterval(intervalIdRef.current)
    }
  }, [sumOfSlctd])

  const addSelectedNum = num => {
    setSlctdIndex(prevState => [...prevState, num])
    setSumOfSlct(sumOfSlctd + optionNums[num])
  }

  const isDisabled = num => {
    if (slctdIndex.indexOf(num) !== -1) {
      return true
    }
    return false
  }

  return (
    <SafeAreaView style={styles.container}>
      <TargetNum status={gameStatus} number={targetNum} />
      <View style={styles.optionNums}>
        {optionNums.map((num, i) => (
          <OptionNum
            key={i}
            id={i}
            disabled={
              isDisabled(i) || gameStatus === 'Lost' || gameStatus === 'Won'
            }
            number={num}
            onPress={addSelectedNum}
          />
        ))}
      </View>
      <View style={styles.btnContainer}>
        {gameStatus !== 'Playing' && (
          <>
            <Text style={styles.status}>You've {gameStatus}</Text>
            <Pressable
              style={styles.btn}
              onLongPress={() => console.log('Long Press Detected...')}
              onPress={() => setKey(prevState => prevState + 1)}
            >
              <Text style={styles.btnText}>Play again</Text>
            </Pressable>
          </>
        )}
        {gameStatus === 'Playing' && (
          <Text style={styles.remainingTime}>Time : {remainingTime}s</Text>
        )}
      </View>
      <View style={styles.result}>
        <Text style={styles.resultText}>Lost: {lost}</Text>
        <Text style={styles.resultText}>Won: {won}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  optionNums: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 50,
  },
  btnContainer: {
    alignItems: 'center',
    position: 'relative',
    height: 150,
    gap: 10,
  },
  status: {
    fontSize: 24,
  },
  btn: {
    width: 150,
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    fontSize: 25,
    color: '#fff',
  },
  remainingTime: {
    fontSize: 20,
    position: 'absolute',
    bottom: 10,
  },
  result: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  resultText: {
    fontSize: 16,
  },
})

export default Game
