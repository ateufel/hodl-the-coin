import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
	apiKey: 'AIzaSyCj5bYfUdM9FxAmMX2AzZiK14I-Q8v12N4',
	/*authDomain: '### FIREBASE AUTH DOMAIN ###',*/
	projectId: 'hodl-the-coin'
});
const db = firebase.firestore();

export const fbGetUsers = () => {
	let querySnapshot = db.collection('users-steem').get().limit(1);

	return querySnapshot.docs.map((doc) => {
		return {
			...doc.data(),
			id: doc.id
		};
	});
	/*db.collection('users-steem').get().limit(1).then((querySnapshot) => {
		let userArray = [];
		querySnapshot.forEach((doc) => {
			//console.log(`${doc.id} => ${doc.data()}`);
			userArray.push(doc.data());
		});
		userArray.sort((a, b) => {
			return b.score - a.score;
		});
		this.showUsers(userArray);
	});*/
};

export const fbAddScore = async (username, score) => {
	db.collection('users-steem').add({
		username: username,
		score: score
	});
};
