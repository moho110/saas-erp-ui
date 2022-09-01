<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="公司名称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入公司名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司联系人" prop="companyContacts">
        <el-input
          v-model="queryParams.companyContacts"
          placeholder="请输入公司联系人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司地址" prop="companyAddress">
        <el-input
          v-model="queryParams.companyAddress"
          placeholder="请输入公司地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司电话" prop="companyTel">
        <el-input
          v-model="queryParams.companyTel"
          placeholder="请输入公司电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司传真" prop="companyFax">
        <el-input
          v-model="queryParams.companyFax"
          placeholder="请输入公司传真"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司邮编" prop="companyPostCode">
        <el-input
          v-model="queryParams.companyPostCode"
          placeholder="请输入公司邮编"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="仓库启用标记，0未启用，1启用" prop="depotFlag">
        <el-input
          v-model="queryParams.depotFlag"
          placeholder="请输入仓库启用标记，0未启用，1启用"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户启用标记，0未启用，1启用" prop="customerFlag">
        <el-input
          v-model="queryParams.customerFlag"
          placeholder="请输入客户启用标记，0未启用，1启用"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="负库存启用标记，0未启用，1启用" prop="minusStockFlag">
        <el-input
          v-model="queryParams.minusStockFlag"
          placeholder="请输入负库存启用标记，0未启用，1启用"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="以销定购启用标记，0未启用，1启用" prop="purchaseBySaleFlag">
        <el-input
          v-model="queryParams.purchaseBySaleFlag"
          placeholder="请输入以销定购启用标记，0未启用，1启用"
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
          v-hasPermi="['xsystem:sys_config:add']"
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
          v-hasPermi="['xsystem:sys_config:edit']"
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
          v-hasPermi="['xsystem:sys_config:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['xsystem:sys_config:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="sys_configList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="公司名称" align="center" prop="companyName" />
      <el-table-column label="公司联系人" align="center" prop="companyContacts" />
      <el-table-column label="公司地址" align="center" prop="companyAddress" />
      <el-table-column label="公司电话" align="center" prop="companyTel" />
      <el-table-column label="公司传真" align="center" prop="companyFax" />
      <el-table-column label="公司邮编" align="center" prop="companyPostCode" />
      <el-table-column label="销售协议" align="center" prop="saleAgreement" />
      <el-table-column label="仓库启用标记，0未启用，1启用" align="center" prop="depotFlag" />
      <el-table-column label="客户启用标记，0未启用，1启用" align="center" prop="customerFlag" />
      <el-table-column label="负库存启用标记，0未启用，1启用" align="center" prop="minusStockFlag" />
      <el-table-column label="以销定购启用标记，0未启用，1启用" align="center" prop="purchaseBySaleFlag" />
      <el-table-column label="租户id" align="center" prop="tenantId" />
      <el-table-column label="删除标记，0未删除，1删除" align="center" prop="deleteFlag" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['xsystem:sys_config:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['xsystem:sys_config:remove']"
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

    <!-- 添加或修改系统参数对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="公司联系人" prop="companyContacts">
          <el-input v-model="form.companyContacts" placeholder="请输入公司联系人" />
        </el-form-item>
        <el-form-item label="公司地址" prop="companyAddress">
          <el-input v-model="form.companyAddress" placeholder="请输入公司地址" />
        </el-form-item>
        <el-form-item label="公司电话" prop="companyTel">
          <el-input v-model="form.companyTel" placeholder="请输入公司电话" />
        </el-form-item>
        <el-form-item label="公司传真" prop="companyFax">
          <el-input v-model="form.companyFax" placeholder="请输入公司传真" />
        </el-form-item>
        <el-form-item label="公司邮编" prop="companyPostCode">
          <el-input v-model="form.companyPostCode" placeholder="请输入公司邮编" />
        </el-form-item>
        <el-form-item label="销售协议" prop="saleAgreement">
          <el-input v-model="form.saleAgreement" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="仓库启用标记，0未启用，1启用" prop="depotFlag">
          <el-input v-model="form.depotFlag" placeholder="请输入仓库启用标记，0未启用，1启用" />
        </el-form-item>
        <el-form-item label="客户启用标记，0未启用，1启用" prop="customerFlag">
          <el-input v-model="form.customerFlag" placeholder="请输入客户启用标记，0未启用，1启用" />
        </el-form-item>
        <el-form-item label="负库存启用标记，0未启用，1启用" prop="minusStockFlag">
          <el-input v-model="form.minusStockFlag" placeholder="请输入负库存启用标记，0未启用，1启用" />
        </el-form-item>
        <el-form-item label="以销定购启用标记，0未启用，1启用" prop="purchaseBySaleFlag">
          <el-input v-model="form.purchaseBySaleFlag" placeholder="请输入以销定购启用标记，0未启用，1启用" />
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
import { listSys_config, getSys_config, delSys_config, addSys_config, updateSys_config } from "@/api/erp/sys_config";

export default {
  name: "Sys_config",
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
      // 系统参数表格数据
      sys_configList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        companyName: null,
        companyContacts: null,
        companyAddress: null,
        companyTel: null,
        companyFax: null,
        companyPostCode: null,
        saleAgreement: null,
        depotFlag: null,
        customerFlag: null,
        minusStockFlag: null,
        purchaseBySaleFlag: null,
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
    /** 查询系统参数列表 */
    getList() {
      this.loading = true;
      listSys_config(this.queryParams).then(response => {
        this.sys_configList = response.rows;
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
        companyName: null,
        companyContacts: null,
        companyAddress: null,
        companyTel: null,
        companyFax: null,
        companyPostCode: null,
        saleAgreement: null,
        depotFlag: null,
        customerFlag: null,
        minusStockFlag: null,
        purchaseBySaleFlag: null,
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
      this.title = "添加系统参数";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSys_config(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改系统参数";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSys_config(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSys_config(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除系统参数编号为"' + ids + '"的数据项？').then(function() {
        return delSys_config(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('xsystem/sys_config/export', {
        ...this.queryParams
      }, `sys_config_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
