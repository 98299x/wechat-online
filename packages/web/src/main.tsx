import { render } from "solid-js/web";
import App from "./App";
import { createSignal, onMount } from "solid-js";

function LoginPage() {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [err, setErr] = createSignal("");

  const envUser = import.meta.env.VITE_LOGIN_USER;
  const envPass = import.meta.env.VITE_LOGIN_PASS;

  const doLogin = () => {
    setErr("");
    if (username() === envUser && password() === envPass) {
      localStorage.setItem("wechat_online_auth", "ok");
      location.reload();
    } else {
      setErr("账号或密码错误");
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "linear-gradient(135deg,#edf2fa,#e2e8f0)",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        width: "380px", background: "#fff", padding: "40px 32px", borderRadius: "16px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)"
      }}>
        <h2 style={{ textAlign: "center", margin: "0 0 32px" }}>🔐访问验证</h2>
        <div style={{ marginBottom: "16px" }}>
          <input
            style={{ width: "100%", boxSizing: "border-box", padding: "13px 16px", border: "1px solid #d1d5db", borderRadius: "10px", fontSize: "15px" }}
            type="text"
            value={username()}
            onInput={(e) => setUsername(e.target.value)}
            placeholder="账号"
            onKeyUp={(e) => e.key === "Enter" && doLogin()}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <input
            style={{ width: "100%", boxSizing: "border-box", padding: "13px 16px", border: "1px solid #d1d5db", borderRadius: "10px", fontSize: "15px" }}
            type="password"
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
            placeholder="密码"
            onKeyUp={(e) => e.key === "Enter" && doLogin()}
          />
        </div>
        {err() ? <div style={{ color: "#dc2626", fontSize: "13px", margin: "4px 0 14px" }}>{err()}</div> : null}
        <button
          onClick={doLogin}
          style={{ width: "100%", padding: "13px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "10px", fontSize: "16px" }}
        >登录</button>
      </div>
    </div>
  );
}

function Root() {
  const [isAuth, setIsAuth] = createSignal(false);
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    const auth = localStorage.getItem("wechat_online_auth");
    setIsAuth(auth === "ok");
    setReady(true);
  });

  return (
    <>
      {ready() ? (isAuth() ? <App /> : <LoginPage />) : null}
    </>
  );
}

render(() => <Root />, document.getElementById("root")!);
