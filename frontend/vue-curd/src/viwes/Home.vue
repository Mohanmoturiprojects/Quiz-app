<template>
  <div class="home-page">
    <div class="card">
      <h1>Welcome to Quiz App</h1>
      <p v-if="user">Hello, <strong>{{ user.username }}</strong></p>
      <p>Test your knowledge with this simple quiz.</p>

      <p>Every Question has 30sec Time</p>

      <button @click="startQuiz">Start Quiz</button>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const user = JSON.parse(localStorage.getItem('user') || 'null')
console.log('Stored token:', localStorage.getItem('token'))
  //localStorage.removeItem('token')

const startQuiz = () => {
  router.push('/quiz')
}
</script>

<style scoped>
.home-page {
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #4f46e5, #06b6d4);
  padding: 20px;
  overflow-y: hidden
}

.card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
  width: 80%;
  height: 70%;
}

h1 {
  margin-bottom: 12px;
  color: #111827;
  padding-bottom: 15px;
}

p {
  margin: 10px 0;
  color: #4b5563;
  padding-bottom: 15px;
}

button {
  margin-top: 20px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: #4f46e5;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background: #4338ca;
}
</style>