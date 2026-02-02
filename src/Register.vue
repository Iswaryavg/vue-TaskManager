
<template>
  <section class="tasklogin">
    <div class="container tasklogin__container">
      <h1 class="task--heading">Task Manager-Register</h1>
      <form @submit.prevent="submitForm">
        <label for="email">Email</label>
        <input type="text" placeholder="user@example.com" v-model="form.email" ref="email-focus" />
        <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
        <br />

        <label for="password">Password</label>
        <input type="password" placeholder="....." v-model="form.password" minlength="8" />
        <span v-if="errors.password" class="text-danger">{{ errors.password }}</span
        ><br />
        <button
          type="submit"
          class="btn btn-primarylogin"
          @click="submitForm()"
          :disabled="hideSubmit"
        >
          Register</button
        ><br />

        <button type="button" class="btn btn-link">Forget Password</button>
      </form>
      0
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, useTemplateRef, onMounted } from 'vue'
  import{supabase} from './lib/SupabaseClient'

const status = ref('idle')
const hideSubmit = ref(false)
const emailtofocus = useTemplateRef('email-focus')

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})
function submitForm() {
  validateForm();
  signUpNewUser();
}
onMounted(() => {
  emailtofocus.value.focus()
})
function validateForm()
{
  errors.email = ''
  errors.password = ''
  status.value = 'loading'
  if (!form.email) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Invalid email format'
  }
  if (!form.password) {
    errors.password = 'Password is required'
  } else if (form.password.length < 6) {
    errors.password = 'Password too short'
  } else if (!/[A-Z]/.test(form.password)) {
    errors.password = 'It should have atleast one Uppercase letter'
  } else if (!/[!@#$%^&*]/.test(form.password)) {
    errors.password = 'It should have atleast one symbol'
  }
  if (!form.email || !form.password) {
    hideSubmit.value = true
  }
}
async function signUpNewUser()
{
  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      emailRedirectTo: 'http://localhost:5173/#/dashboard',
    },
  })
}
</script>
