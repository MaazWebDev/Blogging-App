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
  query,
  orderBy,
  Timestamp,
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
  const date = new Date();
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
    date: Timestamp.fromDate(date),
  });
  return { blogUrl, docId: docRef.id };
};

const getUserBlogs = async (uid, collectionName) => {
  try {
    // Create a query to get all blogs ordered by date in descending order
    const allBlogsQuery = query(
      collection(db, collectionName),
      orderBy("date", "desc")
    );
    const querySnapshot = await getDocs(allBlogsQuery);

    const singleUserData = [];
    const allUserData = [];

    querySnapshot.forEach((doc) => {
      const data = { ...doc.data(), id: doc.id };

      if (uid && uid === data.uid) {
        singleUserData.push(data);
      } else {
        allUserData.push(data);
      }
    });

    return { allUserData, singleUserData };
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    throw error; // Rethrow or handle the error as needed
  }
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