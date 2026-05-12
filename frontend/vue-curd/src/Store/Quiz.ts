import { defineStore } from 'pinia'

interface Question {
  id: number
  question: string
  options: string[]
  answer: string
}

interface AnsweredItem {
  question: string
  selected: string
  correct: string
  isCorrect: boolean
}

interface FinalResult {
  username: string
  answeredQuestionCount: number
  totalQuestions: number
  correctAnswerCount: number
  percentage: number
}

interface QuizState {
  questions: Question[]
  currentIndex: number
  selectedAnswer: string
  score: number
  answered: AnsweredItem[]
  quizFinished: boolean
  finalResult: FinalResult | null
}

export const useQuizStore = defineStore('quiz', {
  state: (): QuizState => ({
    questions: [
      { id: 1, question: 'React is a ?', options: ['language', 'framework', 'jslibrary', 'none'], answer: 'jslibrary' },
      { id: 2, question: 'Which is a frontend framework?', options: ['Laravel', 'React', 'Express', 'MySQL'], answer: 'React' },
      { id: 3, question: 'Which language runs in browser?', options: ['C++', 'Java', 'JavaScript', 'Python'], answer: 'JavaScript' },
      { id: 4, question: 'Vue is mainly used for?', options: ['Database', 'Frontend', 'Server', 'Networking'], answer: 'Frontend' },
      { id: 5, question: 'Which one is a CSS framework?', options: ['Bootstrap', 'Node', 'Sequelize', 'JWT'], answer: 'Bootstrap' },
      { id: 6, question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Text Markup Language', 'Home Tool Markup Language', 'None'], answer: 'Hyper Text Markup Language' },
      { id: 7, question: 'Which one is backend runtime?', options: ['Vue', 'Node.js', 'CSS', 'HTML'], answer: 'Node.js' },
      { id: 8, question: 'Which method is used to send data to backend?', options: ['GET', 'POST', 'PATCH', 'DELETE'], answer: 'POST' },
      { id: 9, question: 'JWT is used for?', options: ['Styling', 'Authentication', 'Routing', 'Animation'], answer: 'Authentication' },
      { id: 10, question: 'Pinia is used for?', options: ['State management', 'Database', 'Routing', 'Testing'], answer: 'State management' },
       { id: 11, question: 'Java is a pure object orient programming?', options: ['Yes', 'No', 'none'], answer: 'No' }
    ],
    currentIndex: 0,
    selectedAnswer: '',
    score: 0,
    answered: [],
    quizFinished: false,
    finalResult: null
  }),
  getters: {
    currentQuestion: (state) => state.questions[state.currentIndex],
    totalQuestions: (state) => state.questions.length,
    isLastQuestion: (state) => state.currentIndex === state.questions.length - 1
  },
  actions: {
    selectAnswer(answer: string) {
      this.selectedAnswer = answer
    },

    submitAnswer(username: string) {
      if (this.quizFinished) return

      const current = this.currentQuestion
      const isCorrect = this.selectedAnswer === current.answer

      this.answered.push({
        question: current.question,
        selected: this.selectedAnswer,
        correct: current.answer,
        isCorrect
      })

      if (isCorrect) {
        this.score++
      }

      this.selectedAnswer = ''

      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++
      } else {
        this.quizFinished = true

        this.finalResult = {
          username,
          answeredQuestionCount: this.answered.length,
          totalQuestions: this.questions.length,
          correctAnswerCount: this.score,
          percentage: Math.min(100, Math.round((this.score / this.questions.length) * 100))
        }
      }
    },

    resetQuiz() {
      this.currentIndex = 0
      this.selectedAnswer = ''
      this.score = 0
      this.answered = []
      this.quizFinished = false
      this.finalResult = null
    }
  }
})