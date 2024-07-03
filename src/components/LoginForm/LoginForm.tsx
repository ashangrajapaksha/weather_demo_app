import React, { useState } from "react";
import { LoginData, User } from "../../types/AuthData";
import Button from "../Button/Button";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm: React.FC = () => {
  const [userData, setUserData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user: User = await login(userData);
      auth.login(user);
      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column gap-2">
          <div className="form-group row">
            <label htmlFor="email" className="col-md-4 col-form-label">
              Email
            </label>
            <div className="col-md-8">
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                value={userData?.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-md-4 col-form-label">
              Password
            </label>
            <div className="col-md-8">
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                value={userData?.password}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Button
                label="Login"
                type="submit"
                className="btn-primary btn-md"
              ></Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
