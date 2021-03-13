<template>
    <div style="padding:20px;">
        <h1>Payment</h1>
        <el-table :data="tableData" size="mini" border stripe>
            <el-table-column
                type="index"
                label="序号"
                width="50"
                align="center"
            ></el-table-column>
            <el-table-column prop="customer" label="客户" width="120">
            </el-table-column>
            <el-table-column prop="money" label="金额"></el-table-column>
            <el-table-column prop="create_time" label="时间"></el-table-column>
            <el-table-column
                fixed="right"
                align="center"
                label="操作"
                width="100"
            >
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-edit"
                        circle
                        @click="editRole(scope.row)"
                    ></el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        circle
                        @click="deleteRole(scope.row)"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
import {
    getPayment,
    updatePayment,
    addPayment,
    deletePayment
} from "@/api/sale/payment";
export default {
    name: "Payment",
    data() {
        return {
            tableData: []
        };
    },
    created() {
        this.getPaymentData();
    },
    methods: {
        async getPaymentData() {
            const res = await getPayment();
            this.tableData = res.data.results;
        }
    }
};
</script>

<style></style>
