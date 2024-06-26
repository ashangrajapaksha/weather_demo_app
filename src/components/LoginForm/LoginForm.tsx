import React, { useState } from "react";
import { LoginData } from "../../types/AuthData";
import Button from "../Button/Button";

const LoginForm: React.FC = () => {
  const [userData, setUserData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};

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
