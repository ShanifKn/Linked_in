import { auth, provider, storage } from "../firebase";
import db from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { setDoc, doc, collection, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});
export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  status: payload,
});

export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(setUser(payload.user));
      })
      .catch((error) => alert(error.message));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}
export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}
export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));

    if (payload.image !== "") {
      const metadata = {
        contentType: "image/jpeg",
      };
      const storageReference = ref(storage, `images/${payload.image.name}`);
      const uploadTask = uploadBytesResumable(
        storageReference,
        payload.image,
        metadata
      );
      uploadTask.on(
        `state_changed`,
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progess: ${progress}%`);
          if (snapshot.state === "running") {
            console.log(`Progress: ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDoc(doc(db, "articles", "Post"), {
              actor: {
                description: payload.user.email, //
                title: payload.user.displayName, //
                date: payload.timestamp, //
                image: payload.user.photoURL,
              },
              video: payload.video, //
              sharedImg: downloadURL,
              comments: 0,
              description: payload.description,
            });
          });
          dispatch(setLoading(false));
        }
      );
    } else if (payload.video) {
      setDoc(doc(db, "articles", "Post2"), {
        actor: {
          description: payload.user.email, //
          title: payload.user.displayName, //
          date: payload.timestamp, //
          image: payload.user.photoURL,
        },
        video: payload.video, //
        sharedImg: "",
        comments: 0,
        description: payload.description,
      });
      dispatch(setLoading(false));
    }
  };
}
export function getArticleAPI() {
  let payload;
  return (dispatch) => {
    const docRef = doc(db, "articles", "Post");
    const docSnap = getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        console.log(payload, docSnap.data());
        dispatch(getArticles(payload, docSnap.data()));
      }
    });
  };
}
