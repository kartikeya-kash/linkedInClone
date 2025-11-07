import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  return (
    <>
      <h1>Sign Up Page</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(
            "Welcome " + formData.fullName + "! Your account has been created."
          );
          localStorage.setItem("userdata", JSON.stringify(formData));
          navigate("/login");
        }}
      >
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>

      <button onClick={() => navigate("/login")}>Login instead</button>
    </>
  );
}

export default Signup;
