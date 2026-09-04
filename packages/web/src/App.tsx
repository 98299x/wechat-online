import { createSignal, onMount, Show } from "solid-js";
import { Router } from "@solidjs/router";
import { routes } from "./router";

export default function App() {
  const [isLogin, setIsLogin] = createSignal(false);
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [errorText, setErrorText] = createSignal("");

  // CF Pages构建注入，不在github明文存放
  const envUser = import.meta.env.VITE_LOGIN_USER as string;
  const envPass = import.meta.env.VITE_LOGIN_PASS as string;

  onMount(() => {
    const auth = localStorage.getItem("wechat_online_auth");
    if (auth === "success") {
      setIsLogin(true);
    }
  });

  const handleLogin = () => {
    setErrorText("");
    if (!username() || !password()) {
      setErrorText("请填写账号和密码");
      return;
    }
    if (username() === envUser && password() === envPass) {
      localStorage.setItem("wechat_online_auth", "success");
      setIsLogin(true);
    } else {
      setErrorText("账号或密码错误，请重试");
    }
  };

  return (
    <>
      <Show when={!isLogin()}>
        <div class="login-wrapper">
          <div class="login-card">
            <div class="login-header">
              <div class="icon">🔐</div>
              <h1>访问验证</h1>
              <p>请输入凭证进入系统</p>
            </div>

            <div class="form-item">
              <input
                value={username()}
                onInput={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="账号"
                autocomplete="off"
              />
            </div>
            <div class="form-item">
              <input
                value={password()}
                onInput={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="密码"
                onKeyUp={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            <Show when={errorText()}>
              <div class="error-tip">{errorText()}</div>
            </Show>

            <button class="submit-btn" onClick={handleLogin}>
              登录
            </button>
          </div>
        </div>
      </Show>

      <Show when={isLogin()}>
        {/* ==========原有项目路由，保留全部原有功能========== */}
        <Router>{routes}</Router>
      </Show>

      <style>{`
.login-wrapper {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #edf2fa 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.login-card {
  width: 380px;
  background: #ffffff;
  padding: 40px 32px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}
.login-header {
  text-align: center;
  margin-bottom: 32px;
}
.login-header .icon {
  font-size: 42px;
  margin-bottom: 12px;
}
.login-header h1 {
  margin: 0 0 6px;
  font-size: 22px;
  color: #1f2937;
}
.login-header p {
  margin:0;
  color:#6b7280;
  font-size:14px;
}
.form-item {
  margin-bottom:16px;
}
.form-item input {
  width:100%;
  box-sizing: border-box;
  padding:13px 16px;
  border:1px solid #d1d5db;
  border-radius:10px;
  font-size:15px;
  transition:0.2s;
}
.form-item input:focus{
  outline:none;
  border-color:#2563eb;
  box-shadow:0 0 0 3px rgba(37,99,235,0.12);
}
.error-tip {
  color:#dc2626;
  font-size:13px;
  margin:4px 0 14px;
}
.submit-btn {
  width:100%;
  padding:13px;
  background-color:#2563eb;
  color:#fff;
  border:none;
  border-radius:10px;
  font-size:16px;
  cursor:pointer;
  transition:0.2s;
}
.submit-btn:hover {
  background-color:#1d4ed8;
}
      `}</style>
    </>
  );
}
