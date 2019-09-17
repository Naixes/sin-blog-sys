<template>
  <div class="about">
    <h1>This is an login page</h1>
    <form :action="`${baseUrl}api/login`" method="POST" ref="loginForm">
      <label for="account">账号：</label><input type="text" id="account" name="account" placeholder="请输入账号名">
      <label for="account">密码：</label><input type="password" id="password" name="password" placeholder="请输入密码">
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
    async login() {
      let form = this.$refs.loginForm
      let result = await ajax(form)
    }
  }
}
</script>
