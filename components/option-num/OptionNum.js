import React from 'react'

import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const OptionNum = ({ number, id, disabled, onPress }) => {
  const handlePress = () => {
    if (!disabled) onPress(id)
  }
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled]}
      onPress={handlePress}
    >
      <Text style={styles.text}>{number}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    width: 125,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 70,
  },
  disabled: {
    opacity: 0.3,
  },
  text: {
    fontSize: 40,
  },
})

export default OptionNum
