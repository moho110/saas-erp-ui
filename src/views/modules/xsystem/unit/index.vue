<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称，支持多单位" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称，支持多单位"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="基础单位" prop="basicUnit">
        <el-input
          v-model="queryParams.basicUnit"
          placeholder="请输入基础单位"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="副单位" prop="otherUnit">
        <el-input
          v-model="queryParams.otherUnit"
          placeholder="请输入副单位"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="副单位2" prop="otherUnitTwo">
        <el-input
          v-model="queryParams.otherUnitTwo"
          placeholder="请输入副单位2"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="副单位3" prop="otherUnitThree">
        <el-input
          v-model="queryParams.otherUnitThree"
          placeholder="请输入副单位3"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="比例" prop="ratio">
        <el-input
          v-model="queryParams.ratio"
          placeholder="请输入比例"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="比例2" prop="ratioTwo">
        <el-input
          v-model="queryParams.ratioTwo"
          placeholder="请输入比例2"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="比例3" prop="ratioThree">
        <el-input
          v-model="queryParams.ratioThree"
          placeholder="请输入比例3"
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
          v-hasPermi="['xsystem:unit:add']"
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
          v-hasPermi="['xsystem:unit:edit']"
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
          v-hasPermi="['xsystem:unit:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['xsystem:unit:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="unitList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="名称，支持多单位" align="center" prop="name" />
      <el-table-column label="基础单位" align="center" prop="basicUnit" />
      <el-table-column label="副单位" align="center" prop="otherUnit" />
      <el-table-column label="副单位2" align="center" prop="otherUnitTwo" />
      <el-table-column label="副单位3" align="center" prop="otherUnitThree" />
      <el-table-column label="比例" align="center" prop="ratio" />
      <el-table-column label="比例2" align="center" prop="ratioTwo" />
      <el-table-column label="比例3" align="center" prop="ratioThree" />
      <el-table-column label="租户id" align="center" prop="tenantId" />
      <el-table-column label="删除标记，0未删除，1删除" align="center" prop="deleteFlag" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['xsystem:unit:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['xsystem:unit:remove']"
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

    <!-- 添加或修改多单位对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称，支持多单位" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称，支持多单位" />
        </el-form-item>
        <el-form-item label="基础单位" prop="basicUnit">
          <el-input v-model="form.basicUnit" placeholder="请输入基础单位" />
        </el-form-item>
        <el-form-item label="副单位" prop="otherUnit">
          <el-input v-model="form.otherUnit" placeholder="请输入副单位" />
        </el-form-item>
        <el-form-item label="副单位2" prop="otherUnitTwo">
          <el-input v-model="form.otherUnitTwo" placeholder="请输入副单位2" />
        </el-form-item>
        <el-form-item label="副单位3" prop="otherUnitThree">
          <el-input v-model="form.otherUnitThree" placeholder="请输入副单位3" />
        </el-form-item>
        <el-form-item label="比例" prop="ratio">
          <el-input v-model="form.ratio" placeholder="请输入比例" />
        </el-form-item>
        <el-form-item label="比例2" prop="ratioTwo">
          <el-input v-model="form.ratioTwo" placeholder="请输入比例2" />
        </el-form-item>
        <el-form-item label="比例3" prop="ratioThree">
          <el-input v-model="form.ratioThree" placeholder="请输入比例3" />
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
import { listUnit, getUnit, delUnit, addUnit, updateUnit } from "@/api/erp/unit";

export default {
  name: "Unit",
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
      // 多单位表格数据
      unitList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        basicUnit: null,
        otherUnit: null,
        otherUnitTwo: null,
        otherUnitThree: null,
        ratio: null,
        ratioTwo: null,
        ratioThree: null,
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
    /** 查询多单位列表 */
    getList() {
      this.loading = true;
      listUnit(this.queryParams).then(response => {
        this.unitList = response.rows;
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
        name: null,
        basicUnit: null,
        otherUnit: null,
        otherUnitTwo: null,
        otherUnitThree: null,
        ratio: null,
        ratioTwo: null,
        ratioThree: null,
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
      this.title = "添加多单位";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getUnit(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改多单位";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateUnit(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUnit(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除多单位编号为"' + ids + '"的数据项？').then(function() {
        return delUnit(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('xsystem/unit/export', {
        ...this.queryParams
      }, `unit_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
