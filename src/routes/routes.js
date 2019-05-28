import LoginBlack from "../pages/login-black";
import IndexBlack from "../pages/index-black";
import Article from "../pages/article";
import Jurnal from "../pages/jurnal";
import ListJurnal from "../pages/jurnal-more";
import Gallery from "../pages/gallery";
import SmiActivity from "../pages/smi-activity";
import SmiNews from "../pages/smi-news";
import Newsfeed from "../pages/newsfeed/";
import Logout from "../pages/logout/";
import Whatson from "../pages/whatson-today";

import NotFound from "../pages/notfound";
import AdminArticle from "../pages/adminarticle-black/";
import AdminCategory from "../pages/admincategory-black/";
import Search from "../pages/search/";
import GalleryList from "../pages/listgallery/";
import VideoList from "../pages/listvideo/";
import Bukutelepon from "../pages/bukutelepon/";
import CekSppd from "../pages/ceksppd/";

const routes = [
    {
        path: "/login",
        exact: true,
        auth: false,
        icon: "tim-icons icon-coin",
        component: LoginBlack,
        hide: true
    },
    {
        path: "/",
        exact: true,
        auth: true,
        icon: "tim-icons icon-coin",
        component: IndexBlack,
        hide: true
    },
    {
        path: "/search/:findWord",
        exact: true,
        auth: true,
        icon: "tim-icons icon-coin",
        component: Search,
        hide: true
    },
    {
        path: "/listgallery/:id",
        exact: true,
        auth: true,
        icon: "tim-icons icon-coin",
        component: GalleryList,
        hide: true
    },
    {
        path: "/listvideo",
        exact: true,
        auth: true,
        icon: "tim-icons icon-coin",
        component: VideoList,
        hide: true
    },
    {
        path: "/Bukutelepon",
        exact: true,
        auth: true,
        icon: "tim-icons icon-coin",
        component: Bukutelepon,
        hide: true
    },
    {
        path: "/ceksppd",
        exact: true,
        auth: true,
        icon: "tim-icons icon-coin",
        component: CekSppd,
        hide: true
    },
    {
        path: "/article/:id",
        exact: true,
        auth: true,
        icon: "tim-icons icon-coin",
        component: Article,
        hide: true
    },
    {
        path: "/jurnal",
        exact: true,
        auth: true,
        icon: "tim-icons icon-coin",
        component: Jurnal,
        hide: true
    },
    {
        path: "/listjurnal",
        exact: true,
        auth: true,
        icon: "tim-icons icon-coin",
        component: ListJurnal,
        hide: true
    },
    {
        path: "/gallery",
        exact: true,
        auth: true,
        icon: "tim-icons icon-coin",
        component: Gallery,
        hide: true
    },
    {
        path: "/smiactivity",
        exact: true,
        auth: true,
        icon: "tim-icons icon-coin",
        component: SmiActivity,
        hide: true
    },
    {
        path: "/sminews",
        exact: true,
        auth: true,
        icon: "tim-icons icon-coin",
        component: SmiNews,
        hide: true
    },
    {
        path: "/newsfeed/:id",
        exact: false,
        auth: true,
        icon: "tim-icons icon-coin",
        component: Newsfeed,
        hide: true
    },
    {
        path: "/whatson/:id/:category",
        exact: false,
        auth: true,
        icon: "tim-icons icon-coin",
        component: Whatson,
        hide: true
    }
    /*,

    {
      path: "/*",
      exact: false,
      auth: false,
      icon: "tim-icons icon-coin",
      component: NotFound,
      hide: true
    },

    */
    ,
    {
        path: "/logout",
        exact: true,
        auth: true,
        icon: "tim-icons icon-coin",
        component: Logout,
        hide: true
    },
    {
        path: "/admin/article",
        exact: true,
        auth: true,
        icon: "tim-icons icon-coin",
        component: AdminArticle,
        hide: true
    },
    {
        path: "/admin/category",
        exact: true,
        auth: true,
        icon: "tim-icons icon-coin",
        component: AdminCategory,
        hide: true
    },
    {
        path: "/*",
        exact: false,
        auth: false,
        icon: "tim-icons icon-coin",
        component: NotFound,
        hide: true
    }

];

export default routes;
