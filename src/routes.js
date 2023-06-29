import {
	createRouter,
	createRouterMatcher,
	createWebHashHistory,
	createWebHistory
} from 'vue-router';

const routes = [
	{
		path: '/',
		component: ()=>import('./pages/home/index.vue')
	},
]

const router = createRouter({  
	history: createWebHashHistory(),
	routes
})

export default router
