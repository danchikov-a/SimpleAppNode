// Requiring module
import Vue from 'vue'
import VueRouter from 'vue-router'
import MainContent from "@/components/MainContent";
import ProfileContent from "@/components/ProfileContent";

Vue.use(VueRouter)

const routes = [
    {
        path: '/main-content',
        name: 'MainContent',
        component: MainContent
    },
    {
        path: '/profile-content',
        name: 'ProfileContent',
        component: ProfileContent
    }
]

// Create Vue Router Object
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
