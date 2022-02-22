
// Import React in our code
import React, { useState, useEffect } from 'react';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { Button } from 'react-native-paper';
// import { TextInput } from 'react-native-gesture-handler';

const App = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState(null);
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
      <SafeAreaView style={{ flex: 1, }}>

        <ImageBackground style={styles.container}
          source={require('../../assets/images/meric-tuna-CE1OvMrZumQ-unsplash.png')}>
          <Image source={require('../../assets/images/logo.png')} style={{ alignContent: "flex-end", backgroundColor: "white", top: "45%", width: 120, height: 120, borderRadius: 120 / 2, }}></Image>

        </ImageBackground>

        {/* <Text style={styles.titleText}>
            Google Sign In
          </Text> */}
        {/* <GoogleSigninButton
                style={{width: 312, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={_signIn}
              /> */}

        <View style={{ flex: 0.55 }}  >
          <View style={{ marginTop: 45, marginBottom: 20 }} >
            <Text style={styles.titleText}>e-mail</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
            />
          </View>
          <View style={{ marginBottom: 20 }} >
            <Text style={styles.titleText}>password</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="useless placeholder"
              keyboardType="numeric"
            />
          </View>
          <View style={{}} >
            <Text style={styles.titleText2}>log in using</Text>
            {/* <GoogleSigninButton
                style={{width: 312, height: 48}}
               
                onPress={_signIn}
              /> */}
            <View style={{ flexDirection: "row", alignContent: "center", alignSelf: "center" }} >
              <TouchableOpacity onPress={_signIn} style={{ marginRight: 10, marginVertical: 10 }} >
                <Image source={require('../../assets/images/google.png')}
                  style={{ height: 40, width: 40, borderRadius: 40 / 2, borderWidth: 1, borderColor: "#ABAA88", }}></Image>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10, marginVertical: 10 }}>
                <Image source={require('../../assets/images/facebook3.png')}
                  style={{ height: 40, width: 40, borderRadius: 40 / 2, borderWidth: 1, borderColor: "#ABAA88", }}></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.input2}>
            <Text style={{color:"white",fontSize:15}}>SIGN IN</Text>
            </View>

          </View>
        </View>

      </SafeAreaView>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 0.45,
    //  backgroundColor: "red",
    alignItems: 'center',
    justifyContent: 'center',
    //  padding: 10,
  },
  input: {
    height: 45,
    width: "80%",
    margin: 2,
    borderWidth: 2,
    borderColor: "#ABAA88",
    borderRadius: 4,
    padding: 10,
    marginHorizontal: 30,alignSelf:"center"
  },
  input2: {
    height: 45,
    width: "80%",
    margin: 2,
   // borderWidth: 2,
    backgroundColor: "#ABAA88",
    borderRadius: 4,
    padding: 10,
    marginHorizontal: 30,
  alignSelf:"center",justifyContent:"center",alignItems:"center"
  },
  titleText: {
    fontSize: 14,
    //fontWeight: 'bold',
    textAlign: "left",
    // padding: 20,
    color: "#ABAA88",
    marginHorizontal: 40
  },
  titleText2: {
    fontSize: 14,
    //fontWeight: 'bold',
    textAlign: "center",
    // padding: 20,
    color: "#ABAA88",
    marginHorizontal: 30
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
