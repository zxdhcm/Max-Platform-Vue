<template>
  <div>
    <a-modal
      title="添加角色"
      :width="600"
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
          label='角色名称:'
          hasFeedback
        >
          <a-input placeholder='角色名称' v-decorator="[
              'name',
             {rules: [{ required: true, message: '请输入角色名称!'}]}
            ]"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='显示名称:'
          hasFeedback
        >
          <a-input placeholder='显示名称' v-decorator="[
              'displayName',
             {rules: [{ required: true, message: '请输入显示名称!'}]}
            ]"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='角色描述:'
          hasFeedback>
          <a-input placeholder='角色描述' v-decorator="['description']"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='角色权限:'
        >
          <a-checkbox-group :options="permissions" v-decorator="[
              'permissions',
            {initialValue:[]}
            ]"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
  import {createRole} from "@/api/role"

  export default {
    props: ['permissions', 'visible'],
    data() {
      return {
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
            let res = await createRole(data)
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
      }
    }
  }
</script>
