<template>
  <section class="tasklogin">
    <div class="container tasklogin__container">
      <h1 class="task--heading">Task Manager</h1>
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
          Login</button
        ><br />

        <button type="button" class="btn btn-link" @click="forgetpwd()">Forget Password</button>
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
  signInWithEmail();

}
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
onMounted(() => {
  emailtofocus.value.focus()
})

async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password,
  })

  if (error) {
    console.error("Login failed:", error.message)
    return
  }


  if (data?.user?.aud === "authenticated") {

    window.location.href = 'http://localhost:5173/#/dashboard'
  }
}
async function forgetpwd() {
  // Ensure email exists before calling the function
  if (!form.email) {
    errors.email = 'Please enter your email first';
    return;
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(form.email, {
    redirectTo: 'http://localhost:5173/#/updatepassword',
  });
console.log(data);
console.log(error);
  if (error) {
    console.error("Error code:", error.status); // Should be 400
    console.error("Error message:", error.message);
  } else {
    alert("Password reset email sent!");
  }
}



</script>
