import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Facebook from 'expo-facebook';
import firebase from './utils/firebase';

console.disableYellowBox = true;

export default function App() {

  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);

  facebookLogIn = async () => {
    try {
      const appId='1078230662558806';
      await Facebook.initializeAsync(appId);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync(appId, {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
         await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
        setLoggedinStatus(true);
        setUserData(credential);

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  logout = () => {
    setLoggedinStatus(false);
    setUserData(null);
  }

  return (
    isLoggedin ?
      userData ?
        <View style={styles.container}>
          <Text style={{ fontSize: 22, marginVertical: 10 }}>Hello you are logged in to Facebook!</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={this.logout}>
            <Text style={{ color: "#fff" }}>Logout</Text>
          </TouchableOpacity>
        </View> :
        null
      :
      <View style={styles.container}>
        <TouchableOpacity style={styles.loginBtn} onPress={this.facebookLogIn}>
          <Text style={{ color: "#fff" }}>Login to Facebook</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ebee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20
  },
  logoutBtn: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: "absolute",
    bottom: 0
  },
});