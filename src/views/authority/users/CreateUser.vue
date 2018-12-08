<template>
  <div>
    <a-modal
      title="添加用户"
      :width="800"
      :visible="visible"
      :maskClosable="false"
      @cancel="handleCancel"
      @ok="handleOk"
      :confirmLoading="loading"
    >
      <a-form :form="form">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='用户名:'
          hasFeedback
        >
          <a-input placeholder='用户名' v-decorator="[
              'userName',
             {rules: [{ required: true, message: '请输入用户名!'}]}
            ]"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='名字:'
          hasFeedback
        >
          <a-input placeholder='起一个名字' v-decorator="[
              'name',
             {rules: [{ required: true, message: '请输入名字!'}]}
            ]"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='姓氏:'
          hasFeedback
          fieldDecoratorId="surname"
        >
          <a-input placeholder='姓氏' v-decorator="['surname']"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='邮箱:'
          hasFeedback
        >
          <a-input placeholder='邮箱' v-decorator="[
              'emailAddress',
             {rules: [{type: 'email', message: '请输入正确的邮箱!'}, {required: true, message: '请输入邮箱!'}]}
            ]"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='密码:'
          hasFeedback
        >
          <a-input placeholder='密码' type='password' v-decorator="[
              'password',
             {rules: [{validator: this.validateToNextPassword},{required: true, message: '请输入密码!'}]}
            ]"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='确认密码:'
          hasFeedback
        >
          <a-input placeholder='确认密码' type='password' onBlur="{this.handleConfirmBlur}" v-decorator="[
              'confirmPassword',
             {rules: [{validator: this.compareToFirstPassword},{required: true, message: '请再次输入密码!'}]}
            ]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='用户角色:'
        >
          <a-checkbox-group :options="roles" v-decorator="[
              'roleNames',
             {initialValue:[]}
            ]"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='启用:'
        >
          <a-checkbox v-decorator="[
              'isActive',
             {initialValue:false,valuePropName:'checked'}
            ]"></a-checkbox>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
  import {createUser} from "@/api/user"

  export default {
    props: ['roles', 'visible'],
    data() {
      return {
        confirmDirty: false,
        form: this.$form.createForm(this),
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        loading: false
      }
    },
    methods: {
      async handleOk() {
        let data = null
        this.form.validateFields((err, values) => {
          if (!err) {
            data = values
          }
        })

        if (data) {
          this.loading = true
          let falg
          try {
            let res = await createUser(data)
            falg = res.success
          } catch (e) {
            falg = false
          }

          this.loading = false
          if (falg) {
            this.$message.success('添加成功!')
            this.form.resetFields()
            this.$emit('save-success')
            this.$emit('close')
          }
        }
      },
      handleCancel() {
        this.form.resetFields()
        this.$emit('close')
      },
      compareToFirstPassword(rule, value, callback) {
        const form = this.form
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不匹配!')
        } else {
          callback()
        }
      },
      handleConfirmBlur(e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      },
      validateToNextPassword(rule, value, callback) {
        const form = this.form
        if (value && this.confirmDirty) {
          form.validateFields(['confirmPassword'], {force: true})
        }
        callback()
      }
    }
  }
</script>
