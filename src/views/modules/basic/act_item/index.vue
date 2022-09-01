<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="租户id" prop="tenantId">
        <el-input
          v-model="queryParams.tenantId"
          placeholder="请输入租户id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['basic:act_item:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['basic:act_item:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['basic:act_item:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:act_item:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="act_itemList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="表头Id" align="center" prop="headerId" />
      <el-table-column label="账户Id" align="center" prop="accountId" />
      <el-table-column label="收支项目Id" align="center" prop="inOutItemId" />
      <el-table-column label="单据id" align="center" prop="billId" />
      <el-table-column label="应收欠款" align="center" prop="needDebt" />
      <el-table-column label="已收欠款" align="center" prop="finishDebt" />
      <el-table-column label="单项金额" align="center" prop="eachAmount" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:act_item:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:act_item:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改财务子对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="表头Id" prop="headerId">
          <el-input v-model="form.headerId" placeholder="请输入表头Id" />
        </el-form-item>
        <el-form-item label="账户Id" prop="accountId">
          <el-input v-model="form.accountId" placeholder="请输入账户Id" />
        </el-form-item>
        <el-form-item label="收支项目Id" prop="inOutItemId">
          <el-input v-model="form.inOutItemId" placeholder="请输入收支项目Id" />
        </el-form-item>
        <el-form-item label="单据id" prop="billId">
          <el-input v-model="form.billId" placeholder="请输入单据id" />
        </el-form-item>
        <el-form-item label="应收欠款" prop="needDebt">
          <el-input v-model="form.needDebt" placeholder="请输入应收欠款" />
        </el-form-item>
        <el-form-item label="已收欠款" prop="finishDebt">
          <el-input v-model="form.finishDebt" placeholder="请输入已收欠款" />
        </el-form-item>
        <el-form-item label="单项金额" prop="eachAmount">
          <el-input v-model="form.eachAmount" placeholder="请输入单项金额" />
        </el-form-item>
        <el-form-item label="单据备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入单据备注" />
        </el-form-item>
        <el-form-item label="租户id" prop="tenantId">
          <el-input v-model="form.tenantId" placeholder="请输入租户id" />
        </el-form-item>
        <el-form-item label="删除标记" prop="deleteFlag">
          <el-radio v-model="form.deleteFlag" label="1">保留</el-radio>
          <el-radio v-model="form.deleteFlag" label="0">删除</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listAct_item, getAct_item, delAct_item, addAct_item, updateAct_item } from "@/api/erp/act_item";

export default {
  name: "Act_item",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 财务子表格数据
      act_itemList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        headerId: null,
        accountId: null,
        inOutItemId: null,
        billId: null,
        needDebt: null,
        finishDebt: null,
        eachAmount: null,
        tenantId: null,
        deleteFlag: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        serialNo: [
          { required: true, message: "编号不能为空", trigger: "blur" }
        ],
        initialAmount: [
          { required: true, message: "期初金额不能为空", trigger: "blur" }
        ],
        currentAmount: [
          { required: true, message: "当前金额不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        isDefault: [
          { required: true, message: "是否默认不能为空", trigger: "blur" }
        ],
        tenantId: [
          { required: true, message: "租户ID不能为空", trigger: "blur" }
        ],
        deleteFlag: [
          { required: true, message: "删除标记不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询财务子列表 */
    getList() {
      this.loading = true;
      listAct_item(this.queryParams).then(response => {
        this.act_itemList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        headerId: null,
        accountId: null,
        inOutItemId: null,
        billId: null,
        needDebt: null,
        finishDebt: null,
        eachAmount: null,
        remark: null,
        tenantId: null,
        deleteFlag: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加财务子";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getAct_item(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改财务子";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAct_item(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAct_item(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除财务子编号为"' + ids + '"的数据项？').then(function() {
        return delAct_item(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/act_item/export', {
        ...this.queryParams
      }, `act_item_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
