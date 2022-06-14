import io from "socket.io-client";

export let socket = io.connect("http://localhost:3050", {
    auth: {
      token: localStorage.getItem('userToken')
    },
    forceNew: true,
  });