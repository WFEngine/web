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
        },
        {
            path:'register',
            name:'register',
            component:()=>import('../views/auth/Register')
        },
        {
            path:'recoverpassword',
            name:'recoverpassword',
            component:()=>import('../views/auth/ForgotPassword')
        },
        {
            path:'login/:status/:token',
            name:'loginstatus',
            component:()=>import('../views/auth/Login')
        }
    ]
}