import React, { useEffect, useState } from 'react';
import { FlatList, Text, View,TouchableOpacity,StyleSheet } from 'react-native';
import { useDispatch,useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import {types} from '../../action/actionType'
const home = () => {
  const apilistdata = useSelector((state) => state.counter?.displayapi)
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const getApiData =()=>{
    dispatch({
      type: types.GET_API,
      payload: "id",      
  })
  }
    useEffect(() => {
   getApiData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>home screen!</Text>
       <FlatList
            data={apilistdata}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Text  style={{color:"red",fontSize: 20,}}>{item.id + '. ' + item.title}</Text>
            )}
          />
    </View>
  )
} 
export default home;