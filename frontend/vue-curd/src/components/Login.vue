<template>
  <div class="auth-page">
    <h2>Login</h2>

    <form @submit.prevent="handleLogin" class="auth-form">
      <div class="form-group">
        <label>Username</label>
        <input v-model="form.username" type="text" placeholder="Enter username" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="form.password" type="password" placeholder="Enter password" />
      </div>

      <button type="submit">Login</button>
    </form>

    <p>
      New user?
      <router-link to="/register">Register</router-link>
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
  password: ''
})

const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:5005/api/login', {
      username: form.username,
      password: form.password
    })

    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    
     console.log('Stored token:', localStorage.getItem('token'))

    alert(res.data.message || 'Login successful')
    router.push('/home')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message || 'Login failed')
      console.error(error.response?.data?.message || 'Login failed')
    } else {
      alert('Login failed')
      console.error('Login failed')
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
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
}
</style>
