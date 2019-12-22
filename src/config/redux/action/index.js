import firebase, { database } from '../../firebase';
import swal from 'sweetalert';

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
   swal({
      title: "Good job!",
      text: " Data successfully added ",
      icon: "success",
      button: "Aww yess",
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
      const ulrNots = database.ref(`react/${data.userId}/${data.noteId}`);
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
            swal({
               title: "Good job!",
               text: " Data update successful ",
               icon: "success",
               button: "Aww yess",
            });
         }
      });
   })
}


export const deleteDataAPI = (data) => (dispatch) => {
   swal({
      title: "Are you sure?",
      text: `do you want to delete the ${data.title} from the list`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
   })
      .then((willDelete) => {
         if (willDelete) {
            const ulrNots = database.ref(`react/${data.userId}/${data.noteId}`);
            ulrNots.remove();
            console.log(data);
            swal("Poof! Your imaginary file has been deleted!", {
               icon: "success",
            });
         } else {
            swal("Your imaginary file is safe!");
         }
      });
}