export default {
    path: '/auth',
    component: () => import('../layout/BlankLayout'),
    children:[
        {
            path:'',
            name:'blanklogin',
            component:()=>import('../views/auth/Login')
        },
        {
            path:'login',
            name:'login',
            component:()=>import('../views/auth/Login')
        }
    ]
}