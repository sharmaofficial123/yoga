import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { useNavigation } from '@react-navigation/native';

export default function signup() {
    const navigation = useNavigation();
    console.log("this is secongs screen")
  return (
    <View style={styles.container}>
    <Text style={styles.logo}>SIGNUP</Text>
    <View style={styles.inputView} >
      <TextInput  
        style={styles.inputText}
        placeholder="Email..." 
        placeholderTextColor="#003f5c"
        />
    </View>
    <View style={styles.inputView} >
      <TextInput  
        secureTextEntry
        style={styles.inputText}
        placeholder="Password..." 
        placeholderTextColor="#003f5c"
        />
    </View>
    <TouchableOpacity>
      <Text style={styles.forgot}>Forgot Password?</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('login')}>
      <Text style={styles.loginText}>LOGIN</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('apiData')}>
      <Text style={styles.loginText}>Signup</Text>
    </TouchableOpacity>


  </View>


      
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#003f5c',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
      fontWeight:"bold",
      fontSize:50,
      color:"#fb5b5a",
      marginBottom:40,
      fontFamily:'Shizuru-Regular'
    },
    inputView:{
      width:"80%",
      backgroundColor:"#465881",
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:"white"
    },
    forgot:{
      color:"white",
      fontSize:11
    },
    loginBtn:{
      width:"80%",
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"white"
    }
  });
