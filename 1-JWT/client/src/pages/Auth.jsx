import { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import "../styles/Auth.css";
import Login from "../components/Login";
import Register from "../components/Register";
function Auth() {
  const { isAuthenticated } = useContext(Context);
  const [isLogin, setIsLogin] = useState(true);
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-toggle">
            <button
              className={`toggle-btn ${isLogin ? "active" : ""}`}
              onClick={() => {
                setIsLogin(true);
              }}
            >
              Login
            </button>
            <button
              className={`toggle-btn ${!isLogin ? "active" : ""}`}
              onClick={() => {
                setIsLogin(false);
              }}
            >
              Register
            </button>
          </div>
          {isLogin ? <Login /> : <Register />}
        </div>
      </div>
    </>
  );
}

export default Auth;
