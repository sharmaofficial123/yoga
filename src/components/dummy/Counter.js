// React Native Counter Example using Hooks!
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch,useSelector } from 'react-redux'
import {types} from '../../action/actionType'
const Counter = () => {
  
  const dispatch = useDispatch()
    const onBtnClick = () => {
      
        dispatch({
            type: types.INCREASE_COUNTER,
            payload: 'asdf',
            
        })
    }
    const [count, setCount] = useState(0);
  return (    
  <View style={styles.container}>     
   <Text>You clicked {count} times</Text>     
    <Button       onPress={() => onBtnClick()}        title="Click me!"      />   
     </View>  );};
// React Native Styles
const styles = StyleSheet.create(
  { 
     container: {    flex: 1,    justifyContent: 'center',    alignItems: 'center'  }});
export default Counter;