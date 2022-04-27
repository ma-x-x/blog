<template>
  <div class="app-container">
    <el-row :gutter="24">
      <!-- 用户数据 -->
      <el-col :span="24" :xs="24">
        <el-card class="box-card">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item>
              <el-button v-hasPerm="['sys:user:add']" type="success" :icon="Plus" @click="handleAdd"> 新增 </el-button>
              <el-button
                v-hasPerm="['sys:user:delete']"
                type="danger"
                :icon="Delete"
                :disabled="multiple"
                @click="handleDelete"
              >
                删除
              </el-button>
            </el-form-item>

            <el-form-item prop="keywords">
              <el-input
                v-model="queryParams.keywords"
                placeholder="用户名/昵称/手机号"
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>

            <el-form-item prop="status">
              <el-select v-model="queryParams.status" placeholder="用户状态" clearable style="width: 200px">
                <el-option label="正常" value="1" />
                <el-option label="停用" value="0" />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" :icon="Search" @click="handleQuery"> 搜索 </el-button>
              <el-button :icon="Refresh" @click="resetQuery"> 重置 </el-button>
            </el-form-item>
          </el-form>

          <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column key="id" label="用户编号" align="center" prop="id" />
            <el-table-column
              key="username"
              label="用户名称"
              align="center"
              prop="username"
              :show-overflow-tooltip="true"
            />
            <el-table-column label="用户昵称" align="center" prop="nickname" :show-overflow-tooltip="true" />
            <el-table-column label="手机号码" align="center" prop="mobile" width="120" />

            <el-table-column label="状态" align="center" prop="status">
              <template #default="scope">
                <el-switch
                  v-model="scope.row.status"
                  :inactive-value="0"
                  :active-value="1"
                  @change="handleStatusChange(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" prop="createdAt" width="180"> </el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template #default="scope">
                <el-button
                  v-hasPerm="['sys:user:edit']"
                  type="primary"
                  :icon="Edit"
                  circle
                  plain
                  @click="handleUpdate(scope.row)"
                >
                </el-button>
                <el-button
                  v-hasPerm="['sys:user:delete']"
                  type="danger"
                  :icon="Delete"
                  circle
                  plain
                  @click="handleDelete(scope.row)"
                >
                </el-button>
                <el-button type="warning" :icon="Lock" circle plain @click="resetPassword(scope.row)"> </el-button>
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="total > 0"
            v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize"
            :total="total"
            @pagination="handleQuery"
          />
        </el-card>
      </el-col>
    </el-row>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="600px" append-to-body @close="cancel">
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" :readonly="!!formData.id" placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item v-if="!formData.id" label="密码" prop="password">
          <el-input v-model="formData.password" :readonly="!!formData.id" type="password" placeholder="请输入密码" />
        </el-form-item>

        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="formData.nickname" placeholder="请输入用户昵称" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" maxlength="50" />
        </el-form-item>

        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号码" maxlength="11" autocomplete="new"/>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1" :value="1">正常</el-radio>
            <el-radio :label="0" :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="用户性别" prop="gender">
          <el-radio-group v-model="formData.gender">
            <el-radio v-for="item in state.genderOptions" :key="item.value" :label="item.value" name="gender">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="formData.roleIds" multiple placeholder="请选择">
            <el-option v-for="item in roleOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm"> 确 定 </el-button>
          <el-button @click="cancel"> 取 消 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// Vue依赖
import { reactive, ref, onMounted, toRefs, computed } from 'vue';

// API依赖
import { listUsersPage, getUserFormDetail, deleteUsers, addUser, updateUser, updateUserPart } from '@/api/system/user';
import { listRoles } from '@/api/system/role';

// 组件依赖
import { ElMessage, ElMessageBox, ElForm } from 'element-plus';
import { Search, Plus, Edit, Refresh, Delete, Lock } from '@element-plus/icons-vue';
import { UserItem, UserQueryParam, UserFormData, RoleItem, Dialog } from '@/types';

import useStore from '@/store';

const { app } = useStore();

// DOM元素的引用声明定义
const queryFormRef = ref(ElForm);
const dataFormRef = ref(ElForm);

const dictsMap = computed(() => app.dicts);
console.log('dictsMap: ', dictsMap);

