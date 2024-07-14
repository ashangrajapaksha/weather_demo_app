import React, { useState, useEffect, useRef } from "react";
import {
  Errors,
  RegisterData,
  OtpData,
  OtpResponse,
} from "../../types/AuthData";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { register, verifyOtp } from "../../services/auth";

const RegisterForm: React.FC = () => {
  const [userData, setUserData] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpData: OtpData = { email: userData.email, otp };
    try {
      const response: OtpResponse = await verifyOtp(otpData);

      if (response.message === "OTP verified successfully") {
        setOtpVerified(true);
        setMessage("OTP verified successfully.");
        navigate("/");
      } else {
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification failed", error);
      setMessage("OTP verification failed.");
    }
  };

  useEffect(() => {
    if (otpSent) {
      setTimeLeft(60); // 5 minutes
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [otpSent]);

  useEffect(() => {
    if (timeLeft === 0 && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [timeLeft]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res = await register(userData);
        console.log("E", res);

        setOtpSent(true);
      } catch (error) {
        console.error("Registration failed", error);
      }
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
      <form onSubmit={otpSent ? handleVerifyOTP : handleSubmit}>
        <div className="d-flex flex-column gap-2">
          {!otpSent ? (
            <>
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
                    value={userData.firstName}
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
                    value={userData.lastName}
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
                    value={userData.email}
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
                    value={userData.password}
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
                  Confirm Password
                </label>
                <div className="col-md-8">
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <span style={{ color: "red" }}>
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="form-group row">
              <label htmlFor="otp" className="col-md-4 col-form-label">
                Enter OTP
              </label>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={timeLeft === 0}
                />
                {errors.otp && (
                  <span style={{ color: "red" }}>{errors.otp}</span>
                )}
              </div>
            </div>
          )}
          <div className="d-flex justify-content-center">
            <Button
              label={otpSent ? "Verify OTP" : "Register"}
              type="submit"
              className="btn-primary btn-md"
              disabled={otpSent && timeLeft === 0}
            />
          </div>
          {otpSent && (
            <div className="d-flex justify-content-center">
              <p>Time left: {timeLeft}s</p>
            </div>
          )}
          {message && (
            <div className="d-flex justify-content-center">
              <p>{message}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
