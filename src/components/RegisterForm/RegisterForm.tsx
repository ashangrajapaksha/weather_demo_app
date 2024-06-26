import React, { useState } from "react";
import { Errors, RegisterData } from "../../types/AuthData";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [userData, setUserData] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // console.log(userData);
      navigate("/login");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    if (name === "password" || name === "confirmPassword") {
      const password = name === "password" ? value : userData.password;
      const confirmPassword =
        name === "confirmPassword" ? value : userData.confirmPassword;

      const newErrors: Errors = {};

      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password =
          "Password must contain at least one uppercase letter";
      } else if (password.replace(/[^0-9]/g, "").length < 2) {
        newErrors.password = "Password must contain at least two numbers";
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        ...newErrors,
        confirmPassword: newErrors.confirmPassword || "",
        password: newErrors.password || "",
      }));
    }
  };

  const validateForm = (): Errors => {
    const errors: Errors = {};

    if (!userData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "Email address is invalid";
    }

    if (!userData.password) {
      errors.password = "password is requied";
    } else if (userData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(userData.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (userData.password.replace(/[^0-9]/g, "").length < 2) {
      errors.password = "Password must contain at least two numbers";
    }

    if (userData.password !== userData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };
  return (
    <div className="d-flex">
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column gap-2">
          <div className="form-group row">
            <label htmlFor="fName" className="col-md-4 col-form-label">
              First name
            </label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                name="firstName"
                id="fName"
                value={userData?.firstName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lName" className="col-md-4 col-form-label">
              Last name
            </label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                name="lastName"
                id="lName"
                value={userData?.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
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
              {errors.email && (
                <span style={{ color: "red" }}>{errors.email}</span>
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
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password}</span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="confirmPassword"
              className="col-md-4 col-form-label"
            >
              Comfirm Password
            </label>
            <div className="col-md-8">
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                id="confirmPassword"
                value={userData?.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span style={{ color: "red" }}>{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <Button
              label="Register"
              type="submit"
              className="btn-primary btn-md"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
