import { useNavigate } from "react-router-dom";
import { auth, onAuthStateChanged } from "./../firebase/firebaseConfig";
import React, { useState } from "react";

function ProtectedRoute({ component }) {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsUser(true);
    } else {
      setIsUser(false);
      navigate("/");
    }
  });
  return isUser && component;
}

export default ProtectedRoute;
