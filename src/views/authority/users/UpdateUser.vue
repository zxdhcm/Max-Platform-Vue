<template>
  <div>
    <a-modal
      title="修改用户"
      :width="800"
      :visible="visible"
      :maskClosable="false"
      @cancel="handleCancel"
      @ok="handleOk"
      :confirmLoading="loading"
    >
      <a-form :autoFormCreate="(form)=>{this.form = form}">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='用户名:'
          hasFeedback
          fieldDecoratorId="userName"
          :fieldDecoratorOptions="{initialValue:userData.userName, rules: [{ required: true, message: '请输入用户名!'}]}"
        >
          <a-input placeholder='用户名'/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='名字:'
          hasFeedback
          fieldDecoratorId="name"
          :fieldDecoratorOptions="{initialValue:userData.name, rules: [{ required: true, message: '请输入名字!'}]}"
        >
          <a-input placeholder='起一个名字'/>
        </a-form-item>


        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='姓氏:'
          hasFeedback
          fieldDecoratorId="surname"
          :fieldDecoratorOptions="{initialValue:userData.surname}"
        >
          <a-input placeholder='姓氏'/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='邮箱:'
          hasFeedback
          fieldDecoratorId="emailAddress"
          :fieldDecoratorOptions="{initialValue:userData.emailAddress, rules: [{type: 'email', message: '请输入正确的邮箱!',}, {required: true, message: '请输入邮箱!'}]}"
        >
          <a-input placeholder='邮箱'/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='用户角色:'
          fieldDecoratorId="roleNames"
          :fieldDecoratorOptions="{initialValue:userData.roleNames}"
        >
          <a-checkbox-group :options="roles"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='启用:'
          fieldDecoratorId="isActive"
          :fieldDecoratorOptions="{initialValue:userData.isActive}"
        >
          <a-checkbox :defaultChecked="userData.isActive"></a-checkbox>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
  import {updateUser} from "@/api/user"

  export default {
    props: ['roles', 'visible', 'userData'],
    data() {
      return {
        form: null,
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
            data = Object.assign({}, this.userData, values)
          }
        })

        if (data) {
          this.loading = true
          let falg
          try {
            let res = await updateUser(data)
            falg = res.success
          } catch (e) {
            falg = false
          }

          this.loading = false
          if (falg) {
            this.$message.success('修改成功!')
            this.form.resetFields()
            this.$emit('save-success')
            this.$emit('close')
          }
        }
      },
      handleCancel() {
        this.form.resetFields()
        this.$emit('close')
      }
    }
  }
</script>
