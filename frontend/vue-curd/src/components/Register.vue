<template>
  <div class="auth-page">
    <h2>Register</h2>

    <form @submit.prevent="handleRegister" class="auth-form">
      <div class="form-group">
        <label>Username</label>
        <input v-model="form.username" type="text" placeholder="Enter username" />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="form.email" type="email" placeholder="Enter email" />
      </div>

      <div class="form-group">
        <label>Phone No</label>
        <input v-model="form.phno" type="text" placeholder="Enter phone number" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="form.password" type="password" placeholder="Enter password" />
      </div>

      <button type="submit">Register</button>
    </form>

    <p>
      Already have an account?
      <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const form = reactive({
  username: '',
  email: '',
  phno: '',
  password: ''
})


const handleRegister = async () => {
  try {
    const res = await axios.post('http://localhost:5005/api/register', {
      username: form.username,
      email: form.email,
      phno: form.phno,
      password: form.password
    })

    console.log(res.data.message)
    router.push('/login')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data?.message || 'Register failed')
    } else {
      console.error('Register failed')
    }
  }
}
</script>

<style scoped>
.auth-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}
.form-group {
  margin-bottom: 15px;
}
input {
  width: 90%;
  padding: 10px;
  margin-top: 5px;
}
button {
  width: 100%;
  padding: 10px;
  background: #2c7be5;
  color: white;
  border: none;
  border-radius: 6px;
}
</style>