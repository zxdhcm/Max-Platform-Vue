<template>
  <div class="footer">
    <div class="links">
      <a href="https://github.com/zxdhcm/Max-Platform-Vue" target="_blank">
        <a-icon type="github"/>
      </a>
      <a href="https://pro.ant.design/" target="_blank">Ant Design Vue Pro</a>
      <a href="https://ant.design/" target="_blank">Ant Design</a>
      <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/" target="_blank">Vue Antd</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright"/>
      {{year}} <span>Max Platform lnc.ALL Rights Reserved</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LayoutFooter",
    data() {
      return {
        year: new Date().getFullYear()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .footer {
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;

    .links {
      margin-bottom: 8px;

      a {
        color: rgba(0, 0, 0, .45);

        &:hover {
          color: rgba(0, 0, 0, .65);
        }

        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }

    .copyright {
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
    }
  }
</style>