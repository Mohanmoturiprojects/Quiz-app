<template>
  <div class="quiz-page">
    <div class="quiz-card" v-if="quizStore.currentQuestion">
      <h2>Question {{ quizStore.currentIndex + 1 }} / {{ quizStore.totalQuestions }}</h2>
      <p>{{ quizStore.currentQuestion.question }}</p>

      <div class="options">
        <label v-for="option in quizStore.currentQuestion.options" :key="option">
          <input
            type="radio"
            :value="option"
            v-model="quizStore.selectedAnswer"
          />
          {{ option }}
        </label>
      </div>

      <button @click="handleSubmit" :disabled="!quizStore.selectedAnswer">
        {{ quizStore.isLastQuestion ? 'Submit' : 'Next' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useQuizStore } from '../Store/Quiz'

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const router = useRouter()
const quizStore = useQuizStore()

const handleSubmit = async () => {
  if (quizStore.quizFinished) return

  const user = JSON.parse(localStorage.getItem('user') || 'null')
  console.log('Stored token:', localStorage.getItem('token'))

  const username = user.username
  if (!username) return

  quizStore.submitAnswer(username)

  if (quizStore.quizFinished && quizStore.finalResult) {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      await axios.post(
        `${API_BASE}/result`,
        quizStore.finalResult,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      router.push('/result')
    } catch (error: any) {
      if (error.response?.status === 403) {
        alert('Session expired. Please login again.')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('/login')
        return
      }

      console.error('Failed to save result', error)
    }
  }
}
</script>