window.MezaninoRuntimeConfig = {
  apiBase: ""
};

/* CMS_API_LOCAL_CORRECTION */
window.SuaImobiliariaCmsConfig = {
  ...(window.SuaImobiliariaCmsConfig || {}),
  apiBaseUrl:
    window.SuaImobiliariaCmsConfig?.apiBaseUrl ||
    "http://127.0.0.1:8787",
};
