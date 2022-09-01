<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="初始票据号" prop="defaultNumber">
        <el-input
          v-model="queryParams.defaultNumber"
          placeholder="请输入初始票据号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="票据号" prop="number">
        <el-input
          v-model="queryParams.number"
          placeholder="请输入票据号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出入库时间" prop="operTime">
        <el-date-picker clearable
          v-model="queryParams.operTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择出入库时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="供应商id" prop="organId">
        <el-input
          v-model="queryParams.organId"
          placeholder="请输入供应商id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作员" prop="creator">
        <el-input
          v-model="queryParams.creator"
          placeholder="请输入操作员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="账户id" prop="accountId">
        <el-input
          v-model="queryParams.accountId"
          placeholder="请输入账户id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="变动金额(收款/付款)" prop="changeAmount">
        <el-input
          v-model="queryParams.changeAmount"
          placeholder="请输入变动金额(收款/付款)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="找零金额" prop="backAmount">
        <el-input
          v-model="queryParams.backAmount"
          placeholder="请输入找零金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合计金额" prop="totalPrice">
        <el-input
          v-model="queryParams.totalPrice"
          placeholder="请输入合计金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务员" prop="salesMan">
        <el-input
          v-model="queryParams.salesMan"
          placeholder="请输入业务员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="多账户ID列表" prop="accountIdList">
        <el-input
          v-model="queryParams.accountIdList"
          placeholder="请输入多账户ID列表"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="多账户金额列表" prop="accountMoneyList">
        <el-input
          v-model="queryParams.accountMoneyList"
          placeholder="请输入多账户金额列表"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="优惠率" prop="discount">
        <el-input
          v-model="queryParams.discount"
          placeholder="请输入优惠率"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="优惠金额" prop="discountMoney">
        <el-input
          v-model="queryParams.discountMoney"
          placeholder="请输入优惠金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="优惠后金额" prop="discountLastMoney">
        <el-input
          v-model="queryParams.discountLastMoney"
          placeholder="请输入优惠后金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="销售或采购费用合计" prop="otherMoney">
        <el-input
          v-model="queryParams.otherMoney"
          placeholder="请输入销售或采购费用合计"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订金" prop="deposit">
        <el-input
          v-model="queryParams.deposit"
          placeholder="请输入订金"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联订单号" prop="linkNumber">
        <el-input
          v-model="queryParams.linkNumber"
          placeholder="请输入关联订单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="租户id" prop="tenantId">
        <el-input
          v-model="queryParams.tenantId"
          placeholder="请输入租户id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="删除标记，0未删除，1删除" prop="deleteFlag">
        <el-input
          v-model="queryParams.deleteFlag"
          placeholder="请输入删除标记，0未删除，1删除"
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
          v-hasPermi="['xsystem:depot_head:add']"
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
          v-hasPermi="['xsystem:depot_head:edit']"
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
          v-hasPermi="['xsystem:depot_head:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['xsystem:depot_head:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="depot_headList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="类型(出库/入库)" align="center" prop="type" />
      <el-table-column label="出入库分类" align="center" prop="subType" />
      <el-table-column label="初始票据号" align="center" prop="defaultNumber" />
      <el-table-column label="票据号" align="center" prop="number" />
      <el-table-column label="出入库时间" align="center" prop="operTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.operTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商id" align="center" prop="organId" />
      <el-table-column label="操作员" align="center" prop="creator" />
      <el-table-column label="账户id" align="center" prop="accountId" />
      <el-table-column label="变动金额(收款/付款)" align="center" prop="changeAmount" />
      <el-table-column label="找零金额" align="center" prop="backAmount" />
      <el-table-column label="合计金额" align="center" prop="totalPrice" />
      <el-table-column label="付款类型(现金、记账等)" align="center" prop="payType" />
      <el-table-column label="单据类型" align="center" prop="billType" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="附件名称" align="center" prop="fileName" />
      <el-table-column label="业务员" align="center" prop="salesMan" />
      <el-table-column label="多账户ID列表" align="center" prop="accountIdList" />
      <el-table-column label="多账户金额列表" align="center" prop="accountMoneyList" />
      <el-table-column label="优惠率" align="center" prop="discount" />
      <el-table-column label="优惠金额" align="center" prop="discountMoney" />
      <el-table-column label="优惠后金额" align="center" prop="discountLastMoney" />
      <el-table-column label="销售或采购费用合计" align="center" prop="otherMoney" />
      <el-table-column label="订金" align="center" prop="deposit" />
      <el-table-column label="状态，0未审核、1已审核、2完成采购|销售、3部分采购|销售" align="center" prop="status" />
      <el-table-column label="采购状态，0未采购、2完成采购、3部分采购" align="center" prop="purchaseStatus" />
      <el-table-column label="关联订单号" align="center" prop="linkNumber" />
      <el-table-column label="租户id" align="center" prop="tenantId" />
      <el-table-column label="删除标记，0未删除，1删除" align="center" prop="deleteFlag" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['xsystem:depot_head:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['xsystem:depot_head:remove']"
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

    <!-- 添加或修改单据主对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="初始票据号" prop="defaultNumber">
          <el-input v-model="form.defaultNumber" placeholder="请输入初始票据号" />
        </el-form-item>
        <el-form-item label="票据号" prop="number">
          <el-input v-model="form.number" placeholder="请输入票据号" />
        </el-form-item>
        <el-form-item label="出入库时间" prop="operTime">
          <el-date-picker clearable
            v-model="form.operTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择出入库时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="供应商id" prop="organId">
          <el-input v-model="form.organId" placeholder="请输入供应商id" />
        </el-form-item>
        <el-form-item label="操作员" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入操作员" />
        </el-form-item>
        <el-form-item label="账户id" prop="accountId">
          <el-input v-model="form.accountId" placeholder="请输入账户id" />
        </el-form-item>
        <el-form-item label="变动金额(收款/付款)" prop="changeAmount">
          <el-input v-model="form.changeAmount" placeholder="请输入变动金额(收款/付款)" />
        </el-form-item>
        <el-form-item label="找零金额" prop="backAmount">
          <el-input v-model="form.backAmount" placeholder="请输入找零金额" />
        </el-form-item>
        <el-form-item label="合计金额" prop="totalPrice">
          <el-input v-model="form.totalPrice" placeholder="请输入合计金额" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="附件名称" prop="fileName">
          <el-input v-model="form.fileName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="业务员" prop="salesMan">
          <el-input v-model="form.salesMan" placeholder="请输入业务员" />
        </el-form-item>
        <el-form-item label="多账户ID列表" prop="accountIdList">
          <el-input v-model="form.accountIdList" placeholder="请输入多账户ID列表" />
        </el-form-item>
        <el-form-item label="多账户金额列表" prop="accountMoneyList">
          <el-input v-model="form.accountMoneyList" placeholder="请输入多账户金额列表" />
        </el-form-item>
        <el-form-item label="优惠率" prop="discount">
          <el-input v-model="form.discount" placeholder="请输入优惠率" />
        </el-form-item>
        <el-form-item label="优惠金额" prop="discountMoney">
          <el-input v-model="form.discountMoney" placeholder="请输入优惠金额" />
        </el-form-item>
        <el-form-item label="优惠后金额" prop="discountLastMoney">
          <el-input v-model="form.discountLastMoney" placeholder="请输入优惠后金额" />
        </el-form-item>
        <el-form-item label="销售或采购费用合计" prop="otherMoney">
          <el-input v-model="form.otherMoney" placeholder="请输入销售或采购费用合计" />
        </el-form-item>
        <el-form-item label="订金" prop="deposit">
          <el-input v-model="form.deposit" placeholder="请输入订金" />
        </el-form-item>
        <el-form-item label="关联订单号" prop="linkNumber">
          <el-input v-model="form.linkNumber" placeholder="请输入关联订单号" />
        </el-form-item>
        <el-form-item label="租户id" prop="tenantId">
          <el-input v-model="form.tenantId" placeholder="请输入租户id" />
        </el-form-item>
        <el-form-item label="删除标记，0未删除，1删除" prop="deleteFlag">
          <el-input v-model="form.deleteFlag" placeholder="请输入删除标记，0未删除，1删除" />
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
import { listDepot_head, getDepot_head, delDepot_head, addDepot_head, updateDepot_head } from "@/api/erp/depot_head";

export default {
  name: "Depot_head",
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
      // 单据主表格数据
      depot_headList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        type: null,
        subType: null,
        defaultNumber: null,
        number: null,
        operTime: null,
        organId: null,
        creator: null,
        accountId: null,
        changeAmount: null,
        backAmount: null,
        totalPrice: null,
        payType: null,
        billType: null,
        fileName: null,
        salesMan: null,
        accountIdList: null,
        accountMoneyList: null,
        discount: null,
        discountMoney: null,
        discountLastMoney: null,
        otherMoney: null,
        deposit: null,
        status: null,
        purchaseStatus: null,
        linkNumber: null,
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
    /** 查询单据主列表 */
    getList() {
      this.loading = true;
      listDepot_head(this.queryParams).then(response => {
        this.depot_headList = response.rows;
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
        subType: null,
        defaultNumber: null,
        number: null,
        createTime: null,
        operTime: null,
        organId: null,
        creator: null,
        accountId: null,
        changeAmount: null,
        backAmount: null,
        totalPrice: null,
        payType: null,
        billType: null,
        remark: null,
        fileName: null,
        salesMan: null,
        accountIdList: null,
        accountMoneyList: null,
        discount: null,
        discountMoney: null,
        discountLastMoney: null,
        otherMoney: null,
        deposit: null,
        status: "0",
        purchaseStatus: "0",
        linkNumber: null,
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
      this.title = "添加单据主";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDepot_head(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改单据主";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDepot_head(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDepot_head(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除单据主编号为"' + ids + '"的数据项？').then(function() {
        return delDepot_head(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('xsystem/depot_head/export', {
        ...this.queryParams
      }, `depot_head_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
