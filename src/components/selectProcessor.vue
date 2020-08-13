<template>
  <div>
    <el-dialog title="选择人员" :visible="selectProcessordialogVisible" width="30%" @close="closedialog" center>
      <el-tree :data="selectProcessorList" show-checkbox node-key="value" ref="tree" :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submit('cancal')">取 消</el-button>
        <el-button type="primary" @click="submit('confirm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component({})
export default class selectProcessor extends Vue {
  public selectProcessorList: Array<object> = []; //选择人员列表
  public defaultProps: object = {
    children: "children",
    label: "label"
  };
  @Prop() showchecked: any; //回显选中的人员
  @Prop() Selectparams!: object; //发送请求的参数
  @State("selectProcessordialogVisible") selectProcessordialogVisible: any; //弹框状态
  @Mutation("selectProcessordialogVisiblemu")
  selectProcessordialogVisiblemu: any; //修改弹框状态
  @Mutation("setjoinUser") setjoinUser: any;
  @Emit("selectPeople")
  send(val: any) {} //把选择的人员传递给父组件
  closedialog() {
    //监听关闭弹框
    this.selectProcessordialogVisiblemu({ value: false });
  }
  @State("fatherson") fatherson: any;
  submit(_type) {
    if (_type == "cancal") {
      this.selectProcessordialogVisiblemu({ value: false });
    } else {
      //确定、取消
      let checked = this.$refs.tree.getCheckedNodes();
      let joinUserid: any = [];
      let joinUserName: any = [];
      checked.map((item: any) => {
        if (item.type == 0) {
          joinUserid.push(item.id);
          joinUserName.push(item.label);
        }
      });

      if (this.fatherson == "master" && joinUserid.length > 1) {
        this.$message({
          message: "主办人只能选择一个",
          type: "warning"
        });
      } else {
        joinUserid = joinUserid ? joinUserid.join(",") : null;
        joinUserName = joinUserName ? joinUserName.join(",") : null;
        let joinUser = {};
        joinUser.joinUserid = joinUserid;
        joinUser.joinUserName = joinUserName;

        this.send(joinUser);

        this.selectProcessordialogVisiblemu({ value: false });
      }
    }
  }

  @Watch("selectProcessordialogVisible")
  change(newValue: boolean, oldValue: boolean): viod {
    //监听选择人员的弹框显示，就获取人员列表
    if (newValue) {
      this.selectProcessorListTree();
    }
  }
  selectProcessorListTree() {
    //获取选择人员列表
    let params;
    params = JSON.parse(JSON.stringify(this.Selectparams));
    switch (this.fatherson) {
      case "master":
        params.type = 1;
        break;
      case "dealer":
        params.type = 2;
        break;
      case "copy":
        params.type = 3;
        break;
      default:
        params.type = null;
        break;
    }
    (this as any).$ajax.process
      .selectProcessorListTree({
        params
      })
      .then((res: any) => {
        if (res.state == 1000) {
          this.selectProcessorList = res.data.deptInfo;
          this.$refs.tree.setCheckedKeys(this.showchecked);
        }
      });
  }

  mounted() {}
}
</script>
<style lang="scss">
</style>

