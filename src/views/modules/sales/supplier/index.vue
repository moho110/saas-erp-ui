<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="供应商名称" prop="supplier">
        <el-input
          v-model="queryParams.supplier"
          placeholder="请输入供应商名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系人" prop="contacts">
        <el-input
          v-model="queryParams.contacts"
          placeholder="请输入联系人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系电话" prop="phoneNum">
        <el-input
          v-model="queryParams.phoneNum"
          placeholder="请输入联系电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input
          v-model="queryParams.email"
          placeholder="请输入电子邮箱"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否系统自带 0==系统 1==非系统" prop="isystem">
        <el-input
          v-model="queryParams.isystem"
          placeholder="请输入是否系统自带 0==系统 1==非系统"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="启用" prop="enabled">
        <el-input
          v-model="queryParams.enabled"
          placeholder="请输入启用"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预收款" prop="advanceIn">
        <el-input
          v-model="queryParams.advanceIn"
          placeholder="请输入预收款"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="期初应收" prop="beginNeedGet">
        <el-input
          v-model="queryParams.beginNeedGet"
          placeholder="请输入期初应收"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="期初应付" prop="beginNeedPay">
        <el-input
          v-model="queryParams.beginNeedPay"
          placeholder="请输入期初应付"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="累计应收" prop="allNeedGet">
        <el-input
          v-model="queryParams.allNeedGet"
          placeholder="请输入累计应收"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="累计应付" prop="allNeedPay">
        <el-input
          v-model="queryParams.allNeedPay"
          placeholder="请输入累计应付"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="传真" prop="fax">
        <el-input
          v-model="queryParams.fax"
          placeholder="请输入传真"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机" prop="telephone">
        <el-input
          v-model="queryParams.telephone"
          placeholder="请输入手机"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="纳税人识别号" prop="taxNum">
        <el-input
          v-model="queryParams.taxNum"
          placeholder="请输入纳税人识别号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开户行" prop="bankName">
        <el-input
          v-model="queryParams.bankName"
          placeholder="请输入开户行"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="账号" prop="accountNumber">
        <el-input
          v-model="queryParams.accountNumber"
          placeholder="请输入账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="税率" prop="taxRate">
        <el-input
          v-model="queryParams.taxRate"
          placeholder="请输入税率"
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
          v-hasPermi="['sales:supplier:add']"
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
          v-hasPermi="['sales:supplier:edit']"
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
          v-hasPermi="['sales:supplier:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sales:supplier:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="supplierList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="供应商名称" align="center" prop="supplier" />
      <el-table-column label="联系人" align="center" prop="contacts" />
      <el-table-column label="联系电话" align="center" prop="phoneNum" />
      <el-table-column label="电子邮箱" align="center" prop="email" />
      <el-table-column label="备注" align="center" prop="description" />
      <el-table-column label="是否系统自带 0==系统 1==非系统" align="center" prop="isystem" />
      <el-table-column label="类型" align="center" prop="type" />
      <el-table-column label="启用" align="center" prop="enabled" />
      <el-table-column label="预收款" align="center" prop="advanceIn" />
      <el-table-column label="期初应收" align="center" prop="beginNeedGet" />
      <el-table-column label="期初应付" align="center" prop="beginNeedPay" />
      <el-table-column label="累计应收" align="center" prop="allNeedGet" />
      <el-table-column label="累计应付" align="center" prop="allNeedPay" />
      <el-table-column label="传真" align="center" prop="fax" />
      <el-table-column label="手机" align="center" prop="telephone" />
      <el-table-column label="地址" align="center" prop="address" />
      <el-table-column label="纳税人识别号" align="center" prop="taxNum" />
      <el-table-column label="开户行" align="center" prop="bankName" />
      <el-table-column label="账号" align="center" prop="accountNumber" />
      <el-table-column label="税率" align="center" prop="taxRate" />
      <el-table-column label="租户id" align="center" prop="tenantId" />
      <el-table-column label="删除标记，0未删除，1删除" align="center" prop="deleteFlag" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sales:supplier:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sales:supplier:remove']"
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

    <!-- 添加或修改供应商/客户信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="供应商名称" prop="supplier">
          <el-input v-model="form.supplier" placeholder="请输入供应商名称" />
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="form.contacts" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phoneNum">
          <el-input v-model="form.phoneNum" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入电子邮箱" />
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="是否系统自带 0==系统 1==非系统" prop="isystem">
          <el-input v-model="form.isystem" placeholder="请输入是否系统自带 0==系统 1==非系统" />
        </el-form-item>
        <el-form-item label="启用" prop="enabled">
          <el-input v-model="form.enabled" placeholder="请输入启用" />
        </el-form-item>
        <el-form-item label="预收款" prop="advanceIn">
          <el-input v-model="form.advanceIn" placeholder="请输入预收款" />
        </el-form-item>
        <el-form-item label="期初应收" prop="beginNeedGet">
          <el-input v-model="form.beginNeedGet" placeholder="请输入期初应收" />
        </el-form-item>
        <el-form-item label="期初应付" prop="beginNeedPay">
          <el-input v-model="form.beginNeedPay" placeholder="请输入期初应付" />
        </el-form-item>
        <el-form-item label="累计应收" prop="allNeedGet">
          <el-input v-model="form.allNeedGet" placeholder="请输入累计应收" />
        </el-form-item>
        <el-form-item label="累计应付" prop="allNeedPay">
          <el-input v-model="form.allNeedPay" placeholder="请输入累计应付" />
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input v-model="form.fax" placeholder="请输入传真" />
        </el-form-item>
        <el-form-item label="手机" prop="telephone">
          <el-input v-model="form.telephone" placeholder="请输入手机" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="纳税人识别号" prop="taxNum">
          <el-input v-model="form.taxNum" placeholder="请输入纳税人识别号" />
        </el-form-item>
        <el-form-item label="开户行" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入开户行" />
        </el-form-item>
        <el-form-item label="账号" prop="accountNumber">
          <el-input v-model="form.accountNumber" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="税率" prop="taxRate">
          <el-input v-model="form.taxRate" placeholder="请输入税率" />
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
import { listSupplier, getSupplier, delSupplier, addSupplier, updateSupplier } from "@/api/erp/supplier";

export default {
  name: "Supplier",
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
      // 供应商/客户信息表格数据
      supplierList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        supplier: null,
        contacts: null,
        phoneNum: null,
        email: null,
        description: null,
        isystem: null,
        type: null,
        enabled: null,
        advanceIn: null,
        beginNeedGet: null,
        beginNeedPay: null,
        allNeedGet: null,
        allNeedPay: null,
        fax: null,
        telephone: null,
        address: null,
        taxNum: null,
        bankName: null,
        accountNumber: null,
        taxRate: null,
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
    /** 查询供应商/客户信息列表 */
    getList() {
      this.loading = true;
      listSupplier(this.queryParams).then(response => {
        this.supplierList = response.rows;
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
        supplier: null,
        contacts: null,
        phoneNum: null,
        email: null,
        description: null,
        isystem: null,
        type: null,
        enabled: null,
        advanceIn: null,
        beginNeedGet: null,
        beginNeedPay: null,
        allNeedGet: null,
        allNeedPay: null,
        fax: null,
        telephone: null,
        address: null,
        taxNum: null,
        bankName: null,
        accountNumber: null,
        taxRate: null,
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
      this.title = "添加供应商/客户信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSupplier(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改供应商/客户信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSupplier(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSupplier(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除供应商/客户信息编号为"' + ids + '"的数据项？').then(function() {
        return delSupplier(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sales/supplier/export', {
        ...this.queryParams
      }, `supplier_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
