import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");   // 🔹 use email instead of username
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,    // 🔹 must match backend AuthRequest
        password,
      });

      // Backend returns JWT token and role
      const { token, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/employee-dashboard");
      }
    } catch (error) {
      alert("Invalid email or password");
      console.error(error);
    }
  };

  return (
    <div className="bg03">
      <div className="container">
        <div className="row tm-mt-big">
          <div className="col-12 mx-auto tm-login-col">
            <div className="bg-white tm-block">
              <div className="row">
                <div className="col-12 text-center">
                  <i className="fas fa-3x fa-tachometer-alt tm-site-icon text-center"></i>
                  <h2 className="tm-block-title mt-3">Login</h2>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <form className="tm-login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                      <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group mt-3">
                      <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control validate"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary d-inline-block mx-auto"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
