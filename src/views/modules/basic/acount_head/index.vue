<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="操作员" prop="creator">
        <el-input
          v-model="queryParams.creator"
          placeholder="请输入操作员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单据编号" prop="billNo">
        <el-input
          v-model="queryParams.billNo"
          placeholder="请输入单据编号"
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
          v-hasPermi="['basic:acount_head:add']"
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
          v-hasPermi="['basic:acount_head:edit']"
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
          v-hasPermi="['basic:acount_head:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:acount_head:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="acount_headList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="操作员" align="center" prop="creator" />
      <el-table-column label="变动金额(优惠/收款/付款/实付)" align="center" prop="changeAmount" />
      <el-table-column label="优惠金额" align="center" prop="discountMoney" />
      <el-table-column label="合计金额" align="center" prop="totalPrice" />
      <el-table-column label="账户(收款/付款)" align="center" prop="accountId" />
      <el-table-column label="单据编号" align="center" prop="billNo" />
      <el-table-column label="单据日期" align="center" prop="billTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.billTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="附件名称" align="center" prop="fileName" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:acount_head:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:acount_head:remove']"
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

    <!-- 添加或修改财务主对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="类型" prop="type">
          <el-radio v-model="form.type" label="1">支出</el-radio>
          <el-radio v-model="form.type" label="2">收入</el-radio>
          <el-radio v-model="form.type" label="3">收款</el-radio>
          <el-radio v-model="form.type" label="4">付款</el-radio>
          <el-radio v-model="form.type" label="5">转账</el-radio>
        </el-form-item>
        <el-form-item label="单位Id(收款/付款单位)" prop="organId">
          <el-input v-model="form.organId" placeholder="请输入单位Id(收款/付款单位)" />
        </el-form-item>
        <el-form-item label="经手人id" prop="handsPersonId">
          <el-input v-model="form.handsPersonId" placeholder="请输入经手人id" />
        </el-form-item>
        <el-form-item label="操作员" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入操作员" />
        </el-form-item>
        <el-form-item label="变动金额(优惠/收款/付款/实付)" prop="changeAmount">
          <el-input v-model="form.changeAmount" placeholder="请输入变动金额(优惠/收款/付款/实付)" />
        </el-form-item>
        <el-form-item label="优惠金额" prop="discountMoney">
          <el-input v-model="form.discountMoney" placeholder="请输入优惠金额" />
        </el-form-item>
        <el-form-item label="合计金额" prop="totalPrice">
          <el-input v-model="form.totalPrice" placeholder="请输入合计金额" />
        </el-form-item>
        <el-form-item label="账户(收款/付款)" prop="accountId">
          <el-input v-model="form.accountId" placeholder="请输入账户(收款/付款)" />
        </el-form-item>
        <el-form-item label="单据编号" prop="billNo">
          <el-input v-model="form.billNo" placeholder="请输入单据编号" />
        </el-form-item>
        <el-form-item label="单据日期" prop="billTime">
          <el-date-picker clearable
            v-model="form.billTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择单据日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="附件名称" prop="fileName">
          <el-input v-model="form.fileName" type="textarea" placeholder="请输入内容" />
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
import { listAcount_head, getAcount_head, delAcount_head, addAcount_head, updateAcount_head } from "@/api/erp/acount_head";

export default {
  name: "Acount_head",
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
      // 财务主表格数据
      acount_headList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        type: null,
        organId: null,
        handsPersonId: null,
        creator: null,
        changeAmount: null,
        discountMoney: null,
        totalPrice: null,
        accountId: null,
        billNo: null,
        billTime: null,
        fileName: null,
        status: null,
        tenantId: null,
        deleteFlag: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
          type: [
          { required: true, message: "类型不能为空", trigger: "blur" }
        ],
        orgaId: [
          { required: true, message: "单位ID不能为空", trigger: "blur" }
        ],
        handsPersonId: [
          { required: true, message: "经手经ID不能为空", trigger: "blur" }
        ],
        creator: [
          { required: true, message: "操作员不能为空", trigger: "blur" }
        ],
        changeAmount: [
          { required: true, message: "变动金额不能为空", trigger: "blur" }
        ],
        discountMoney: [
          { required: true, message: "优惠金额不能为空", trigger: "blur" }
        ],
        totalPrice: [
          { required: true, message: "合计金额不能为空", trigger: "blur" }
        ],
        accountId: [
          { required: true, message: "帐户ID不能为空", trigger: "blur" }
        ],
        billNo: [
          { required: true, message: "单据编号不能为空", trigger: "blur" }
        ],
        billTime: [
          { required: true, message: "单据日期不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        fileName: [
          { required: true, message: "附件名称不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        tenantId: [
          { required: true, message: "租户ID不能为空", trigger: "blur" }
        ],
        deletFlag: [
          { required: true, message: "删除标记不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询财务主列表 */
    getList() {
      this.loading = true;
      listAcount_head(this.queryParams).then(response => {
        this.acount_headList = response.rows;
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
        type: null,
        organId: null,
        handsPersonId: null,
        creator: null,
        changeAmount: null,
        discountMoney: null,
        totalPrice: null,
        accountId: null,
        billNo: null,
        billTime: null,
        remark: null,
        fileName: null,
        status: "0",
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
      this.title = "添加财务主";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getAcount_head(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改财务主";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAcount_head(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAcount_head(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除财务主编号为"' + ids + '"的数据项？').then(function() {
        return delAcount_head(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/acount_head/export', {
        ...this.queryParams
      }, `acount_head_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
