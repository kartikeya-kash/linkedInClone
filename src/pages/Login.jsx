import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedData = localStorage.getItem("userdata");

    if (!storedData) {
      alert("No user found! Please sign up first.");
      return;
    }

    const user = JSON.parse(storedData);

    if (username === user.email && password === user.password) {
      alert("Login Successful! Welcome " + user.fullName);
      localStorage.setItem("isAuthenticated", "true");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
