import firebase, { database } from '../../firebase';

export const actionUserName = () => (dispatch) => {
   setTimeout(() => {
      return dispatch({ type: 'CHANGE_USER', value: 'impor Noob' })
   }, 2000)

}

export const registerUserAPI = (data) => (dispatch) => {
   return new Promise((resolve, reject) => {
      dispatch({ type: 'CHANGE_LOADING', value: true })
      firebase
         .auth()
         .createUserWithEmailAndPassword(data.email, data.password)
         .then(res => {
            console.log("success:", res);
            dispatch({ type: 'CHANGE_LOADING', value: false })
            resolve(true)
         })
         .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            dispatch({ type: 'CHANGE_LOADING', value: false })
            reject(false)
         })
   })
}


export const loginUserAPI = (data) => (dispatch) => {

   return new Promise((resolve, reject) => {
      dispatch({ type: 'CHANGE_LOADING', value: true })
      firebase
         .auth()
         .signInWithEmailAndPassword(data.email, data.password)
         .then(res => {
            console.log("success:", res);
            const dataUser = {
               email: res.user.email,
               uid: res.user.uid,
               emailVerified: res.user.emailVerified,
               refreshToken: res.user.refreshToken
            }
            dispatch({ type: 'CHANGE_LOADING', value: false })
            dispatch({ type: 'CHANGE_ISLOGIN', value: true })
            dispatch({ type: 'CHANGE_USER', value: dataUser })
            resolve(dataUser)
         })
         .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            dispatch({ type: 'CHANGE_LOADING', value: false })
            dispatch({ type: 'CHANGE_ISLOGIN', value: false })
            reject(false)
         })
   })
}

export const addDataToAPI = (data) => (dispatch) => {
   database.ref('react/' + data.userId).push({
      title: data.title,
      content: data.content,
      date: data.date
   });
}

export const getDataFromAPI = (data) => (dispatch) => {
   return new Promise((resolve, reject) => {
      const ulrNots = database.ref('react/' + data);
      ulrNots.on('value', function (snapshot) {
         //   updateStarCount(postElement, snapshot.val());
         // console.log('getData', snapshot.val());

         const data = [];
         Object.keys(snapshot.val()).map(key => {
            data.push({
               id: key,
               data: snapshot.val()[key]
            })
         })
         dispatch({
            type: 'SET_NOTES', value: data
         })
         resolve(snapshot.val())
      });
   })
}

export const updateDataAPI = (data) => (dispatch) => {
   return new Promise((resolve, reject) => {
      const ulrNots = database.ref(`notes/${data.userId}/${data.noteId}`);
      ulrNots.set({
         title: data.title,
         content: data.content,
         date: data.date
      }, (err) => {
         if (err) {
            console.log(err);
            reject(false)
         } else {
            resolve(true)
            console.log('success', data)
         }
      });
   })
}