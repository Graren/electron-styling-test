const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("theme", {
  setTheme: (option) => {
    if (option !== "dark" || option !== "light") {
      return ipcRenderer.invoke("dark-mode:toggle", option);
    }
  },

  getInitialTheme: () => {
    ipcRenderer.send("initialTheme", {
      option: "dark",
    });
  },

  listen: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
});
