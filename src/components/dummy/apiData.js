import React, { useEffect, useState } from 'react';
import { FlatList, Text, View,TouchableOpacity,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux'
import {types} from '../../action/actionType'
export default apiData = () => {
  const apilistdata = useSelector((state) => state.counter?.displayapi)
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(apilistdata,"this is the data rendered from apilistdata");
  
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
  
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity style={{  padding: 24 ,marginHorizontal:10}} onPress={() => navigation.navigate('Counter')}>
      <Text >Signup</Text>
      
    </TouchableOpacity>
       
       <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
         
          <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>Articles:</Text>
          <FlatList
            data={apilistdata}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Text>{item.id + '. ' + item.title}</Text>
            )}
          />
           
        </View>
      
    </View>
  );
};