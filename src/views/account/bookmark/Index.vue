<template>
  <a-card style="margin: -24px -24px 0 -24px;">
    <div class="page-menu-search">

      <a-input-group compact>
        <a-select v-model="searchOption" @change="onSearchOptionChange" size="large">
          <a-select-option value="1">百度</a-select-option>
          <a-select-option value="2">站内</a-select-option>
        </a-select>

        <a-auto-complete
          :dataSource="dataSource"
          @search="handleSearch"
          @select="onSelect"
          style="width: 80%; max-width: 522px;height: 2.5rem"
          size="large"
        >
          <a-input-search :placeholder="searchPlaceholder" size="large" @search="handleEnterSearch"
                          enterButton="Enter"/>
        </a-auto-complete>
      </a-input-group>


      <a-button-group size="large" style="margin-top: 1.2rem">
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="addOrEditBookmarkClass">
              <a-icon type="plus"/>
              新增
            </a-menu-item>
            <a-menu-item key="2" @click="editOrDeleteBookmarkClass">
              <a-icon type="edit"/>
              编辑
            </a-menu-item>
            <a-menu-item key="3" @click="editOrDeleteBookmarkClass">
              <a-icon type="delete"/>
              删除
            </a-menu-item>
            <a-menu-item v-if="bookmarkClass.edit||bookmarkClass.delete" key="4" @click="editOrDeleteBookmarkClass">
              <a-icon type="rollback"/>
              退出
            </a-menu-item>
          </a-menu>
          <a-button type="dashed">
            分类
            <a-icon type="down"/>
          </a-button>
        </a-dropdown>

        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="addOrEditBookmarkChannel">
              <a-icon type="plus"/>
              新增
            </a-menu-item>
            <a-menu-item key="2" @click="editOrDeleteBookmarkChannel">
              <a-icon type="edit"/>
              编辑
            </a-menu-item>
            <a-menu-item key="3" @click="editOrDeleteBookmarkChannel">
              <a-icon type="delete"/>
              删除
            </a-menu-item>
            <a-menu-item v-if="bookmarkChannel.edit||bookmarkChannel.delete" key="4"
                         @click="editOrDeleteBookmarkChannel">
              <a-icon type="rollback"/>
              退出
            </a-menu-item>
          </a-menu>
          <a-button type="dashed">
            频道
            <a-icon type="down"/>
          </a-button>
        </a-dropdown>
      </a-button-group>
    </div>
    <div class="page-menu-tabs">
      <a-tabs :tabPosition="mode" :activeKey="bookmarkClass.activeKey" @tabClick="handleBookmarkClassTabClick">
        <a-tab-pane v-for="item in bookmarkClasss" :key="item.id.toString()">
          <span slot="tab">
             {{item.className}}
            <a-icon v-if="bookmarkClass.edit" type="edit"/>
            <a-icon v-if="bookmarkClass.delete" type="delete"/>
      </span>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div>
      <a-row>
        <a-col :xs="7" :sm="5" :md="4" :lg="3" :xl="3">
          <a-tabs :activeKey="bookmarkChannel.activeKey" @tabClick="handleBookmarkChannelTabClick"
                  :tabPosition="tabPosition" v-if="bookmarkChannels.length>0" style="float: left;">
            <a-tab-pane v-for="item in bookmarkChannels" :key="item.id.toString()">
               <span slot="tab">
             {{getChannelName(item.channelName)}}
            <a-icon v-if="bookmarkChannel.edit" type="edit"/>
            <a-icon v-if="bookmarkChannel.delete" type="delete"/>
      </span>
            </a-tab-pane>
          </a-tabs>
        </a-col>
        <a-col :xs="17" :sm="19" :md="20" :lg="21" :xl="21">
          <a-list
            :grid="{ gutter: 12, lg: 4, md: 2, sm: 1, xs: 1 }"
            :dataSource="bookmarks">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <template v-if="item === null">
                <a-button class="new-btn" type="dashed" @click="addOrEditBookmark(null)">
                  <a-icon type="plus"/>
                  新增书签
                </a-button>
              </template>
              <template v-else>
                <a-card :hoverable="true">
                  <a-card-meta @click="openBookmark(item)">
                    <div style="margin-bottom: 3px" slot="title">
                      <a-tooltip placement="topLeft" >
                        <template slot="title">
                          <span>{{ item.title }}</span>
                        </template>
                        {{ item.title }}
                      </a-tooltip>
                    </div>
                    <a-avatar class="card-avatar" size="large" slot="avatar" :src="item.faviconUrl"/>
                    <div slot="description" class="card-description">
                      <a-tooltip >
                        <template slot="title">
                          <span> {{(item.remarks+'').length>0?item.remarks.trim():item.url.trim()}}</span>
                        </template>
                        {{(item.remarks+'').length>0?item.remarks.trim():item.url.trim()}}
                      </a-tooltip>
                    </div>
                  </a-card-meta>
                  <template class="ant-card-actions" slot="actions">
                    <a @click="handleDeleteBookmark(item)">
                      <a-icon type="delete"/>
                    </a>
                    <a @click="addOrEditBookmark(item)">
                      <a-icon type="edit"/>
                    </a>
                    <a-popover trigger="click">
                      <template slot="content">
                        <a-avatar shape="square" :size="128" :src="shareQRCode"/>
                      </template>
                      <a @click="createShareQRCode(item)">
                        <a-icon type="share-alt"/>
                      </a>
                    </a-popover>
                  </template>
                </a-card>
              </template>
            </a-list-item>
          </a-list>
        </a-col>
      </a-row>
    </div>

    <a-modal
      :title="bookmarkClass.title"
      :visible="bookmarkClass.visible"
      @cancel="handleCancel"
      @ok="handleBookmarkClassOk"
      :confirmLoading="bookmarkClass.loading"
    >
      <a-form :form="bookmarkClass.form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='分类名称:'
          hasFeedback
        >
          <a-input placeholder='分类名称' v-decorator="[
              'className',
             {initialValue:bookmarkClass.formVal.className,rules: [{ required: true, message: '请输入分类名称!'}]}
            ]"/>
        </a-form-item>
      </a-form>

    </a-modal>

    <a-modal
      :title="bookmarkChannel.title"
      :visible="bookmarkChannel.visible"
      @cancel="handleCancel"
      @ok="handleBookmarkChannelOk"
      :confirmLoading="bookmarkChannel.loading"
    >
      <a-form :form="bookmarkChannel.form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='频道名称:'
          hasFeedback
        >
          <a-input placeholder='频道名称' v-decorator="[
              'channelName',
             {initialValue:bookmarkChannel.formVal.channelName,rules: [{ required: true, message: '请输入频道名称!'}]}
            ]"/>
        </a-form-item>
      </a-form>

    </a-modal>

    <a-modal
      :title="bookmark.title"
      :visible="bookmark.visible"
      @cancel="handleCancel"
      @ok="handleBookmarkOk"
      :confirmLoading="bookmark.loading"
    >
      <a-form :form="bookmark.form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='网址:'
          hasFeedback
        >
          <a-input placeholder='网址' v-decorator="[
              'url',
             {initialValue:bookmark.formVal.url,rules: [{ required: true, message: '请输入网址!'},{ type: 'url', message: '请输入正确的网址!'}]}
            ]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='书签名称:'
          hasFeedback
        >
          <a-input placeholder='书签名称' v-decorator="[
              'title',
             {initialValue:bookmark.formVal.title}
            ]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='备注:'
          hasFeedback
        >
          <a-input placeholder='备注' v-decorator="[
              'remarks',
             {initialValue:bookmark.formVal.remarks}
            ]"/>
        </a-form-item>
      </a-form>

    </a-modal>

  </a-card>
