import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('views/home/Home');
const Category = () => import('views/category/Category');
const Shopcart = () => import('views/shopcart/Shopcart');
const Profile = () => import('views/profile/Profile');
const Detail = () => import('views/detail/Detail')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
      meta: {
        footShow: true,
      },
    },
    {
      path: '/category',
      component: Category,
      meta: {
        footShow: true,
      },
    },
    {
      path: '/shopcart',
      component: Shopcart,
      meta: {
        footShow: true,
      },
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        footShow: true,
      },
    },
    {
      path: '/detail/:iid',
      component: Detail,
    }
  ],

  mode: 'history'
})
