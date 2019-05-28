import firebase from 'firebase';
import Http from './Http';
export const initializeFirebase = () => {
  firebase.initializeApp({
    // taken from your project settings --> cloud messaging
    apiKey: "AIzaSyAYHBw96XDIxRziBmYUTelkxnXvUYkGifo",
    authDomain: "testing-3aa39.firebaseapp.com",
    databaseURL: "https://testing-3aa39.firebaseio.com",
    projectId: "testing-3aa39",
    storageBucket: "testing-3aa39.appspot.com",
    messagingSenderId: "235870225198"
  });
}

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    const formData = new FormData();
    formData.append("fcmtoken", token);
    Http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
    Http.post(process.env.REACT_APP_SMILE_API + 'api/token/add', formData)
      .then(res => {
        console.log("Sent");
        return true;

      })
      .catch(err => {
        const statusCode = err.response.status;
        const data = {
          error: null,
          statusCode,
        };
        if (statusCode === 401 || statusCode === 422) {
          // status 401 means unauthorized
          // status 422 means unprocessable entity
          data.error = err.response.data.message;
        }
        return Promise.reject(data);
      })

    console.log('Token : ', token);

    return token;
  } catch (error) {
    console.error(error);
  }
}
