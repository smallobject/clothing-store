import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDZB5xX2Jq1PgCzRiulO1Njz6k0-GgDgSc',
  authDomain: 'crwn-db-333bf.firebaseapp.com',
  projectId: 'crwn-db-333bf',
  storageBucket: 'crwn-db-333bf.appspot.com',
  messagingSenderId: '967200534997',
  appId: '1:967200534997:web:9290ce31617ec905d6cd5c',
  measurementId: 'G-Z12KDCG58W',
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const createUserProfileDocument = async (userAuth, additonalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAd = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAd,
        ...additonalData,
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
};

export const getCurrectUser = () => {
  return new Promise((resolve, reject) => {
    const unsub = auth.onAuthStateChanged((userAuth) => {
      unsub();
      resolve(userAuth);
    }, reject);
  });
};

// export const addCollectionAndDocuments = async (
//   collectionKey,
//   objectsToAdd
// ) => {
//   const collectionRef = firestore.collection(collectionKey);

//   const batch = firestore.batch();
//   objectsToAdd.forEach((obj) => {
//     const newDocRef = collectionRef.doc();
//     batch.set(newDocRef, obj);
//   });

//   return await batch.commit();
// };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export default firebase;
