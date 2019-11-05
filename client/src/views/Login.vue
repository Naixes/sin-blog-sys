<template>
  <div class="about">
    <h1>This is an login page</h1>
    <form :action="`${baseUrl}api/user/login`" method="POST" ref="loginForm">
      <label for="username">账号：</label>
      <input type="text" id="username" name="username" placeholder="请输入账号名">
      <label for="password">密码：</label>
      <input type="password" id="password" name="password" placeholder="请输入密码">
      <button @click="login">登录</button>
    </form>
  </div>
</template>
<script>
import ajax from '@/lib/ajax'
import {baseUrl} from '@/config.js'
export default {
  data() {
    return {
      baseUrl
    }
  },
  methods: {
    async login(e) {
      e.preventDefault()
      let form = this.$refs.loginForm
      let result = await ajax(form)
      console.log(result)
      this.$router.replace('/')
    }
  }
}
</script>
