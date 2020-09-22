/*
* 统一导出views目录下的页面
* */
import {Loading} from "../components/index";
import Loadable from 'react-loadable'
// import Dashboard from "./Dashboard/dashboard";
// import ArticleEdit from "./Article/edit";
// import ArticleList from "./Article";
// import Login from "./Login/login";
// import NotFound from "./NotFound/not-found";
// import Settings from "./Settings/settings";

const Dashboard = Loadable({
  loader: () => import('./Dashboard/dashboard'),
  loading: Loading
})
const ArticleEdit = Loadable({
  loader: () => import('./Article/edit'),
  loading: Loading
})
const ArticleList = Loadable({
  loader: () => import('./Article/index'),
  loading: Loading
})
const Login = Loadable({
  loader: () => import('./Login/login'),
  loading: Loading
})
const NotFound = Loadable({
  loader: () => import('./NotFound/not-found'),
  loading: Loading
})
const Settings = Loadable({
  loader: () => import('./Settings/settings'),
  loading: Loading
})
const Notifications = Loadable({
  loader: () => import('./Notifications/notifications'),
  loading: Loading
})

const NoAuth = Loadable({
  loader: () => import('./NoAuth/noauth'),
  loading: Loading
})

const Profile = Loadable({
  loader: () => import('./Profile/index'),
  loading: Loading
})
export {
  Dashboard,
  ArticleEdit,
  ArticleList,
  Login,
  NotFound,
  Settings,
  Notifications,
  NoAuth,
  Profile
}