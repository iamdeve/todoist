import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
	apiKey: 'AIzaSyBMgKz3YdWEgV50zE1wwtpjckga-M-Zqrg',
	authDomain: 'todoist-clone-21616.firebaseapp.com',
	databaseURL: 'https://todoist-clone-21616.firebaseio.com',
	projectId: 'todoist-clone-21616',
	storageBucket: 'todoist-clone-21616.appspot.com',
	messagingSenderId: '805075527913',
	appId: '1:805075527913:web:36c639ecc5b4846d102878',
	measurementId: 'G-KCK2LENF2D',
});

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { firebaseConfig as firebase, auth, provider };
