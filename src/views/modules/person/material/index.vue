<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="产品类型id" prop="categoryId">
        <el-input
          v-model="queryParams.categoryId"
          placeholder="请输入产品类型id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="制造商" prop="mfrs">
        <el-input
          v-model="queryParams.mfrs"
          placeholder="请输入制造商"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="型号" prop="model">
        <el-input
          v-model="queryParams.model"
          placeholder="请输入型号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="规格" prop="standard">
        <el-input
          v-model="queryParams.standard"
          placeholder="请输入规格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="颜色" prop="color">
        <el-input
          v-model="queryParams.color"
          placeholder="请输入颜色"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单位-单个" prop="unit">
        <el-input
          v-model="queryParams.unit"
          placeholder="请输入单位-单个"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计量单位Id" prop="unitId">
        <el-input
          v-model="queryParams.unitId"
          placeholder="请输入计量单位Id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="保质期天数" prop="expiryNum">
        <el-input
          v-model="queryParams.expiryNum"
          placeholder="请输入保质期天数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="基础重量(kg)" prop="weight">
        <el-input
          v-model="queryParams.weight"
          placeholder="请输入基础重量(kg)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="启用 0-禁用  1-启用" prop="enabled">
        <el-input
          v-model="queryParams.enabled"
          placeholder="请输入启用 0-禁用  1-启用"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="自定义1" prop="otherField1">
        <el-input
          v-model="queryParams.otherField1"
          placeholder="请输入自定义1"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="自定义2" prop="otherField2">
        <el-input
          v-model="queryParams.otherField2"
          placeholder="请输入自定义2"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="自定义3" prop="otherField3">
        <el-input
          v-model="queryParams.otherField3"
          placeholder="请输入自定义3"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否开启序列号，0否，1是" prop="enableSerialNumber">
        <el-input
          v-model="queryParams.enableSerialNumber"
          placeholder="请输入是否开启序列号，0否，1是"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否开启批号，0否，1是" prop="enableBatchNumber">
        <el-input
          v-model="queryParams.enableBatchNumber"
          placeholder="请输入是否开启批号，0否，1是"
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
          v-hasPermi="['person:material:add']"
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
          v-hasPermi="['person:material:edit']"
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
          v-hasPermi="['person:material:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['person:material:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="materialList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="产品类型id" align="center" prop="categoryId" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="制造商" align="center" prop="mfrs" />
      <el-table-column label="型号" align="center" prop="model" />
      <el-table-column label="规格" align="center" prop="standard" />
      <el-table-column label="颜色" align="center" prop="color" />
      <el-table-column label="单位-单个" align="center" prop="unit" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="图片名称" align="center" prop="imgName" />
      <el-table-column label="计量单位Id" align="center" prop="unitId" />
      <el-table-column label="保质期天数" align="center" prop="expiryNum" />
      <el-table-column label="基础重量(kg)" align="center" prop="weight" />
      <el-table-column label="启用 0-禁用  1-启用" align="center" prop="enabled" />
      <el-table-column label="自定义1" align="center" prop="otherField1" />
      <el-table-column label="自定义2" align="center" prop="otherField2" />
      <el-table-column label="自定义3" align="center" prop="otherField3" />
      <el-table-column label="是否开启序列号，0否，1是" align="center" prop="enableSerialNumber" />
      <el-table-column label="是否开启批号，0否，1是" align="center" prop="enableBatchNumber" />
      <el-table-column label="租户id" align="center" prop="tenantId" />
      <el-table-column label="删除标记，0未删除，1删除" align="center" prop="deleteFlag" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['person:material:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['person:material:remove']"
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

    <!-- 添加或修改产品对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="产品类型id" prop="categoryId">
          <el-input v-model="form.categoryId" placeholder="请输入产品类型id" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="制造商" prop="mfrs">
          <el-input v-model="form.mfrs" placeholder="请输入制造商" />
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="form.model" placeholder="请输入型号" />
        </el-form-item>
        <el-form-item label="规格" prop="standard">
          <el-input v-model="form.standard" placeholder="请输入规格" />
        </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-input v-model="form.color" placeholder="请输入颜色" />
        </el-form-item>
        <el-form-item label="单位-单个" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位-单个" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="图片名称" prop="imgName">
          <el-input v-model="form.imgName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="计量单位Id" prop="unitId">
          <el-input v-model="form.unitId" placeholder="请输入计量单位Id" />
        </el-form-item>
        <el-form-item label="保质期天数" prop="expiryNum">
          <el-input v-model="form.expiryNum" placeholder="请输入保质期天数" />
        </el-form-item>
        <el-form-item label="基础重量(kg)" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入基础重量(kg)" />
        </el-form-item>
        <el-form-item label="启用 0-禁用  1-启用" prop="enabled">
          <el-input v-model="form.enabled" placeholder="请输入启用 0-禁用  1-启用" />
        </el-form-item>
        <el-form-item label="自定义1" prop="otherField1">
          <el-input v-model="form.otherField1" placeholder="请输入自定义1" />
        </el-form-item>
        <el-form-item label="自定义2" prop="otherField2">
          <el-input v-model="form.otherField2" placeholder="请输入自定义2" />
        </el-form-item>
        <el-form-item label="自定义3" prop="otherField3">
          <el-input v-model="form.otherField3" placeholder="请输入自定义3" />
        </el-form-item>
        <el-form-item label="是否开启序列号，0否，1是" prop="enableSerialNumber">
          <el-input v-model="form.enableSerialNumber" placeholder="请输入是否开启序列号，0否，1是" />
        </el-form-item>
        <el-form-item label="是否开启批号，0否，1是" prop="enableBatchNumber">
          <el-input v-model="form.enableBatchNumber" placeholder="请输入是否开启批号，0否，1是" />
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
import { listMaterial, getMaterial, delMaterial, addMaterial, updateMaterial } from "@/api/erp/material";

export default {
  name: "Material",
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
      // 产品表格数据
      materialList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        categoryId: null,
        name: null,
        mfrs: null,
        model: null,
        standard: null,
        color: null,
        unit: null,
        imgName: null,
        unitId: null,
        expiryNum: null,
        weight: null,
        enabled: null,
        otherField1: null,
        otherField2: null,
        otherField3: null,
        enableSerialNumber: null,
        enableBatchNumber: null,
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
    /** 查询产品列表 */
    getList() {
      this.loading = true;
      listMaterial(this.queryParams).then(response => {
        this.materialList = response.rows;
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
        categoryId: null,
        name: null,
        mfrs: null,
        model: null,
        standard: null,
        color: null,
        unit: null,
        remark: null,
        imgName: null,
        unitId: null,
        expiryNum: null,
        weight: null,
        enabled: null,
        otherField1: null,
        otherField2: null,
        otherField3: null,
        enableSerialNumber: null,
        enableBatchNumber: null,
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
      this.title = "添加产品";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMaterial(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改产品";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMaterial(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMaterial(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除产品编号为"' + ids + '"的数据项？').then(function() {
        return delMaterial(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('person/material/export', {
        ...this.queryParams
      }, `material_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
