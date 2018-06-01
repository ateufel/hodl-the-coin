import firebase from 'firebase';
import 'firebase/firestore';
import Config from '../config';

//init firebase/firestore
firebase.initializeApp({
	apiKey: Config.firebaseAPIKey,
	/*authDomain: '### FIREBASE AUTH DOMAIN ###',*/
	projectId: 'hodl-the-coin'
});
const db = firebase.firestore();

/**
 * get users/highscore from database
 */
export const fbGetUsers = async () => {
	let querySnapshot = await db.collection('users-steem').get();
	let userArray = querySnapshot.docs.map((doc) => {
		return {
			...doc.data(),
			id: doc.id
		};
	});
	userArray.sort((a, b) => {
		return b.score - a.score;
	});
	return userArray.slice(0, 10);
};

/**
 * add new highscore to database
 */
export const fbAddScore = async (username, score) => {
	await db.collection('users-steem').add({
		username: username,
		score: score
	});
	return true;
};
