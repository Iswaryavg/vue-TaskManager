<template>

<component :is="currentView"/>

</template>

<script setup>
import {ref,computed} from 'vue';
import Login from './Login.vue'
import Register from './Register.vue'
import NotFound from './NotFound.vue'
import DashBoard from './DashBoard.vue'
import UpdatePassword from './updatepassword.vue'


const routes={
    '/':Login,
    '/register':Register,
    '/dashboard':DashBoard,
    '/updatepassword':UpdatePassword

}
const currentPath=ref(window.location.hash)
console.log(window.location)

window.addEventListener('hashchange',()=>{
    currentPath.value=window.location.hash
})


const currentView = computed(() => {
  // 1. Get the hash (e.g., #/updatepassword#access_token=...)
  const fullPath = currentPath.value.slice(1) || '/'

  // 2. Only take the part before the second '#' or '?'
  // This turns "/updatepassword#access_token=..." into "/updatepassword"
  const cleanPath = fullPath.split('#')[0].split('?')[0]

  // 3. Look up the component using the clean path
  return routes[cleanPath] || NotFound
})

</script>


<style scoped></style>
