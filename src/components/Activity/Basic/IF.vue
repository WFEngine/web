<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    v-if="Object.keys(activity).length > 0"
  >
    <v-card>
      <h1 class="title">IF</h1>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    props:{
        activity:{
            required:true,
            default:{}
        },
        variables:{
            required:true,
            default:[]
        }
    },
    data(){
        return{
            dialog : false
        }
    },
    methods:{
        openDialog(){
            
        }
    }
};
</script>