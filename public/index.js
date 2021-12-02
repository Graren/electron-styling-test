const el = document.querySelector("#toggle");

let currentTheme = window.theme.getInitialTheme();

const loadCss = (load, t) => {
  const head = document.getElementsByTagName("head")[0];
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = load;
  link.id = t;
  head.appendChild(link);

  currentTheme = t;

  const opposingTheme = t === "dark" ? "light" : "dark";

  const old = document.querySelector(`#${opposingTheme}`);

  if (!old) return;

  old.remove();
};

el.onclick = async () => {

  const res = await window.theme.setTheme(
    currentTheme === "dark" ? "light" : "dark"
  );

  loadCss(res.path, res.option);
};
