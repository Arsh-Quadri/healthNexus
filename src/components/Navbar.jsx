/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Navbar = ({ user, setIsOnboardingCompleted }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      setIsOnboardingCompleted(null);
      navigate("/");
      // Handle successful sign-out (e.g., redirect to home page)
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex gap-5">
      <Link to="/" className="">
        Home
      </Link>
      <Link to="/login" className="">
        Login
      </Link>
      <Link to="/signup" className="">
        Signup
      </Link>
      {user && (
        <div className="cursor-pointer" onClick={handleLogout}>
          {/* <FontAwesomeIcon icon={faRightFromBracket} /> */}
          <div>Logout</div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
