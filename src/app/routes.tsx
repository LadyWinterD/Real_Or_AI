import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import Creator from "./pages/Creator"; // ✅ 第 1 步：引入我们刚写的页面

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/game",
    Component: Game,
  },
  {
    path: "/leaderboard",
    Component: Leaderboard,
  },
  // ✅ 第 2 步：按照你的数据结构，加入这个新路由
  {
    path: "/creator",
    Component: Creator,
  },
]);