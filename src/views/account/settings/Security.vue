<template>
  <div>
    <a-list
      itemLayout="horizontal"
      :dataSource="data"
    >
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description">
          <span class="security-list-description">{{ item.description }}</span>
          <span v-if="item.value"> : </span>
          <span class="security-list-value">{{ item.value }}</span>
        </span>
        </a-list-item-meta>
        <template v-if="item.actions">
          <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
        </template>

      </a-list-item>
    </a-list>

    <a-modal
      :title="changePassword.title"
      :visible="changePassword.visible"
      @cancel="handleCancel"
      @ok="handleChangePasswordOk"
      :confirmLoading="changePassword.loading"
    >
      <a-form :form="changePassword.form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='当前密码:'
          hasFeedback
        >
          <a-input placeholder='当前密码' @click="handlePasswordInputClick(1)" type="password" autocomplete="false" v-decorator="[
              'currentPassword',
             {initialValue:changePassword.formVal.currentPassword,rules: [{ required: true, message: '请输当前账户密码!'}]}
            ]"/>
        </a-form-item>

        <a-popover placement="top" trigger="click" :visible="state.passwordLevelChecked">
          <template slot="content">
            <div :style="{ width: '240px' }">
              <div :class="['change-password', passwordLevelClass]">强度：<span>{{ passwordLevelName }}</span></div>
              <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor "/>
              <div style="margin-top: 10px;">
                <span>请至少输入 6 个字符。需由大小写字母、特殊符号和数字组成。请不要使用容易被猜到的密码。</span>
              </div>
            </div>
          </template>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label='新密码:'
            hasFeedback
          >
            <a-input type="password" @click="handlePasswordInputClick(2)" autocomplete="false"
                     placeholder="至少6位密码，区分大小写" v-decorator="[
              'newPassword',
             {initialValue:changePassword.formVal.newPassword,rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }]}
            ]"></a-input>
          </a-form-item>
        </a-popover>
      </a-form>

    </a-modal>

    <a-modal
      :title="changePhoneNumber.title"
      :visible="changePhoneNumber.visible"
      @cancel="handleCancel"
      @ok="handleChangePhoneNumberOk"
      :confirmLoading="changePhoneNumber.loading"
    >
      <a-form :form="changePhoneNumber.form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='手机号:'
        >
          <a-input placeholder='11 位手机号' v-decorator="[
              'phoneNumber',
             {initialValue:changePhoneNumber.formVal.phoneNumber,rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }
            ]"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='验证码:'
        >
          <a-input-search placeholder="验证码" @search="getCaptcha" v-decorator="[
              'captchaResponse',
             {initialValue:changePhoneNumber.formVal.captchaResponse,rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}
            ]">
            <a-button :disabled="state.smsSendBtn" v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"
                      slot="enterButton"></a-button>
          </a-input-search>
        </a-form-item>
      </a-form>

    </a-modal>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import store from '@/store/'
  import {changePassWord, changePhoneNumber, getPhoneNumber} from '@/api/account'
  import {getSmsCaptcha} from '@/api/login'

  const levelNames = {
    0: '低',
    1: '低',
    2: '中',
    3: '强'
  }
  const levelClass = {
    0: 'error',
    1: 'error',
    2: 'warning',
    3: 'success'
  }
  const levelColor = {
    0: '#ff0000',
    1: '#ff0000',
    2: '#ff7e05',
    3: '#52c41a',
  }

  export default {
    data() {
      return {
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        changePassword: {
          form: this.$form.createForm(this),
          formVal: {
            currentPassword: '',
            newPassword: ''
          },
          title: '修改密码',
          visible: false,
          loading: false
        },
        changePhoneNumber: {
          form: this.$form.createForm(this),
          formVal: {
            phoneNumber: '',
            captchaResponse: ''
          },
          title: '修改手机',
          visible: false,
          loading: false
        },
        state: {
          time: 60,
          smsSendBtn: false,
          passwordLevel: 0,
          passwordLevelChecked: false,
          percent: 10,
          progressColor: '#FF0000'
        },
        data: [
          {
            title: '账户密码', description: '当前密码强度', value: '强', actions: {
              title: '修改', callback: () => {
                this.changePassword.visible = true;
              }
            }
          },/*
          { title: '密保问题' , description: '未设置密保问题，密保问题可有效保护账户安全', value: '', actions: { title: '设置', callback: () => { this.$message.error('This is a message of error'); } }  },
          { title: '备用邮箱' , description: '已绑定邮箱', value: 'ant***sign.com', actions: { title: '修改', callback: () => { this.$message.warning('This is message of warning'); } }  },
          { title: 'MFA 设备' , description: '未绑定 MFA 设备，绑定后，可以进行二次确认', value: '', actions: { title: '绑定', callback: () => { this.$message.info('This is a normal message'); } }  },*/
        ]
      }
    },
    computed: {
      ...mapState({
        isMobile: state => state.app.device === 'mobile',
      }),
      passwordLevelClass() {
        return levelClass[this.state.passwordLevel]
      },
      passwordLevelName() {
        return levelNames[this.state.passwordLevel]
      },
      passwordLevelColor() {
        return levelColor[this.state.passwordLevel]
      }
    },
    methods: {
      handleCancel() {
        this.changePassword.visible = false
        this.changePhoneNumber.visible = false
        if (this.changePassword.form) {
          this.changePassword.form.resetFields()
          this.handlePasswordInputClick(1)
        }
        if (this.changePhoneNumber.form) {
          this.changePhoneNumber.form.resetFields()
        }


      },
      async handleChangePasswordOk() {
        this.handlePasswordInputClick(1)
        let data = null
        this.changePassword.form.validateFields((err, values) => {
          if (!err) {
            data = values
          }
        })

        if (data) {
          this.changePassword.loading = true
          try {
            let res = await changePassWord(data)
            if (res.success) {
              let that = this
              this.$message.success('修改成功,请重新登录！', 3, function () {
                store.dispatch('Logout').then(() => {
                  that.$router.push('/users/login')
                })
              })
            }
          } catch (e) {
          }
          this.changePassword.loading = false
        }
      },
      handlePasswordLevel(rule, value, callback) {

        let level = 0

        // 判断这个字符串中有没有数字
        if (/[0-9]/.test(value)) {
          level++
        }
        // 判断字符串中有没有字母
        if (/[a-z]/.test(value) && /[A-Z]/.test(value)) {
          level++
        }
        // 判断字符串中有没有特殊符号
        if (/[^0-9a-zA-Z_]/.test(value)) {
          level++
        }
        this.state.passwordLevel = level
        this.state.percent = level * 30
        if (level >= 2) {
          if (level >= 3) {
            this.state.percent = 100
          }
          callback()
        } else {
          if (level === 0) {
            this.state.percent = 10
          }
          callback(new Error('密码强度不够'))
        }
      },
      handlePasswordInputClick(type) {
        if (!this.isMobile) {
          this.state.passwordLevelChecked = type == 2
          return;
        }
        this.state.passwordLevelChecked = false
      },
      handlePhoneCheck(rule, value, callback) {
        callback()
      },
      getCaptcha() {
        let that = this
        this.changePhoneNumber.form.validateFields(['phoneNumber'], {force: true},
          (err, values) => {
            if (!err) {
              this.state.smsSendBtn = true;

              let interval = window.setInterval(() => {
                if (that.state.time-- <= 0) {
                  that.state.time = 60;
                  that.state.smsSendBtn = false;
                  window.clearInterval(interval);
                }
              }, 1000);

              const hide = this.$message.loading('验证码发送中..', 0);

              getSmsCaptcha({phoneNumber: values.phoneNumber, type: 2}).then(res => {
                setTimeout(hide, 1);
                this.$notification['success']({
                  message: '提示',
                  description: '验证码获取成功，您的验证码为：' + res.result,
                  duration: 8
                })
              }).catch(err => {
                setTimeout(hide, 1);
                clearInterval(interval);
                that.state.time = 60;
                that.state.smsSendBtn = false;
              });
            }
          }
        );
      },
      async handleChangePhoneNumberOk() {
        let data = null
        this.changePhoneNumber.form.validateFields((err, values) => {
          if (!err) {
            data = values
          }
        })

        if (data) {
          this.changePhoneNumber.loading = true
          try {
            let res = await changePhoneNumber(data)
            if (res.success) {
              this.$message.success('绑定手机成功！')
              let phoneNumberVal = this.handlePhoneNumber(data.phoneNumber)
              this.data.forEach(function (n) {
                if (n.title == '绑定手机') {
                  n.value = phoneNumberVal
                  item.description='已绑定手机'
                  n.actions.title='修改'
                }
              })
              this.handleCancel()
            }
          } catch (e) {
          }
          this.changePhoneNumber.loading = false
        }
      },
      handlePhoneNumber(phoneNumber) {
        if(!phoneNumber||phoneNumber+''==''){
          return ''
        }
        return phoneNumber.substr(0, 3) + '****' + phoneNumber.substr(7, 4)
      }
    },
    async created() {
      let res = await getPhoneNumber()
      let item = {
        title: '绑定手机',
        description: '已绑定手机',
        value: '*******',
        actions: {
          title: '修改',
          callback: () => {
            this.changePhoneNumber.visible = true
          }
        }
      }

      if (res.success) {
        let phoneNumber = this.handlePhoneNumber(res.result)
        if(phoneNumber!=''){
          item.value=phoneNumber
        }else {
          item.description='未绑定手机'
          item.actions.title='添加'
        }
      }
      this.data.push(item)
    }
  }
</script>

<style lang="scss">
  .change-password {

    &.error {
      color: #ff0000;
    }

    &.warning {
      color: #ff7e05;
    }

    &.success {
      color: #52c41a;
    }
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }
</style>