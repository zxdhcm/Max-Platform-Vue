<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">

        <a-form layout="vertical" :form="form">
          <a-form-item
            label='用户名:'
            hasFeedback
          >
            <a-input placeholder='用户名' v-decorator="[
              'userName',
             {initialValue:user.userName, rules: [{ required: true, message: '请输入用户名!'}]}
            ]"/>
          </a-form-item>
          <a-form-item
            label='名字:'
            hasFeedback
          >
            <a-input placeholder="给自己起个名字" v-decorator="[
              'name',
             {initialValue:user.name, rules: [{ required: true, message: '请输入名字!'}]}
            ]"/>
          </a-form-item>
          <a-form-item
            label='姓氏:'
            hasFeedback
          >
            <a-input placeholder='姓氏' v-decorator="[
              'surname',
             {initialValue:user.surname}
            ]"/>
          </a-form-item>

          <a-form-item
            label='邮箱:'
            hasFeedback
          >
            <a-input placeholder="exp@admin.com" v-decorator="[
              'emailAddress',
             {initialValue:user.emailAddress, rules: [{type: 'email', message: '请输入正确的邮箱!',}, {required: true, message: '请输入邮箱!'}]}
            ]"/>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="handleOk" :loading="loading">提交</a-button>
          </a-form-item>
        </a-form>

      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="randomAvatar">
          <a-icon type="sync" class="upload-icon"/>
          <!--<div class="mask">
            <a-icon type="plus" />
          </div>-->
          <img :src="avatarUrl"/>
        </div>
      </a-col>

    </a-row>

    <avatar-modal ref="modal">

    </avatar-modal>
  </div>
</template>

<script>
  import AvatarModal from './AvatarModal'
  import store from '@/store/'
  import {mapState} from 'vuex'
  import {updateUser, getUser} from "@/api/user"

  export default {
    components: {
      AvatarModal
    },
    data() {
      return {
        // cropper
        preview: {},
        avatarUrl: '',
        loading: false,
        user: {
          userName: '',
          name: '',
          surname: '',
          emailAddress: '',
          avator: '',
          id: 0
        },
        form: this.$form.createForm(this),
        option: {
          img: '/avatar2.jpg',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 180,
          autoCropHeight: 180,
          fixedBox: true,
          // 开启宽度和高度比例
          fixed: true,
          fixedNumber: [1, 1]
        }
      }
    },
    computed: {
      ...mapState({
        userSession: state => state.user.session
      })
    },
    methods: {
      randomAvatar() {
        //parseInt(Math.random()*(max-min+1)+min,10);
        this.user.avator = 'HeadPortrait' + parseInt(Math.random() * (1088 - 1 + 1) + 1, 10) + '.jpg'
        this.avatarUrl = '/avator/' + this.user.avator
      },
      async handleOk() {
        let data = null
        this.form.validateFields((err, values) => {
          if (!err) {
            data = Object.assign({}, this.user, values)
          }
        })

        if (data) {
          this.loading = true
          try {
            let res = await updateUser(data)
            if (res.success) {
              this.user = Object.assign(this.user, res.result)
              store.commit('SET_AVATAR', this.user.avator)
              this.$message.success('修改成功!')
            }
          } catch (e) {
          }
          this.loading = false
        }
      },
    },
    async created() {
      let res = await getUser(this.userSession.userId)
      if (res.success) {
        this.user = Object.assign(this.user, res.result)
        this.avatarUrl = '/avator/' + this.user.avator
      }
    }
  }
</script>

<style lang="scss" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }

    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>