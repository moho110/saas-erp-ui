<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="最小值" prop="minValue">
        <el-input
          v-model="queryParams.minValue"
          placeholder="请输入最小值"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最大值" prop="maxValue">
        <el-input
          v-model="queryParams.maxValue"
          placeholder="请输入最大值"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="当前值" prop="currentVal">
        <el-input
          v-model="queryParams.currentVal"
          placeholder="请输入当前值"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="增长步数" prop="incrementVal">
        <el-input
          v-model="queryParams.incrementVal"
          placeholder="请输入增长步数"
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
          v-hasPermi="['sales:sequence:add']"
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
          v-hasPermi="['sales:sequence:edit']"
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
          v-hasPermi="['sales:sequence:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sales:sequence:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="sequenceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序列名称" align="center" prop="seqName" />
      <el-table-column label="最小值" align="center" prop="minValue" />
      <el-table-column label="最大值" align="center" prop="maxValue" />
      <el-table-column label="当前值" align="center" prop="currentVal" />
      <el-table-column label="增长步数" align="center" prop="incrementVal" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sales:sequence:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sales:sequence:remove']"
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

    <!-- 添加或修改单据编号对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="最小值" prop="minValue">
          <el-input v-model="form.minValue" placeholder="请输入最小值" />
        </el-form-item>
        <el-form-item label="最大值" prop="maxValue">
          <el-input v-model="form.maxValue" placeholder="请输入最大值" />
        </el-form-item>
        <el-form-item label="当前值" prop="currentVal">
          <el-input v-model="form.currentVal" placeholder="请输入当前值" />
        </el-form-item>
        <el-form-item label="增长步数" prop="incrementVal">
          <el-input v-model="form.incrementVal" placeholder="请输入增长步数" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
import { listSequence, getSequence, delSequence, addSequence, updateSequence } from "@/api/erp/sequence";

export default {
  name: "Sequence",
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
      // 单据编号表格数据
      sequenceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        minValue: null,
        maxValue: null,
        currentVal: null,
        incrementVal: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        minValue: [
          { required: true, message: "最小值不能为空", trigger: "blur" }
        ],
        maxValue: [
          { required: true, message: "最大值不能为空", trigger: "blur" }
        ],
        currentVal: [
          { required: true, message: "当前值不能为空", trigger: "blur" }
        ],
        incrementVal: [
          { required: true, message: "增长步数不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询单据编号列表 */
    getList() {
      this.loading = true;
      listSequence(this.queryParams).then(response => {
        this.sequenceList = response.rows;
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
        seqName: null,
        minValue: null,
        maxValue: null,
        currentVal: null,
        incrementVal: null,
        remark: null
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
      this.ids = selection.map(item => item.seqName)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加单据编号";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const seqName = row.seqName || this.ids
      getSequence(seqName).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改单据编号";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.seqName != null) {
            updateSequence(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSequence(this.form).then(response => {
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
      const seqNames = row.seqName || this.ids;
      this.$modal.confirm('是否确认删除单据编号编号为"' + seqNames + '"的数据项？').then(function() {
        return delSequence(seqNames);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sales/sequence/export', {
        ...this.queryParams
      }, `sequence_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
