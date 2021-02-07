export default{
    path:'/workflow',
    component:()=>import('../layout/DashboardLayout.vue'),
    children:[
        {
            path:'/workflow/create/:projectid',
            name:'newworkflow',
            component:()=>import('../views/workflow/New.vue')
        },
        {
            path:'/workflow/update/:projectid/:wfobjectid',
            name:'updateworkflow',
            component:()=>import('../views/workflow/Update')
        },
        {
            path:'/workflow/designer/:projectid/:wfobjectid',
            name:'workflowdesigner',
            component:()=>import('../views/workflow/Designer.vue')
        }
    ]
}