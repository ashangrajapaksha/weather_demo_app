import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="card p-md-5 register-wrap-card">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
