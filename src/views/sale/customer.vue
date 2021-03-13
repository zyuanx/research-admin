<template>
    <div style="padding:20px;">
        <h1>Customer</h1>
    </div>
</template>

<script>
import {
    getCustomer,
    updateCustomer,
    addCustomer,
    deleteCustomer
} from "@/api/sale/customer";
export default {
    name: "Customer",
    data() {
        return {
            tableData: []
        };
    },
    created() {
        this.getCustomerData();
    },
    methods: {
        async getCustomerData() {
            const res = await getCustomer();
            this.tableData = res.data;
        }
    }
};
</script>

<style></style>
