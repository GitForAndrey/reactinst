import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { toast } from "react-toastify";

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
      await postSnap.forEach((doc) => {
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
    const { image, text, activeUser } = data;
    try {
      const id = nanoid();

      //save selected image to firestore storage and get image URL
      const storageRef = ref(storage, `/images/${id}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "start storage",
        null,
        (err) => {
          return rejectWithValue(err.message);
        },
        async () => {
          //then get image url create post and send to firestore > download posts with new post
          let url = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, "posts"), {
            image: url,
            text: text,
            userId: activeUser,
            date: new Date().toISOString(),
            likes: [],
          });
          await dispatch(getPosts());
        }
      );
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const postLikeUpdate = createAsyncThunk(
  "posts/postsSlice",
  async (data, { rejectWithValue, getState }) => {
    const { postId } = data;
    const likedPost = getState().posts.posts.find((post) => post.id === postId);

    try {
      const postRef = doc(db, "posts", likedPost.id);
      updateDoc(postRef, {
        likes: likedPost.likes,
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/postsSlice",
  async (data, { rejectWithValue, dispatch }) => {
    const { postId, imageUrl } = data;
    const postRef = doc(db, "posts", postId);
    const storageRef = ref(storage, imageUrl);
    try {
      await deleteObject(storageRef);
      await deleteDoc(postRef);
      await dispatch(getPosts());
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const postEdit = createAsyncThunk(
  "posts/postsSlice",
  async (data, { rejectWithValue, dispatch }) => {
    const { text, image, postId, oldImage } = data;

    if (image === oldImage) {
      console.log("same photo");
      try {
        const postRef = await doc(db, "posts", postId);
        await updateDoc(postRef, {
          text,
        });
        await dispatch(getPosts());
      } catch (err) {
        return rejectWithValue(err.message);
      }
    } else {
      try {
        const id = nanoid();
        const storageRef = ref(storage, `/images/${id}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        const storageRefDel = ref(storage, oldImage);

        uploadTask.on(
          "start storage",
          null,
          (err) => {
            return rejectWithValue(err.message);
          },
          async () => {
            //then get image url create post and send to firestore > download posts with new post
            let url = await getDownloadURL(uploadTask.snapshot.ref);
            const postRef = doc(db, "posts", postId);
            await updateDoc(postRef, {
              image: url,
              text,
            });
            await dispatch(getPosts());
            await deleteObject(storageRefDel);
          }
        );
      } catch (err) {
        return rejectWithValue(err.message);
      }
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
      toast.error(action.payload);
    },
    [addPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      toast.error(action.payload);
    },
    [postLikeUpdate.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      toast.error(action.payload);
    },
    [deletePost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      toast.error(action.payload);
    },
    [postEdit.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      toast.error(action.payload);
    },
  },
});

export const selectModalVisible = (state) => state.posts.postModalVisible;
export const selectAllPosts = (state) => state.posts.posts;
export const selectError = (state) => state.posts.error;
export const selectLoading = (state) => state.posts.status;

export const { setAllPosts, togglePostLike } = postsSlice.actions;
export default postsSlice.reducer;
