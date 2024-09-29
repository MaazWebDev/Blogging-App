import {
  db,
  getDownloadURL,
  ref,
  storage,
  uploadBytes,
  createUserWithEmailAndPassword,
  auth,
  updateProfile,
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "./firebaseConfig";

const createUser = async (
  email,
  password,
  profilePic,
  first_name,
  last_name
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const storageRef = ref(storage, `profilePic/${profilePic[0].name}`); // create a ref in firebase storage

  // Uploading the image
  await uploadBytes(storageRef, profilePic[0]); // adding image in storage

  // Getting the URL of the profile picture
  const url = await getDownloadURL(storageRef); //getting url of profile picture
  console.log(url);

  // Update user profile
  await updateProfile(auth.currentUser, {
    displayName: `${first_name} ${last_name}`,
    photoURL: url,
  });
};

const addingBlogToFirestore = async (
  folderRef,
  blogImg,
  collectionName,
  blogTitle,
  blogMessage,
  user
) => {
  const storageRef = ref(storage, `${folderRef}/${blogImg[0].name}`);
  await uploadBytes(storageRef, blogImg[0]);
  const blogUrl = await getDownloadURL(storageRef);

  const docRef = await addDoc(collection(db, collectionName), {
    blogUrl,
    blogTitle,
    blogMessage,
    uid: user.uid,
    userName: user.displayName,
    userPic: user.photoURL,
  });
  return { blogUrl, docId: docRef.id };
};

const getUserBlogs = async (uid, collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const singleUserData = [];
  const allUserData = [];
  querySnapshot.forEach((doc) => {
    if (uid && uid === doc.data().uid) {
      singleUserData.push({ ...doc.data(), id: doc.id });
    } else {
      allUserData.push({ ...doc.data(), id: doc.id });
    }
  });
  // console.log(blogsData); // Logging the final array after loop completes
  return { allUserData, singleUserData }; // Return data outside the loop
};

const getSingleDoc = async (id, collection) => {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
const updateSingleDoc = async (id, collection, title, description, url) => {
  const blogRef = doc(db, collection, id);

  // Update the document with blogUrl only if it's provided
  await updateDoc(blogRef, {
    blogTitle: title,
    blogMessage: description,
    ...(url && { blogUrl: url }), // Conditionally include blogUrl if url is truthy
  });
};

const imageToUrl = async (file, imageRef) => {
  const storageRef = ref(storage, `${imageRef}/${file[0].name}`);
  await uploadBytes(storageRef, file[0]);
  const blogUrl = await getDownloadURL(storageRef);

  return blogUrl;
};

export {
  getUserBlogs,
  getSingleDoc,
  updateSingleDoc,
  imageToUrl,
  createUser,
  addingBlogToFirestore,
};
