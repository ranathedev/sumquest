import React from 'react'

import { StyleSheet, Text, View } from 'react-native'

const TargetNum = ({ status, number }) => {
  return (
    <View style={[styles.container, styles[`status${status}`]]}>
      <Text style={styles.text}>{number}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 75,
    borderRadius: 10,
  },
  text: {
    color: '#000',
    fontSize: 50,
  },
  statusPlaying: {
    backgroundColor: '#e6e6e6',
  },
  statusWon: {
    backgroundColor: 'green',
  },
  statusLost: {
    backgroundColor: 'red',
  },
})

export default TargetNum
