  const LoginComponent = ({ props }) => {
    let error = "";
    let pending = false;
    return {
      next(message = {}) {
        if (message.type === "login" && !pending) {
          pending = true;
          error = "";
          Promise.resolve(
            props.login(message.fields.email, message.fields.password),
          )
            .then((ok) => {
              error = ok ? "" : "E-mail ou senha invalidos.";
            })
            .catch(() => {
              error = "Servico de autenticacao indisponivel.";
            })
            .finally(() => {
              pending = false;
              props.requestRender?.();
            });
        }
        return {
          done: false,
          value: /*html*/`<section id="login" class="section login-section"><div class="container login-layout"><div class="login-copy"><span class="eyebrow">Area restrita</span><h2>Acessar CRM</h2><p>Entre para acompanhar clientes, negócios, imóveis e o conteúdo publicado pela equipe.</p></div><form class="login-card" data-cid="login" data-message="login"><label class="mini-field"><span>E-mail</span><input name="email" type="email" value="admin@suaimobiliaria.com.br" autocomplete="username"></label><label class="mini-field"><span>Senha</span><input name="password" type="password" autocomplete="current-password" required></label>${error ? `<p class="login-error">${error}</p>` : `<p class="route-note">Use a credencial fornecida para sua equipe.</p>`}<button class="gold-btn" type="submit" ${pending ? "disabled" : ""}>${pending ? "Entrando..." : "Acessar CRM"}</button></form></div></section>`,
        };
      },
    };
  };
