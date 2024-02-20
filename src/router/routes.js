import React from "react";
import { Game, Profile, Words, Home } from "#views";

const routes = {
  Home: {
    path: "/main_window",
    index: true,
    element: <Home />,
    title: "Home",
  },
  CreateGame: {
    path: "/game",
    element: <Game />,
    title: "Create Game",
  },
  QuickGame: {
    path: "/game/:quick",
    navigate: () => {
      return "/game/quick";
    },
    element: <Game />,
    title: "Quick Game",
  },
  Profile: {
    path: "/profile",
    element: <Profile />,
    title: "User Profiles",
  },
  Words: {
    path: "/words",
    element: <Words />,
    title: "Words",
  },
  NotFound: {
    path: "/*",
    element: <Home />,
    title: "NotFound",
  },
};
let links = {};

Object.entries(routes).map(([name, route]) => {
  //console.log('mapp',name,route)
  links[name] =
    route["navigate"] ||
    (() => {
      return route["path"];
    });
});
export default routes;
export { links };
