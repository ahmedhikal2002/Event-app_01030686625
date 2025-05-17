import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Container from "./Utils/Container";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { useDispatch } from "react-redux";
import { userChanged } from "./Store/AuthSlice/AuthSlice";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const userRef = await getDoc(docRef);
        const newUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: userRef?.data()?.role || "user",
        };
        dispatch(userChanged(newUser));
      } else {
        dispatch(userChanged(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <Container>
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className="">
        <Footer />
      </div>
    </Container>
  );
}

export default App;
