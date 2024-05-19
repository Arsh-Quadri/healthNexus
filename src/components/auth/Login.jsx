/* eslint-disable react/prop-types */
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import google from "../../assets/Google.png";

const Login = ({ isOnboardingCompleted }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isOnboardingCompleted !== null) {
      window.scrollTo(0, 0);
      isOnboardingCompleted ? navigate("/dashboard") : navigate("/onboard");
    }
  }, [isOnboardingCompleted]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // {
      //   isOnboardingCompleted ? navigate("/dashboard") : navigate("/onboard");
      // }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // {
      //   isOnboardingCompleted ? navigate("/dashboard") : navigate("/onboard");
      // }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent successfully. Check your inbox.");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };
  return (
    <div className="w-[90%] max-h-fit relative overflow-hidden h-[80%] mt-[1.7rem] bg-gray-100 mx-auto px-5  flex justify-center items-center  shadow-xl"> 
    {/* Image */}
    <div className="w-[50%] z-20"> 
      <img src="/src/assets/nurse.png" className="w-[70%] mx-auto " alt="Logo" />
    </div>
      <div className="shadow-xl absolute rounded-[25%] right-[55%] bottom-0 bg-[#2FCAB1] w-[40%] h-[74%] z-10"> </div>
   
    {/* Login */}
    <div className=" w-[50%] mt-10 flex flex-col justify-center items-center  bckimg ">
      <div className="w-[70%] bg-[#fff] shadow-none sm:shadow-lg shadow-black relative flex flex-col justify-center p-5 px-10 rounded-none sm:rounded-xl z-20 ">
        <h1 className="text-3xl font-[750] text-black relative py-5 left-0 text-left">
          Login or create an account
        </h1>
        <div className="mt-3">
          <h1 className="text-md font-[600] relative text-[#2FCAB1] left-0 text-left mb-1">
            Email address
          </h1>
          <input
            type="email"
            value={email}
            className="bg-gray-100 outline-none placeholder-[#9ea3a4] text-black pl-2 py-2 w-full rounded-xl border border-[#E8DECF] "
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <h1 className="text-md font-[600] relative text-[#2FCAB1] left-0 text-left mb-1">
            Password
          </h1>
          <input
            type="password"
            value={password}
            className="bg-slate-200 outline-none placeholder-[#9ea3a4] text-black pl-2 py-2 w-full rounded-xl border border-[#E8DECF] "
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <h1
          className="text-sm text-[#2FCAB1] font-[500] relative  left-0 cursor-pointer text-center m-auto w-fit py-2 mt-3"
          onClick={handleForgotPassword}
        >
          Forgot password?
        </h1>
        <div
          className="hover:bg-[] bg-[#2FCAB1] font-[600] px-4 py-2 rounded-xl cursor-pointer  md:block text-center mt-3"
          onClick={(e) => handleSignIn(e)}
        >
          Log in
        </div>
        <div
          className="bg-slate-200 hover:bg-[#2FCAB1] flex justify-center items-center font-[600] px-4 py-2 rounded-xl cursor-pointer text-center mt-3 gap-2"
          onClick={handleGoogleSignIn}
        >
          <img src={google} alt="" />
          <div>Continue with Google</div>
        </div>
        <h1 className="text-sm text-[#2FCAB1] font-[500] relative  left-0 text-center py-3 cursor-pointer ">
          Don`t have an account?
        </h1>
        <Link
          to="/signup"
          className="bg-slate-200 hover:bg-[#2FCAB1] flex justify-center items-center font-[600] px-4 py-2 rounded-xl cursor-pointer text-center gap-2 mb-5"
        >
          <div>Sign up</div>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Login;
