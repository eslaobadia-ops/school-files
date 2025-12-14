
import API from "../services/api";

export default function Login() {
  const login = async () => {
    const res = await API.post("/auth/login", {
      username: "demo",
      password: "demo"
    });
    localStorage.setItem("token", res.data.access_token);
    alert("Logged in");
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" />
      <input placeholder="Password" type="password" />
      <button onClick={login}>Login</button>
    </div>
  );
}
