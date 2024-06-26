import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="card p-md-5 login-wrap-card">
        <LoginForm />
        <span className="d-flex justify-content-center mt-3 ">
          Don't have an account? <a href="/signup">sign up</a>
        </span>
      </div>
    </div>
  );
};

export default Login;