</template>

<script>
  import {
    getAllBookmarkClass,
    getAllBookmarkChannel,
    getAllBookmark,
    createBookmarkClass,
    updateBookmarkClass,
    deleteBookmarkClass,
    createBookmarkChannel,
    updateBookmarkChannel,
    deleteBookmarkChannel,
    createBookmark,
    updateBookmark,
    deleteBookmark,
    getBookmarkWebSiteInfo,
    getBaiDuSuggestion
  } from "@/api/account"
  import _ from "lodash"
  import QRCode from 'qrcode'
  import config from '@/defaultSettings'

  export default {
    name: "BookMark",
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
        tabPosition: 'left',
        mode: 'top',
        shareQRCode: '',
        dataSource: [],
        searchOption: '1',
        searchPlaceholder: '百度一下，你就知道',
        bookmarkClasss: [],
        bookmarkChannels: [],
        bookmarks: [],
        bookmarkClass: {
          form: this.$form.createForm(this),
          formVal: {
            className: '',
            id: 0
          },
          title: '添加分类',
          visible: false,
          loading: false,
          edit: false,
          delete: false,
          activeKey: "0"
        },
        bookmarkChannel: {
          form: this.$form.createForm(this),
          formVal: {
            channelName: '',
            bookmarkClassId: 0,
            id: 0
          },
          title: '添加频道',
          visible: false,
          loading: false,
          edit: false,
          delete: false,
          activeKey: "0"
        },
        bookmark: {
          form: this.$form.createForm(this),
          formVal: {
            title: '',
            url: '',
            faviconUrl: '',
            remarks: '',
            bookmarkChannelId: 0,
            id: 0
          },
          defaultFaviconUrl: config.websiteUrl + '/bookmarks.png',
          title: '添加书签',
          visible: false,
          loading: false
        }
      }
    },
    computed: {},
    watch: {
      'bookmarkClass.activeKey': async function (newActiveKey, oldActiveKey) {
        await this.initBookmarkChannels()
      },
      'bookmarkChannel.activeKey': async function (newActiveKey, oldActiveKey) {
        await this.initBookmarks()
      }
    },
    methods: {
      openBookmarkUrl(value) {
        let url = this.searchOption == '1' ? 'https://www.baidu.com/s?wd=' + value : value
        window.open(url)
      },
      handleEnterSearch(value, event) {
        if (this.searchOption == '1') {
          this.openBookmarkUrl(value)
        }
      },
      onSearchOptionChange(value) {
        this.searchPlaceholder = value == '1' ? '百度一下,你就知道' : '站内搜索'
        this.dataSource = []
      },
      onSelect(value) {
        this.openBookmarkUrl(value)
      },
      async handleSearch(value) {
        if (this.searchOption == '1') {
          this.$jsonp('http://suggestion.baidu.com/su', {cb: 'setBaiDuSugDataSource', wd: value}).then(json => {
          }).catch(err => {
          })
        } else {
          if (value + '' == '') {
            this.dataSource = []
            return
          }

          try {
            let res = await getAllBookmark(0, value)
            if (res.success && res.result.items.length > 0) {
              this.dataSource = res.result.items.map(function (n) {
                return {value: n.url, text: n.title}
              })
            }
          } catch (e) {
            this.$message.error(e.message)
          }
        }
      },
      createShareQRCode(mark) {
        QRCode.toDataURL(mark.url)
          .then(url => {
            this.shareQRCode = url
          })
          .catch(err => {
            console.error(err)
          })
      },
      openBookmark(mark) {
        window.open(mark.url)
      },
      getChannelName(name) {
        if (name.length > 4) {
          return name.substr(0, 4) + '..'
        }
        return name
      },
      editOrDeleteBookmarkClass({key}) {
        this.bookmarkClass.edit = key == 2
        this.bookmarkClass.delete = key == 3 && this.bookmarkClasss.length > 1
      },
      editOrDeleteBookmarkChannel({key}) {
        this.bookmarkChannel.edit = key == 2
        this.bookmarkChannel.delete = key == 3 && this.bookmarkChannels.length > 1
      },
      addOrEditBookmarkClass({key}) {
        this.editOrDeleteBookmarkClass({key: 4})
        this.bookmarkClass.visible = true
        this.bookmarkClass.title = key == 1 ? '新增分类' : '编辑分类'
        if (key == 1) {
          this.bookmarkClass.formVal = {className: "", id: 0}
        } else {
          let activeKey = this.bookmarkClass.activeKey
          this.bookmarkClass.formVal = this.bookmarkClasss.find(function (bookmarkClass) {
            return bookmarkClass.id.toString() == activeKey
          })
        }
      },
      addOrEditBookmarkChannel({key}) {
        this.editOrDeleteBookmarkChannel({key: 4})
        this.bookmarkChannel.visible = true
        this.bookmarkChannel.title = key == 1 ? '新增频道' : '编辑频道'
        if (key == 1) {
          this.bookmarkChannel.formVal = {
            channelName: "",
            id: 0,
            bookmarkClassId: parseInt(this.bookmarkClass.activeKey)
          }
        } else {
          let activeKey = this.bookmarkChannel.activeKey
          this.bookmarkChannel.formVal = this.bookmarkChannels.find(function (bookmarkChannel) {
            return bookmarkChannel.id.toString() == activeKey
          })
        }
      },
      addOrEditBookmark(mark) {
        this.bookmark.visible = true
        this.bookmark.isDefaultFaviconUrl = false
        this.bookmark.title = mark == null ? '新增书签' : '编辑书签'
        this.bookmark.formVal = mark == null ? {
          title: '',
          url: '',
          faviconUrl: '',
          remarks: '',
          bookmarkChannelId: parseInt(this.bookmarkChannel.activeKey),
          id: 0
        } : mark
      },
      async removeBookmarkClass() {
        let flag
        let id = this.bookmarkClass.activeKey
        try {
          let res = await deleteBookmarkClass(id)
          flag = res.success
        } catch (e) {
          flag = false
        }

        if (flag) {
          this.$message.success('删除成功!')
          this.bookmarkClasss = _.remove(this.bookmarkClasss, function (n) {
            return n.id.toString() != id
          })
          this.bookmarkClass.activeKey = this.bookmarkClasss[0].id.toString()
        }
      },
      async removeBookmarkChannel() {
        let flag
        let id = this.bookmarkChannel.activeKey
        try {
          let res = await deleteBookmarkChannel(id)
          flag = res.success
        } catch (e) {
          flag = false
        }

        if (flag) {
          this.$message.success('删除成功!')
          this.bookmarkChannels = _.remove(this.bookmarkChannels, function (n) {
            return n.id.toString() != id
          })
          this.bookmarkChannel.activeKey = this.bookmarkChannels[0].id.toString()
        }
      },
      async removeBookmark(id) {
        let flag
        try {
          let res = await deleteBookmark(id)
          flag = res.success
        } catch (e) {
          flag = false
        }

        if (flag) {
          this.$message.success('删除成功!')
          this.bookmarks = _.remove(this.bookmarks, function (n) {
            return !n || n.id != id
          })
        }
      },
      async handleBookmarkClassOk() {
        let data = null
        let formVal = this.bookmarkClass.formVal
        this.bookmarkClass.form.validateFields((err, values) => {
          if (!err) {
            data = Object.assign({}, formVal, values)
          }
        })

        if (data) {
          this.bookmarkClass.loading = true
          let flag
          let item = null
          try {
            let res = data.id == 0 ? await createBookmarkClass(data) : await updateBookmarkClass(data)
            flag = res.success
            item = res.result
          } catch (e) {
            flag = false
          }

          this.bookmarkClass.loading = false
          if (flag) {
            let message = ''
            if (data.id == 0) {
              message = '添加成功!'
              this.bookmarkClasss.unshift(item)
              this.bookmarkClass.activeKey = item.id.toString()
            } else {
              message = '编辑成功!'
              let bmClass = this.bookmarkClasss.find(function (bookmarkClass) {
                return bookmarkClass.id == data.id
              })
              bmClass = Object.assign(bmClass, item)
            }
            this.$message.success(message)
            this.bookmarkClass.form.resetFields()
            this.handleCancel()
          }
        }
      },
      async handleBookmarkChannelOk() {
        let data = null
        let formVal = this.bookmarkChannel.formVal
        this.bookmarkChannel.form.validateFields((err, values) => {
          if (!err) {
            data = Object.assign({}, formVal, values)
          }
        })

        if (data) {
          this.bookmarkChannel.loading = true
          let flag
          let item = null
          try {
            let res = data.id == 0 ? await createBookmarkChannel(data) : await updateBookmarkChannel(data)
            flag = res.success
            item = res.result
          } catch (e) {
            flag = false
          }

          this.bookmarkChannel.loading = false
          if (flag) {
            let message = ''
            if (data.id == 0) {
              message = '添加成功!'
              this.bookmarkChannels.unshift(item)
              this.bookmarkChannel.activeKey = item.id.toString()
            } else {
              message = '编辑成功!'
              let bmChannel = this.bookmarkChannels.find(function (bookmarkChannel) {
                return bookmarkChannel.id == data.id
              })
              bmChannel = Object.assign(bmChannel, item)
            }
            this.$message.success(message)
            this.bookmarkChannel.form.resetFields()
            this.handleCancel()
          }
        }
      },
      async handleBookmarkOk() {
        let data = null
        let formVal = this.bookmark.formVal
        this.bookmark.form.validateFields((err, values) => {
          if (!err) {
            data = Object.assign({}, formVal, values)
          }
        })


        if (data) {
          this.bookmark.loading = true
          let flag
          let item = null
          try {
            let res1 = await getBookmarkWebSiteInfo({url: data.url})
            let webSiteInfo = res1.result
            data.faviconUrl = webSiteInfo.faviconUrl + "" == "" ? this.bookmark.defaultFaviconUrl : webSiteInfo.faviconUrl
            if(data.title + '' == ''){
              if(webSiteInfo.title+''==''){
                this.$message.error('自动获取书签名称失败,请输入名称或重试！')
                this.bookmark.loading = false
                return
              }else {
                data.title = webSiteInfo.title
              }
            }
            if (data.remarks + "" == "") {
              data.remarks = webSiteInfo.description
            }

            let res2 = data.id == 0 ? await createBookmark(data) : await updateBookmark(data)
            flag = res2.success
            item = res2.result
          } catch (e) {
            flag = false
          }

          this.bookmark.loading = false
          if (flag) {
            let message = ''
            if (data.id == 0) {
              message = '添加成功!'
              this.bookmarks.push(item)
            } else {
              message = '编辑成功!'
              let bm = this.bookmarks.find(function (mark) {
                return mark && mark.id == data.id
              })
              bm = Object.assign(bm, item)
            }
            this.$message.success(message)
            this.bookmark.form.resetFields()
            this.handleCancel()
          }
        }
      },
      handleCancel: function () {
        this.bookmarkClass.visible = false
        this.bookmarkChannel.visible = false
        this.bookmark.visible = false
      },
      async handleBookmarkClassTabClick(activeKey) {
        this.bookmarkClass.activeKey = activeKey
        if (this.bookmarkClass.edit) {
          this.addOrEditBookmarkClass({key: 2})
        } else if (this.bookmarkClass.delete) {
          let that = this
          that.$confirm({
            title: '确定删除该书签分类?',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
              that.removeBookmarkClass()
            }
          })
        }
      },
      async handleBookmarkChannelTabClick(activeKey) {
        this.bookmarkChannel.activeKey = activeKey
        if (this.bookmarkChannel.edit) {
          this.addOrEditBookmarkChannel({key: 2})
        } else if (this.bookmarkChannel.delete) {
          let that = this
          that.$confirm({
            title: '确定删除该书签频道?',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
              that.removeBookmarkChannel()
            }
          })
        } else {
          await this.initBookmarks()
        }
      },
      async handleDeleteBookmark(item) {
        let that = this
        let id = item.id
        that.$confirm({
          title: '确定删除该书签?',
          okText: '是',
          okType: 'danger',
          cancelText: '否',
          onOk() {
            that.removeBookmark(id)
          }
        })
      },
      async initBookmarkClass() {
        let res = await getAllBookmarkClass()
        this.bookmarkClasss = res.result.items
        if (this.bookmarkClasss.length > 0) {
          this.bookmarkClass.activeKey = this.bookmarkClasss[0].id.toString()
        }
      },
      async initBookmarkChannels() {
        if (this.bookmarkClasss.length == 0) {
          this.bookmarkChannels = []
          return
        }
        let res = await getAllBookmarkChannel(this.bookmarkClass.activeKey)
        this.bookmarkChannels = res.result.items.length > 0 ? res.result.items : []
        this.bookmarkChannel.activeKey = res.result.items.length > 0 ? this.bookmarkChannels[0].id.toString() : '0'
      },
      async initBookmarks() {
        if (this.bookmarkChannels.length == 0) {
          this.bookmarks = []
          return
        }
        let res = await getAllBookmark(this.bookmarkChannel.activeKey)
        let activeKey = parseInt(this.bookmarkChannel.activeKey)
        this.bookmarks = res.result.items.map(function (item) {
          item.bookmarkChannelId = activeKey
          return item
        })
        this.bookmarks.unshift(null)
      }
    },
    async created() {
      let that = this
      window.setBaiDuSugDataSource = function (data) {
        that.dataSource = data.s
      }
      await that.initBookmarkClass()
    }
  }
</script>
<style lang="scss">
  .page-menu-search {
    text-align: center;
    margin-bottom: 16px;
  }

  .page-menu-tabs {
    margin-top: 1.5rem;
  }

  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 65px;
    line-height: 22px;
    overflow: hidden;
    word-wrap: break-word
  }

  .new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 187px;
  }
</style>