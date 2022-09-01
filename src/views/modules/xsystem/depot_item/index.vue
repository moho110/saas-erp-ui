<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="表头Id" prop="headerId">
        <el-input
          v-model="queryParams.headerId"
          placeholder="请输入表头Id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品Id" prop="materialId">
        <el-input
          v-model="queryParams.materialId"
          placeholder="请输入商品Id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品扩展id" prop="materialExtendId">
        <el-input
          v-model="queryParams.materialExtendId"
          placeholder="请输入商品扩展id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品计量单位" prop="materialUnit">
        <el-input
          v-model="queryParams.materialUnit"
          placeholder="请输入商品计量单位"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="多属性" prop="sku">
        <el-input
          v-model="queryParams.sku"
          placeholder="请输入多属性"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数量" prop="operNumber">
        <el-input
          v-model="queryParams.operNumber"
          placeholder="请输入数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="基础数量，如kg、瓶" prop="basicNumber">
        <el-input
          v-model="queryParams.basicNumber"
          placeholder="请输入基础数量，如kg、瓶"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单价" prop="unitPrice">
        <el-input
          v-model="queryParams.unitPrice"
          placeholder="请输入单价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="含税单价" prop="taxUnitPrice">
        <el-input
          v-model="queryParams.taxUnitPrice"
          placeholder="请输入含税单价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="金额" prop="allPrice">
        <el-input
          v-model="queryParams.allPrice"
          placeholder="请输入金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="仓库ID" prop="depotId">
        <el-input
          v-model="queryParams.depotId"
          placeholder="请输入仓库ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="调拨时，对方仓库Id" prop="anotherDepotId">
        <el-input
          v-model="queryParams.anotherDepotId"
          placeholder="请输入调拨时，对方仓库Id"
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
      <el-form-item label="税额" prop="taxMoney">
        <el-input
          v-model="queryParams.taxMoney"
          placeholder="请输入税额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="价税合计" prop="taxLastMoney">
        <el-input
          v-model="queryParams.taxLastMoney"
          placeholder="请输入价税合计"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="批号" prop="batchNumber">
        <el-input
          v-model="queryParams.batchNumber"
          placeholder="请输入批号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="有效日期" prop="expirationDate">
        <el-date-picker clearable
          v-model="queryParams.expirationDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择有效日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关联明细id" prop="linkId">
        <el-input
          v-model="queryParams.linkId"
          placeholder="请输入关联明细id"
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
          v-hasPermi="['xsystem:depot_item:add']"
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
          v-hasPermi="['xsystem:depot_item:edit']"
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
          v-hasPermi="['xsystem:depot_item:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['xsystem:depot_item:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="depot_itemList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="表头Id" align="center" prop="headerId" />
      <el-table-column label="商品Id" align="center" prop="materialId" />
      <el-table-column label="商品扩展id" align="center" prop="materialExtendId" />
      <el-table-column label="商品计量单位" align="center" prop="materialUnit" />
      <el-table-column label="多属性" align="center" prop="sku" />
      <el-table-column label="数量" align="center" prop="operNumber" />
      <el-table-column label="基础数量，如kg、瓶" align="center" prop="basicNumber" />
      <el-table-column label="单价" align="center" prop="unitPrice" />
      <el-table-column label="含税单价" align="center" prop="taxUnitPrice" />
      <el-table-column label="金额" align="center" prop="allPrice" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="仓库ID" align="center" prop="depotId" />
      <el-table-column label="调拨时，对方仓库Id" align="center" prop="anotherDepotId" />
      <el-table-column label="税率" align="center" prop="taxRate" />
      <el-table-column label="税额" align="center" prop="taxMoney" />
      <el-table-column label="价税合计" align="center" prop="taxLastMoney" />
      <el-table-column label="商品类型" align="center" prop="materialType" />
      <el-table-column label="序列号列表" align="center" prop="snList" />
      <el-table-column label="批号" align="center" prop="batchNumber" />
      <el-table-column label="有效日期" align="center" prop="expirationDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.expirationDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关联明细id" align="center" prop="linkId" />
      <el-table-column label="租户id" align="center" prop="tenantId" />
      <el-table-column label="删除标记，0未删除，1删除" align="center" prop="deleteFlag" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['xsystem:depot_item:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['xsystem:depot_item:remove']"
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

    <!-- 添加或修改单据子对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="表头Id" prop="headerId">
          <el-input v-model="form.headerId" placeholder="请输入表头Id" />
        </el-form-item>
        <el-form-item label="商品Id" prop="materialId">
          <el-input v-model="form.materialId" placeholder="请输入商品Id" />
        </el-form-item>
        <el-form-item label="商品扩展id" prop="materialExtendId">
          <el-input v-model="form.materialExtendId" placeholder="请输入商品扩展id" />
        </el-form-item>
        <el-form-item label="商品计量单位" prop="materialUnit">
          <el-input v-model="form.materialUnit" placeholder="请输入商品计量单位" />
        </el-form-item>
        <el-form-item label="多属性" prop="sku">
          <el-input v-model="form.sku" placeholder="请输入多属性" />
        </el-form-item>
        <el-form-item label="数量" prop="operNumber">
          <el-input v-model="form.operNumber" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="基础数量，如kg、瓶" prop="basicNumber">
          <el-input v-model="form.basicNumber" placeholder="请输入基础数量，如kg、瓶" />
        </el-form-item>
        <el-form-item label="单价" prop="unitPrice">
          <el-input v-model="form.unitPrice" placeholder="请输入单价" />
        </el-form-item>
        <el-form-item label="含税单价" prop="taxUnitPrice">
          <el-input v-model="form.taxUnitPrice" placeholder="请输入含税单价" />
        </el-form-item>
        <el-form-item label="金额" prop="allPrice">
          <el-input v-model="form.allPrice" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="仓库ID" prop="depotId">
          <el-input v-model="form.depotId" placeholder="请输入仓库ID" />
        </el-form-item>
        <el-form-item label="调拨时，对方仓库Id" prop="anotherDepotId">
          <el-input v-model="form.anotherDepotId" placeholder="请输入调拨时，对方仓库Id" />
        </el-form-item>
        <el-form-item label="税率" prop="taxRate">
          <el-input v-model="form.taxRate" placeholder="请输入税率" />
        </el-form-item>
        <el-form-item label="税额" prop="taxMoney">
          <el-input v-model="form.taxMoney" placeholder="请输入税额" />
        </el-form-item>
        <el-form-item label="价税合计" prop="taxLastMoney">
          <el-input v-model="form.taxLastMoney" placeholder="请输入价税合计" />
        </el-form-item>
        <el-form-item label="序列号列表" prop="snList">
          <el-input v-model="form.snList" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="批号" prop="batchNumber">
          <el-input v-model="form.batchNumber" placeholder="请输入批号" />
        </el-form-item>
        <el-form-item label="有效日期" prop="expirationDate">
          <el-date-picker clearable
            v-model="form.expirationDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择有效日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="关联明细id" prop="linkId">
          <el-input v-model="form.linkId" placeholder="请输入关联明细id" />
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
import { listDepot_item, getDepot_item, delDepot_item, addDepot_item, updateDepot_item } from "@/api/erp/depot_item";

export default {
  name: "Depot_item",
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
      // 单据子表格数据
      depot_itemList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        headerId: null,
        materialId: null,
        materialExtendId: null,
        materialUnit: null,
        sku: null,
        operNumber: null,
        basicNumber: null,
        unitPrice: null,
        taxUnitPrice: null,
        allPrice: null,
        depotId: null,
        anotherDepotId: null,
        taxRate: null,
        taxMoney: null,
        taxLastMoney: null,
        materialType: null,
        snList: null,
        batchNumber: null,
        expirationDate: null,
        linkId: null,
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
    /** 查询单据子列表 */
    getList() {
      this.loading = true;
      listDepot_item(this.queryParams).then(response => {
        this.depot_itemList = response.rows;
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
        materialId: null,
        materialExtendId: null,
        materialUnit: null,
        sku: null,
        operNumber: null,
        basicNumber: null,
        unitPrice: null,
        taxUnitPrice: null,
        allPrice: null,
        remark: null,
        depotId: null,
        anotherDepotId: null,
        taxRate: null,
        taxMoney: null,
        taxLastMoney: null,
        materialType: null,
        snList: null,
        batchNumber: null,
        expirationDate: null,
        linkId: null,
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
      this.title = "添加单据子";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDepot_item(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改单据子";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDepot_item(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDepot_item(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除单据子编号为"' + ids + '"的数据项？').then(function() {
        return delDepot_item(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('xsystem/depot_item/export', {
        ...this.queryParams
      }, `depot_item_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
