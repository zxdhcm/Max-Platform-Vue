<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :autoFormCreate="(form)=>{this.form = form}">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="角色名称:" fieldDecoratorId="Name">
              <a-input placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="显示名称:" fieldDecoratorId="DisplayName">
              <a-input placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="角色描述:" fieldDecoratorId="Description">
              <a-input placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="handleSearch">查询</a-button>
              <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="user-add" @click="handleCreate">新建</a-button>
    </div>
    <s-table :columns="columns" :data="loadData" ref="table">
      <div
        slot="expandedRowRender"
        slot-scope="record"
        style="margin: 0">
        <a-row
          :gutter="24"
          :style="{ marginBottom: '4px' }">
          <a-col :span="12" :style="{ marginBottom: '4px' }">
            <a-col :span="4">
              <span>角色权限：</span>
            </a-col>
            <a-col :span="20" v-if="record.permissions.length > 0">
              <a-tag color="cyan" v-for="(permission) in record.permissions">{{ getPermissionName(permission) }}</a-tag>
            </a-col>
            <a-col :span="20" v-else>-</a-col>
          </a-col>
        </a-row>
      </div>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical"/>
        <a-popconfirm title="确定删除该角色?" @confirm="handleDelete(record)" okText="确定" cancelText="取消">
    <a href="#">删除</a>
  </a-popconfirm>
      </span>
    </s-table>
    <update-role :visible="updateModalShow" :roleData="roleData" :permissions="permissions"
                 @save-success="handleSaveSuccess" @close="closeOrOpenModal(2,false)"></update-role>
    <create-role :visible="createModalShow" :permissions="permissions" @save-success="handleSaveSuccess"
                 @close="closeOrOpenModal(1,false)"></create-role>
  </a-card>
</template>

<script>
  import STable from '@/components/table/'
  import UpdateRole from './UpdateRole.vue'
  import CreateRole from './CreateRole.vue'
  import {getAllRole, getAllPermissions, deleteRole} from "@/api/role"
  import {createPageListResult} from '@/utils/util'

  export default {
    name: "RoleList",
    components: {
      STable,
      UpdateRole,
      CreateRole
    },
    data() {
      return {
        description: '',
        form: null,
        permissions: [],
        updateModalShow: false,
        createModalShow: false,
        roleData: {},
        // 表头
        columns: [
          {
            title: '角色名称',
            dataIndex: 'name'
          },
          {
            title: '显示名',
            dataIndex: 'displayName'
          },
          {
            title: '描述',
            dataIndex: 'description'
          },
          {
            title: '操作',
            width: '150px',
            dataIndex: 'action',
            scopedSlots: {customRender: 'action'},
          }
        ],
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          let queryParam = this.createPageRequest(parameter)
          return getAllRole(queryParam)
            .then(res => {
              let result = createPageListResult(res, parameter)
              return result
            })
        }
      }
    },
    methods: {
      handleEdit(record) {
        this.roleData = Object.assign({}, record)
        this.updateModalShow = true
      },
      handleCreate() {
        this.createModalShow = true
      },
      async handleDelete(record) {
        let falg
        try {
          let res = await deleteRole(record.id)
          falg = res.success
        } catch (e) {
          falg = false
        }

        if (falg) {
          this.$refs.table.refresh()
          this.$message.success('删除成功!')
        }
      },
      handleReset() {
        this.form.resetFields()
      },
      handleSearch() {
        this.$refs.table.refresh()
      },
      handleSaveSuccess() {
        this.form.resetFields()
        this.$refs.table.refresh()
      },
      createPageRequest(parameter) {
        let formValues = this.form.getFieldsValue()
        let where = []
        if (formValues.Name && formValues.Name + '' !== '') {
          where.push('Name.Contains("' + formValues.Name + '") ')
        }
        if (formValues.DisplayName && formValues.DisplayName + '' !== '') {
          where.push('DisplayName.Contains("' + formValues.DisplayName + '") ')
        }
        if (formValues.Description && formValues.Description + '' !== '') {
          where.push('Description.Contains("' + formValues.Description + '") ')
        }
        let pagerequest = {
          maxResultCount: parameter.pageSize,
          skipCount: (parameter.pageNo - 1) * parameter.pageSize,
          where: where.length > 0 ? where.join(' AND ') : ''
        }
        return pagerequest
      },
      closeOrOpenModal(type, falg) {
        if (type === 1) {
          this.createModalShow = falg
        } else {
          this.updateModalShow = falg
        }
      },
      getPermissionName(val) {
        let permission = this.permissions.find(function (n) {
          return n.value == val
        })
        return permission.label
      }
    },
    async created() {
      let res = await getAllPermissions()
      this.permissions = res.result.items.map(function (permission) {
        return {label: permission.displayName, value: permission.name}
      })
    }
  }
</script>