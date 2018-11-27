<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :autoFormCreate="(form)=>{this.form = form}">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="用户名:" fieldDecoratorId="userName">
              <a-input placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="姓名:" fieldDecoratorId="name">
              <a-input placeholder=""/>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="是否启用:" fieldDecoratorId="isActive" :fieldDecoratorOptions="{initialValue:'0'}">
                <a-select placeholder="请选择">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">是</a-select-option>
                  <a-select-option value="2">否</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="创建时间:" fieldDecoratorId="creationTime">
                <a-range-picker style="width: 100%"/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons"
                  :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="handleSearch">查询</a-button>
              <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
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
              <span>用户角色：</span>
            </a-col>
            <a-col :span="20" v-if="record.roleNames.length > 0">
              <a-tag color="cyan" v-for="(role) in record.roleNames">{{ role }}</a-tag>
            </a-col>
            <a-col :span="20" v-else>-</a-col>
          </a-col>
        </a-row>
      </div>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical"/>
        <a-popconfirm title="确定删除该用户?" @confirm="handleDelete(record)" okText="确定" cancelText="取消">
    <a href="#">删除</a>
  </a-popconfirm>
      </span>
    </s-table>
    <update-user :visible="updateModalShow" :userData="userData" :roles="roles" @save-success="handleSaveSuccess"
                 @close="closeOrOpenModal(2,false)"></update-user>
    <create-user :visible="createModalShow" :roles="roles" @save-success="handleSaveSuccess"
                 @close="closeOrOpenModal(1,false)"></create-user>
  </a-card>
</template>

<script>
  import STable from '@/components/table/'
  import UpdateUser from './UpdateUser.vue'
  import CreateUser from './CreateUser.vue'
  import {getAllUser, getRoles, deleteUser} from "@/api/user"
  import {createPageListResult} from '@/utils/util'

  export default {
    name: "UserList",
    components: {
      STable,
      UpdateUser,
      CreateUser
    },
    data() {
      return {
        description: '',
        form: null,
        roles: [],
        updateModalShow: false,
        createModalShow: false,
        userData: {},
        // 高级搜索 展开/关闭
        advanced: false,
        // 表头
        columns: [
          {
            title: '用户名',
            dataIndex: 'userName'
          },
          {
            title: '姓名',
            customRender: (text, record) => {
              return record.surname + record.name
            }
          },
          {
            title: '启用状态',
            customRender: (text, record) => {
              return record.isActive ? '正常' : '禁用'
            }
          },
          {
            title: '创建时间',
            customRender: (text, record) => {
              return new Date(record.creationTime).toLocaleString()
            }
          },
          {
            title: '最后登录时间',
            customRender: (text, record) => {
              return new Date(record.lastLoginTime).toLocaleString()
            }
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
          return getAllUser(queryParam)
            .then(res => {
              let result = createPageListResult(res, parameter)
              return result
            })
        }
      }
    },
    methods: {
      handleEdit(record) {
        this.userData = Object.assign({}, record)
        this.updateModalShow = true
      },
      handleCreate() {
        this.createModalShow = true
      },
      async handleDelete(record) {
        let falg
        try {
          let res = await deleteUser(record.id)
          falg = res.success
        } catch (e) {
          falg = false
        }

        if (falg) {
          this.$refs.table.refresh()
          this.$message.success('删除成功!')
        }
      },
      toggleAdvanced() {
        this.advanced = !this.advanced
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
        if (formValues.userName && formValues.userName + '' !== '') {
          where.push('UserName.Contains("' + formValues.userName + '") ')
        }
        if (formValues.name && formValues.name + '' !== '') {
          where.push('Name.Contains("' + formValues.name + '") ')
        }
        if (formValues.isActive && formValues.isActive != '0') {
          where.push('IsActive=' + (formValues.isActive == '1').toString())
        }
        let creationTimes = formValues.creationTime
        if (creationTimes && creationTimes.length > 1) {
          where.push('(CreationTime>= DateTime(' + creationTimes[0].format("YYYY,MM,DD") + ') AND CreationTime<= DateTime(' + creationTimes[1].format("YYYY,MM,DD") + '))')
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
      }
    },
    async created() {
      let res = await getRoles()
      this.roles = res.result.items.map(function (role) {
        return {label: role.displayName, value: role.normalizedName}
      })
    }
  }
</script>