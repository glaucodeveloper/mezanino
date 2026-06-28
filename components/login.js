  const LoginComponent = ({ props }) => {
    let error = "";
  return {
    next(message = {}) {
      if (message.type === "login") {
        const ok = props.login(message.fields.email, message.fields.password);
        error = ok ? "" : "Credenciais invalidas para o painel CMS.";
      }
      return {
        done: false,
          value: /*html*/`<section id="login" class="section login-section"><div class="container login-layout"><div class="login-copy"><span class="eyebrow">Area restrita</span><h2>Entrar no dashboard</h2><p>Acesse indicadores, leads, imoveis e salvamento do CMS.</p></div><form class="login-card" data-cid="login" data-message="login"><label class="mini-field"><span>E-mail</span><input name="email" type="email" value="${CMS_LOGIN_EMAIL}" autocomplete="username"></label><label class="mini-field"><span>Senha</span><input name="password" type="password" value="" placeholder="Informe a senha do CMS" autocomplete="current-password"></label>${error ? `<p class="login-error">${error}</p>` : `<p class="route-note">Credenciais carregadas a partir da configuracao local do ambiente.</p>`}<button class="gold-btn" type="submit">Acessar dashboard</button></form></div></section>`,
        };
      },
    };
  };
