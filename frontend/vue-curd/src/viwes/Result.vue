<template>
  <div class="result-page" v-if="quizStore.finalResult">
    <h2>Quiz Result</h2>
    <p>Score: {{ quizStore.finalResult.correctAnswerCount }} / {{ quizStore.finalResult.totalQuestions }}</p>
    <p>Correct percentage: {{ quizStore.finalResult.percentage }}%</p>
  </div>
  <div class="actions">
      <button @click="restartQuiz">Restart Quiz</button>
      <button @click="logout">Logout</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useQuizStore } from '../Store/Quiz'

const router = useRouter()
const quizStore = useQuizStore()

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No token')

    await axios.get('http://localhost:5005/api/result', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }
})

const restartQuiz = () => {
  quizStore.resetQuiz()
  router.push('/quiz')
}

const logout = () => {
  quizStore.resetQuiz()
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}

</script>