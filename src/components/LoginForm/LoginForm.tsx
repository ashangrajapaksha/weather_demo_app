import React, { useState } from "react";
import { Errors, LoginData, User } from "../../types/AuthData";
import Button from "../Button/Button";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm: React.FC = () => {
  const [userData, setUserData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<Errors | null>(null);

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
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      setError({});
      try {
        const user: User = await login(userData);
        auth.login(user);
        navigate("/home");
      } catch (error) {
        setError({ general: "Invalid email or password" });
        console.error("Login failed", error);
      }
    }
  };

  const validateForm = (): Errors => {
    const errors: Errors = {};

    if (!userData.email) {
      errors.email = "Email is required";
    }
    if (!userData.password) {
      errors.password = "Password is required";
    }

    return errors;
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
              {error?.email && (
                <div style={{ color: "red" }}>{error.email}</div>
              )}
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
              {error?.password && (
                <div style={{ color: "red" }}>{error.password}</div>
              )}
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Button
                label="Login"
                type="submit"
                className="btn-primary btn-md"
              ></Button>
            </div>
            <div className="row">
              <div className="col-4"></div>
              <div className="col-8">
                <div className="d-flex mt-2">
                  {error && <div style={{ color: "red" }}>{error.general}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
