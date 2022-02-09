// import { NavigationContainer } from '@react-navigation/native';
// import React from 'react';
// import {StyleSheet, Text, View, TextInput, TouchableOpacity ,Button} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { GoogleSignin ,GoogleSigninButton} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
// const HelloWorld = () => {
//   GoogleSignin.configure({
//     webClientId: '521787059313-g0se91oq639q0v4igtvm6ran0vasvaj7.apps.googleusercontent.com',
//   });
//   const navigation = useNavigation();
//   const signInWithGoogle = async () =>{
//     const { idToken } = await GoogleSignin.signIn();
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//     const user_sign_in =  auth().signInWithCredential(googleCredential);
//     user_sign_in.then(re=>{
//       console.log(re);  
//     })
//   } 
//   return (
//     <View style={styles.container}>
//     <Text style={styles.logo}>LOGIN</Text>
//     <View style={styles.inputView} >
//       <TextInput  
//         style={styles.inputText}
//         placeholder="Email..." 
//         placeholderTextColor="#003f5c"
//         />
//     </View>
//     <View style={styles.inputView} >
//       <TextInput  
//         secureTextEntry
//         style={styles.inputText}
//         placeholder="Password..." 
//         placeholderTextColor="#003f5c"
//         />
//     </View>
//     <TouchableOpacity>
//       <Text style={styles.forgot}>Forgot Password?</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.loginBtn}>
//       <Text style={styles.loginText}>LOGIN</Text>
//     </TouchableOpacity>
//     <TouchableOpacity>
//       <Text style={styles.loginText}>Signup</Text>
//     </TouchableOpacity>
//     <GoogleSigninButton
//       title="Google Sign-In"
//       onPress={signInWithGoogle } 
//     />

//   </View>

//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#003f5c',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo:{
//     fontWeight:"bold",
//     fontSize:50,
//     color:"#fb5b5a",
//     marginBottom:40,
//     fontFamily:'Shizuru-Regular'

//   },
//   inputView:{
//     width:"80%",
//     backgroundColor:"#465881",
//     borderRadius:25,
//     height:50,
//     marginBottom:20,
//     justifyContent:"center",
//     padding:20
//   },
//   inputText:{
//     height:50,
//     color:"white"
//   },
//   forgot:{
//     color:"white",
//     fontSize:11
//   },
//   loginBtn:{
//     width:"80%",
//     backgroundColor:"#fb5b5a",
//     borderRadius:25,
//     height:50,
//     alignItems:"center",
//     justifyContent:"center",
//     marginTop:40,
//     marginBottom:10
//   },
//   loginText:{
//     color:"white"
//   }
// });
// export default HelloWorld;


// Example of Google Sign In in React Native Android and iOS App
// https://aboutreact.com/example-of-google-sign-in-in-react-native/

// Import React in our code
import React, {useState, useEffect} from 'react';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,  
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Import Google Signin
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from 'react-native-google-signin';
import { GoogleSignin ,GoogleSigninButton,statusCodes} from '@react-native-google-signin/google-signin';

const App = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId: '521787059313-g0se91oq639q0v4igtvm6ran0vasvaj7.apps.googleusercontent.com',
    });
    // Check if user is already signed in
    _isSignedIn();
  }, []);

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
     // alert('User is already signed in');
      // Set User Info if user is already signed in
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  };

  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      setUserInfo(userInfo);
      navigation.navigate('MyTabs', { userInfo: userInfo, loginwith: 'google' }) //deleted
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (
          error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
        ) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };

  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null); 
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };

  if (gettingLoginStatus) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.titleText}>
            Google Sign In
          </Text>
          <GoogleSigninButton
                style={{width: 312, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={_signIn}
              />
          {/* <View style={styles.container}>
            {userInfo !== null ? (
              <>
                <Image
                  source={{uri: userInfo.user.photo}}
                  style={styles.imageStyle}
                />
                <Text style={styles.text}>
                  Name: {userInfo.user.name}
                </Text>
                <Text style={styles.text}>
                  Email: {userInfo.user.email}
                </Text>
              
              </>
            ) : (
              <GoogleSigninButton
                style={{width: 312, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={_signIn}
              />
            )}
          </View> */}
       
        </View>
      
      </SafeAreaView>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
});
