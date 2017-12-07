const firebase = require('firebase')

export const signOut = () => {
  return firebase.auth().signOut()
}

export const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider()
  return firebase.auth().signInWithPopup(provider)
}

export const checkFirebaseLogInStatus = (callback) => {
  firebase.auth().onAuthStateChanged(callback)
}

export function getUserId(){ 
  return firebase.auth().currentUser.uid
}
