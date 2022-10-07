import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { db, storage } from "../../firebase";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const initialState = {
  posts: [],
  status: null,
  error: null,
};

export const getPosts = createAsyncThunk(
  "posts/postsSlice",
  async (_, { dispatch, rejectWithValue }) => {
    const data = [];
    try {
      const postRef = collection(db, "posts");
      const postSnap = await getDocs(postRef);
      postSnap.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      await dispatch(setAllPosts(data));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const addPost = createAsyncThunk(
  "posts/postsSlice",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const id = nanoid();

      //save selected image to firestore storage and get image URL
      const storageRef = ref(storage, `/images/${id}`);
      const uploadTask = uploadBytesResumable(storageRef, data.image);
      await uploadTask.on(
        "start storage",
        null,
        (error) => {
          alert(error);
        },
        () => {
          //then get image url create post and send to firestore > download posts with new post
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              addDoc(collection(db, "posts"), {
                image: url,
                text: data.text,
                userId: data.activeUser,
                date: new Date().toISOString(),
                likes: [],
              });
            })
            .then(() => {
              dispatch(getPosts());
            });
        }
      );
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const postLikeUpdate = createAsyncThunk(
  "posts/postsSlice",
  async (data, { dispatch, rejectWithValue, getState }) => {
    const { postId } = data;
    const likedPost = getState().posts.posts.find((post) => post.id === postId);

    try {
      const washingtonRef = doc(db, "posts", likedPost.id);
      await updateDoc(washingtonRef, {
        likes: likedPost.likes,
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setAllPosts(state, action) {
      state.posts = action.payload;
    },

    togglePostLike(state, action) {
      const { userId, postId } = action.payload;
      const likedPost = state.posts.find((post) => post.id === postId);
      if (likedPost) {
        const userLike = likedPost.likes.find((id) => id === userId);
        userLike
          ? (likedPost.likes = likedPost.likes.filter((id) => id !== userId))
          : likedPost.likes.push(userId);
      }
    },
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getPosts.fulfilled]: (state) => {
      state.status = "fulfilled";
    },
    [getPosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [addPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const selectAllPosts = (state) => state.posts.posts;

export const { setAllPosts, togglePostLike } = postsSlice.actions;
export default postsSlice.reducer;
