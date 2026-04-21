<template>
  <div class="article-gate" :class="{ 'is-locked': !isUnlocked }">
    <!-- 预览内容 -->
    <div v-if="preview" class="preview-content" v-html="preview"></div>

    <!-- 锁定状态 -->
    <div v-if="!isUnlocked" class="gate-ui">
      <div class="gate-background">
        <div class="gradient-orb"></div>
        <div class="glow-effect"></div>
      </div>

      <div class="gate-content">
        <div class="lock-illustration">
          <svg viewBox="0 0 100 100" class="lock-icon">
            <rect x="35" y="45" width="30" height="40" rx="4" fill="currentColor"/>
            <path d="M 40 45 v -15 a 10 10 0 0 1 20 0 v 15"
                  stroke="currentColor" stroke-width="4" fill="none"/>
            <circle cx="50" cy="65" r="3" fill="white"/>
            <path d="M 50 65 v 8" stroke="white" stroke-width="2"/>
          </svg>
        </div>

        <h3 class="gate-title">📕 继续阅读需要验证</h3>
        <p class="gate-description">
          关注公众号 <strong>{{ config.siteName }}</strong><br>
          回复关键词 <code>{{ config.keyword }}</code> 获取访问口令
        </p>

        <div v-if="config.qrCode" class="qr-container">
          <img :src="config.qrCode" :alt="config.siteName" class="qr-code">
        </div>

        <form @submit.prevent="verifyPasscode" class="passcode-form">
          <div class="input-group">
            <input
              v-model="inputCode"
              type="password"
              :placeholder="'请输入口令'"
              class="passcode-input"
              maxlength="20"
            >
            <button type="submit" class="submit-btn" :disabled="!inputCode">
              <svg viewBox="0 0 24 24" class="arrow-icon">
                <path d="M 5 12 L 19 12 M 19 12 L 13 6 M 19 12 L 13 18"
                      stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
            </button>
          </div>
        </form>

        <p v-if="error" class="error-message">{{ error }}</p>
        <p v-if="hint" class="hint-message">{{ hint }}</p>
      </div>
    </div>

    <!-- 解锁后的完整内容 -->
    <div v-if="isUnlocked" class="full-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'
import gateConfig from '../gateConfig.js'

const { frontmatter } = useData()
const isUnlocked = ref(false)
const inputCode = ref('')
const error = ref('')
const hint = ref('')
const preview = ref('')

const config = gateConfig

// 从 frontmatter 获取预览内容（如果有的话）
if (frontmatter.value.preview) {
  preview.value = frontmatter.value.preview
}

const verifyPasscode = () => {
  error.value = ''

  if (inputCode.value.length < 4) {
    error.value = '口令太短了'
    return
  }

  // 验证口令
  if (btoa(inputCode.value) === config.passcodeEncoded) {
    isUnlocked.value = true
    localStorage.setItem('article_gate_unlocked', 'true')

    // 成功反馈
    hint.value = '✓ 验证成功，本站所有文章已永久解锁'
    setTimeout(() => { hint.value = '' }, 3000)
  } else {
    error.value = '口令错误，请检查后重试'

    // 震动效果
    const form = document.querySelector('.passcode-input')
    if (form) {
      form.style.animation = 'shake 0.5s'
      setTimeout(() => { form.style.animation = '' }, 500)
    }
  }
}

onMounted(() => {
  // 检查是否已经解锁
  if (localStorage.getItem('article_gate_unlocked') === 'true') {
    isUnlocked.value = true
  }
})
</script>

<style scoped>
.article-gate {
  position: relative;
}

.preview-content {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px dashed var(--vp-c-divider);
}

.gate-ui {
  position: relative;
  padding: 3rem 2rem;
  border-radius: 20px;
  overflow: hidden;
  transform: translateZ(0);
}

.gate-background {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  pointer-events: none;
}

.gradient-orb {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, var(--vp-c-brand-1) 0%, transparent 70%);
  animation: float 6s ease-in-out infinite;
}

.glow-effect {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(var(--vp-c-brand-1), 0.2) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.gate-ui:hover .glow-effect {
  opacity: 1;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}

.gate-content {
  position: relative;
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}

.lock-illustration {
  margin-bottom: 2rem;
}

.lock-icon {
  width: 80px;
  height: 80px;
  color: var(--vp-c-brand-1);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.gate-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.gate-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.gate-description code {
  background: var(--vp-c-bg-soft);
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.qr-container {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.qr-code {
  width: 150px;
  height: 150px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
  padding: 0.5rem;
  background: white;
}

.passcode-form {
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
  background: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 0.25rem;
  transition: all 0.3s;
}

.input-group:focus-within {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-glow);
}

.passcode-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: var(--vp-c-text-1);
  outline: none;
}

.passcode-input::placeholder {
  color: var(--vp-c-text-3);
}

.submit-btn {
  width: 48px;
  height: 48px;
  border: none;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
  transform: scale(1.05);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.arrow-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s;
}

.submit-btn:hover .arrow-icon {
  transform: translateX(2px);
}

.error-message {
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  animation: fadeIn 0.3s;
}

.hint-message {
  color: #10b981;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.full-content {
  animation: fadeIn 0.5s;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .gate-ui {
    padding: 2rem 1.5rem;
  }

  .lock-icon {
    width: 60px;
    height: 60px;
  }

  .gate-title {
    font-size: 1.25rem;
  }

  .qr-code {
    width: 120px;
    height: 120px;
  }
}
</style>