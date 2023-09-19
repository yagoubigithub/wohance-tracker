
import "./Home.scss"
import Navbar from "../../components/navbar/Navbar";
import Signin from "../../components/signin/Signin";
import Signup from "../../components/signup/Signup";


import { isAuthenticated } from "../../auth";
import { Redirect } from "react-router-dom";

const Home = () => {
  return (
    <div>
    {isAuthenticated() && <Redirect to="/dashboard" />}
      <Navbar />
      <div className="home-container">
        <Signin />
        <Signup />
      </div>
    </div>
  );
};

export default Home;
