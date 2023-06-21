<div id="supplierListReport">
    <div class="row">
        <div class="col-xs-12 col-md-12 col-lg-12" style="border-bottom:1px #ccc solid;">
            <div class="form-group">
                <label class="col-sm-1 control-label no-padding-right">Search Type</label>
                <div class="col-sm-2">
                    <select class="form-control" v-model="searchType" v-on:change="onChangeSearchType"
                        style="padding:0px;">
                        <option value="all">All</option>
                        <option value="area">By Area</option>
                    </select>
                </div>
            </div>


            <div class="form-group" style="display: none" v-bind:style="{display: searchType == 'area' ? '' : 'none'}">
                <label class="col-sm-1 control-label no-padding-right">Select Area</label>
                <div class="col-sm-2">
                    <v-select v-bind:options="areas" v-model="selectedArea" label="District_Name"
                        placeholder="Select area">
                    </v-select>
                </div>
            </div>

            <div class="form-group" style="display: none" v-bind:style="{display: searchType == 'area' ? '' : 'none'}">
                <div class="col-sm-2">
                    <input type="button" class="btn btn-primary" value="Show Report" v-on:click="getAreaSuppliers"
                        style="margin-top:0px;border:0px;height:28px;">
                </div>
            </div>

        </div>
    </div>

    <div style="display:none;" v-bind:style="{display: suppliers.length > 0 ? '' : 'none'}">
        <div class="row">
            <div class="col-md-12">
                <a href="" @click.prevent="printSupplierList"><i class="fa fa-print"></i> Print</a>
            </div>
        </div>

        <div class="row" style="margin-top:15px;">
            <div class="col-md-12">
                <div class="table-responsive" id="printContent">
                    <table class="table table-bordered table-condensed">
                        <thead>
                            <th>Sl</th>
                            <th>Supplier Id</th>
                            <th>Supplier Name</th>
                            <th>Address</th>
                            <th>Contact No.</th>
                        </thead>
                        <tbody>
                            <tr v-for="(supplier, sl) in suppliers">
                                <td>{{ sl + 1 }}</td>
                                <td>{{ supplier.Supplier_Code }}</td>
                                <td>{{ supplier.Supplier_Name }}</td>
                                <td>{{ supplier.Supplier_Address }} {{ supplier.District_Name }}</td>
                                <td>{{ supplier.Supplier_Mobile }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div style="display:none;text-align:center;" v-bind:style="{display: suppliers.length > 0 ? 'none' : ''}">
        No records found
    </div>
</div>

<script src="<?php echo base_url(); ?>assets/js/vue/vue.min.js"></script>
<script src="<?php echo base_url(); ?>assets/js/vue/axios.min.js"></script>
<script src="<?php echo base_url();?>assets/js/vue/vue-select.min.js"></script>

<script>
Vue.component('v-select', VueSelect.VueSelect);
new Vue({
    el: '#supplierListReport',
    data() {
        return {
            suppliers: [],
            searchType: 'all',
            selectedArea: null,
            areas: [],
        }
    },
    created() {
        this.getSuppliers();
    },
    methods: {
        getSuppliers() {
            axios.get('/get_suppliers').then(res => {
                this.suppliers = res.data;
            })
        },
        onChangeSearchType() {

            if (this.searchType == 'area') {
                this.getArea();
            }

            if (this.searchType == 'all') {
                this.selectedArea.District_SlNo = null;
                this.getSuppliers();
            }

        },


        getAreaSuppliers() {

            let filter = {
                areaId: this.selectedArea != null ? this
                    .selectedArea.District_SlNo : null
            }
            axios.post('/get_suppliers', filter).then(res => {
                this.suppliers = res.data;
            })

        },


        getArea() {
            axios.get('/get_districts').then(res => {
                this.areas = res.data;
            })
        },

        async printSupplierList() {
            let printContent = `
                    <div class="container">
                        <h4 style="text-align:center">Supplier List</h4 style="text-align:center">
						<div class="row">
							<div class="col-xs-12">
								${document.querySelector('#printContent').innerHTML}
							</div>
						</div>
                    </div>
                `;

            let printWindow = window.open('', '', `width=${screen.width}, height=${screen.height}`);
            printWindow.document.write(`
                    <?php $this->load->view('Administrator/reports/reportHeader.php'); ?>
                `);

            printWindow.document.body.innerHTML += printContent;
            printWindow.focus();
            await new Promise(r => setTimeout(r, 1000));
            printWindow.print();
            await new Promise(resolve => setTimeout(resolve, 1000));
            printWindow.close();
        }
    }
})
</script>