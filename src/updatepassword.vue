
<template>
  <section class="tasklogin">
    <div class="container tasklogin__container">
      <h1 class="task--heading">Update Password</h1>
      <form @submit.prevent="submitForm">


        <label for="password">Password</label>
        <input type="password" placeholder="....." v-model="form.password" minlength="8" />
        <span v-if="errors.password" class="text-danger">{{ errors.password }}</span
        ><br />
        <label for="password">Confirm Password</label>
        <input type="password" placeholder="....." v-model="form.password" minlength="8" />
        <span v-if="errors.password" class="text-danger">{{ errors.password }}</span
        ><br />
        <button
          type="submit"
          class="btn btn-primarylogin"
          @click="submitForm()"
          :disabled="hideSubmit"
        >
          Update</button
        ><br />

      </form>

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

  password: '',
  confirmpassword:'',
})

const errors = reactive({
 password: '',
  confirmpassword:'',
})
async function submitForm() {
    validateForm();


await supabase.auth.updateUser({ password: form.password })
}
function validateForm()
{

  errors.password = ''
  errors.confirmpassword=''
  status.value = 'loading'
  if (form.password!=form.confirmpassword) {
    errors.password = 'password is not matching'
  }
}
onMounted(() => {
  emailtofocus.value.focus()
})

</script>