const state = reactive({
  // 遮罩层
  loading: true,
  // 选中数组
  ids: [],
  // 非单个禁用
  single: true,
  // 非多个禁用
  multiple: true,
  // 总条数
  total: 0,
  // 用户分页数据
  userList: [] as UserItem[],
  // 弹窗属性
  dialog: {
    visible: false,
  } as Dialog,

  // 性别状态字典
  genderOptions: [] as any[],
  // 角色选项
  roleOptions: [] as RoleItem[],
  // 表单参数
  formData: {
    status: 1,
    gender: 1,
  } as UserFormData,
  // 查询参数
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  } as UserQueryParam,
  // 表单校验
  rules: {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    nickname: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
    roleId: [{ required: true, message: '用户角色不能为空', trigger: 'blur' }],
    email: [
      { required: true, message: '邮箱不能为空', trigger: 'blur' },
      {
        pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
        message: '请输入正确的邮箱地址',
        trigger: 'blur',
      },
    ],
    mobile: [
      {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: '请输入正确的手机号码',
        trigger: 'blur',
      },
    ],
  },
});

const { loading, multiple, queryParams, userList, total, dialog, formData, rules, roleOptions } = toRefs(state);

/**
 * 加载角色数据
 */
async function loadRoleOptions() {
  listRoles().then(response => {
    state.roleOptions = response.data;
  });
}

/**
 * 用户状态修改
 */
function handleStatusChange(row: { [key: string]: any }) {
  const text = row.status === 1 ? '启用' : '停用';
  ElMessageBox.confirm('确认要' + text + '' + row.username + '用户吗?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      return updateUserPart(row.id, { status: row.status });
    })
    .then(() => {
      ElMessage.success(text + '成功');
    })
    .catch(() => {
      row.status = row.status === 1 ? 0 : 1;
    });
}

/**
 * 用户查询
 **/
function handleQuery() {
  state.loading = true;
  listUsersPage(state.queryParams).then(({ data }) => {
    state.userList = data.list;
    state.total = data.total;
    state.loading = false;
  });
}

/**
 * 重置查询
 */
function resetQuery() {
  queryFormRef.value.resetFields();
  handleQuery();
}

/**
 * 表格行选中事件
 */
function handleSelectionChange(selection: any) {
  state.ids = selection.map((item: any) => item.id);
  state.single = selection.length !== 1;
  state.multiple = !selection.length;
}

/**
 * 密码重置
 */
function resetPassword(row: { [key: string]: any }) {
  ElMessageBox.prompt('请输入用户「' + row.username + '」的新密码', '重置密码', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(({ value }) => {
    if (!value) {
      ElMessage.warning('请输入新密码');
      return false;
    }
    updateUserPart(row.id, {
      password: value,
    }).then(() => {
      ElMessage.success('修改成功，新密码是：' + value);
    });
  });
}

/**
 * 添加用户
 **/
async function handleAdd() {
  await loadRoleOptions();
  state.dialog = {
    title: '添加用户',
    visible: true,
  };
}

/**
 * 修改用户
 **/
async function handleUpdate(row: { [key: string]: any }) {
  const userId = row.id || state.ids;
  await loadRoleOptions();
  state.dialog = {
    title: '修改用户',
    visible: true,
  };
  getUserFormDetail(userId).then(({ data }) => {
    state.formData = data;
  });
}

/**
 * 表单提交
 */
function submitForm() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      const userId = state.formData.id;
      if (userId) {
        updateUser(userId, state.formData).then(() => {
          ElMessage.success('修改用户成功');
          state.dialog.visible = false;
          resetForm();
          handleQuery();
        });
      } else {
        addUser(state.formData).then(() => {
          ElMessage.success('新增用户成功');
          state.dialog.visible = false;
          resetForm();
          handleQuery();
        });
      }
    }
  });
}

/**
 * 重置表单
 */
function resetForm() {
  state.formData.id = undefined;
  dataFormRef.value.resetFields();
}

/**
 * 删除用户
 */
function handleDelete(row: { [key: string]: any }) {
  const userIds = row.id || state.ids.join(',');
  ElMessageBox.confirm('是否确认删除用户编号为「' + userIds + '」的数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(function () {
      deleteUsers(userIds).then(() => {
        ElMessage.success('删除成功');
        handleQuery();
      });
    })
    .catch(() => ElMessage.info('已取消删除'));
}

/**
 * 取消
 */
function cancel() {
  state.dialog.visible = false;
  resetForm();
}

/**
 * 初始化数据
 */
function loadData() {
  // 初始化用户列表数据
  handleQuery();
}

onMounted(() => {
  loadData();
});
</script>
<style lang="scss" scoped></style>
