const salesInvoice = Vue.component("sales-invoice", {
  template: `
        <div>
            <div class="row">
                <div class="col-xs-12">
                    <a href="" v-on:click.prevent="print"><i class="fa fa-print"></i> Print</a>
                </div>
            </div>
            
            <div id="invoiceContent">
                <div class="row">
                    <div class="col-xs-12 text-center">
                        <div _h098asdh>
                            বিক্রয় চালান
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-7">
                        <strong>কাস্টমার আইডি:</strong> {{ sales.Customer_Code }}<br>
                        <strong>কাস্টমার নাম:</strong> {{ sales.Customer_Name }}<br>
                        <strong>কাস্টমার ঠিকানা:</strong> {{ sales.Customer_Address }}<br>
                        <strong>কাস্টমার মোবাইল:</strong> {{ convertToBanglaNumber(sales.Customer_Mobile) }} <br>
                        <strong>ট্রাক নং.:</strong> {{ sales.Truck_Name }}<br>
                    </div>
                    <div class="col-xs-5 text-right">
                        <strong>সেলস বাই:</strong> {{ sales.AddBy }}<br>
                        <strong>ইনভয়েস নং.:</strong> {{ convertToBanglaNumber(sales.SaleMaster_InvoiceNo) }}<br>
                        <strong>সিরিয়াল নং.:</strong> {{ sales.serial_no }}<br>
                        <strong>চালান নং.:</strong> {{ sales.chalan_no }}<br>
                        <strong>সেলস তারিখ:</strong> {{ convertEnglishToBanglaDate(sales.SaleMaster_SaleDate) }} {{ sales.AddTime | formatDateTime('h:mm a') }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div _d9283dsc></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <table _a584de>
                            <thead>
                                <tr>
                                    <td>ক্রমিক</td>
                                    <td>বিবরণ</td>
                                    <td>পরিমান</td>
                                    <td>একক</td>
                                    <td>একক মূল্য</td>
                                    <td align="right">মোট টাকা</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, sl) in cart">
                                    <td>{{ convertToBanglaNumber(sl + 1) }}</td>
                                    <td>{{ product.Product_Name }}</td>
                                    <td>{{ convertToBanglaNumber(product.SaleDetails_TotalQuantity) }}</td>
                                    <td>{{ product.Unit_Name }}</td>
                                    <td>{{ convertToBanglaNumber(product.SaleDetails_Rate) }}</td>
                                    <td align="right">{{ convertToBanglaNumber(product.SaleDetails_TotalAmount) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-7">
                        <br>
                        <table _a584de class="pull-left" v-if="payments.length > 0">
                            <thead>
                                <tr>
                                    <td>ক্রমিক</td>
                                    <td>তারিখ</td>
                                    <td>ধরন</td>
                                    <td>টাকার পরিমান </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(payment, sl) in payments">
                                    <td>{{ convertToBanglaNumber(sl + 1) }}</td>
                                    <td>{{ convertEnglishToBanglaDate(payment.CPayment_date) }}</td>
                                    <td>{{payment.account_id == null ? payment.payment_by : payment.bank_name}}</td>
                                    <td>{{ convertToBanglaNumber(payment.CPayment_amount) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-xs-5">
                        <table _t92sadbc2>
                            <tr>
                                <td><strong>মোট মালের মূল্য:</strong></td>
                                <td style="text-align:right">{{ convertToBanglaNumber(sales.SaleMaster_SubTotalAmount) }}</td>
                            </tr>
                            <tr>
                                <td><strong>অন্যান্য খরচ:</strong></td>
                                <td style="text-align:right">{{ convertToBanglaNumber(sales.SaleMaster_Others) }}</td>
                            </tr>
                            <tr>
                                <td><strong>বাদ গাড়ী ভাড়া:</strong></td>
                                <td style="text-align:right">{{ convertToBanglaNumber(sales.SaleMaster_Freight) }}</td>
                            </tr>
                            <tr><td colspan="2" style="border-bottom: 1px solid #ccc"></td></tr>
                            <tr>
                                <td><strong>মোট চালানের মূল্য:</strong></td>
                                <td style="text-align:right">{{ convertToBanglaNumber(sales.SaleMaster_TotalSaleAmount) }}</td>
                            </tr>
                            <tr>
                                <td><strong>সাবেক জের:</strong></td>
                                <td style="text-align:right">{{convertToBanglaNumber(parseFloat(customerDue).toFixed(2))}}</td>
                            </tr>
                            <tr>
                                <td><strong>মোট দাম:</strong></td>
                                <td style="text-align:right">{{ convertToBanglaNumber(parseFloat(parseFloat(sales.SaleMaster_TotalSaleAmount) + +customerDue).toFixed(2))}}</td>
                            </tr>
                            <tr>
                                <td><strong>জমা বাদ:</strong></td>
                                <td style="text-align:right">{{convertToBanglaNumber(parseFloat(payments.reduce((acc, pre) => {return acc + +parseFloat(pre.CPayment_amount)},0) + +parseFloat(sales.SaleMaster_PaidAmount)).toFixed(2))}}</td>
                            </tr>
                            <tr><td colspan="2" style="border-bottom: 1px solid #ccc"></td></tr>
                            <tr>
                                <td><strong>বাকী:</strong></td>
                                <td style="text-align:right">{{convertToBanglaNumber(parseFloat((parseFloat(sales.SaleMaster_TotalSaleAmount)+ +customerDue)- payments.reduce((acc, pre) => {return acc + +parseFloat(pre.CPayment_amount)},0) + +parseFloat(sales.SaleMaster_PaidAmount)).toFixed(2)) }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <strong>কথায়: </strong> {{ banglaText }}<br><br>
                        <strong>বর্ননা: </strong>
                        <p style="white-space: pre-line">{{ sales.SaleMaster_Description }}</p>
                    </div>
                </div>
            </div>
        </div>
    `,
  props: ["sales_id"],
  data() {
    return {
      dateFrom: moment().format("YYYY-MM-DD"),
      dateTo: moment().format("YYYY-MM-DD"),
      banglaText: "",
      englishText: "",
      sales: {
        SaleMaster_InvoiceNo: null,
        SalseCustomer_IDNo: null,
        SaleMaster_SaleDate: null,
        Customer_Name: null,
        Customer_Address: null,
        Customer_Mobile: null,
        SaleMaster_TotalSaleAmount: null,
        SaleMaster_TotalDiscountAmount: null,
        SaleMaster_TaxAmount: null,
        SaleMaster_Freight: null,
        SaleMaster_SubTotalAmount: null,
        SaleMaster_PaidAmount: null,
        SaleMaster_DueAmount: null,
        SaleMaster_Previous_Due: null,
        SaleMaster_Description: null,
        AddBy: null,
      },
      cart: [],
      payments: [],
      customerDue: 0.0,
      style: null,
      companyProfile: null,
      currentBranch: null,
    };
  },
  filters: {
    formatDateTime(dt, format) {
      return dt == "" || dt == null ? "" : moment(dt).format(format);
    },
  },
  async created() {
    this.setStyle();
    await this.getSales();
    this.getCurrentBranch();
  },
  methods: {
    async getSales() {
      await axios.post("/get_sales", { salesId: this.sales_id }).then((res) => {
        this.sales = res.data.sales[0];
        this.cart = res.data.saleDetails;
        this.dateTo = this.sales.SaleMaster_SaleDate;
      });

      await axios
        .post("/get_sales", { customerId: this.sales.SalseCustomer_IDNo })
        .then((res) => {
          let salesdata = res.data;
          let h = salesdata.sales.filter(
            (sale) => sale.SaleMaster_SaleDate < this.sales.SaleMaster_SaleDate
          );
          if (h.length > 0) {
            this.dateFrom = h[0].SaleMaster_SaleDate;
          } else {
            this.dateFrom = "";
          }
        });

      await this.getPayments();
      await this.getCustomerDue();
      this.convertNumberToWords(
        parseFloat(this.sales.SaleMaster_TotalSaleAmount) + +this.customerDue
      );
      await this.translate();
    },
    async getPayments() {
      let data = {
        dateFrom: moment(this.dateFrom).add(1, "d").format("YYYY-MM-DD"),
        dateTo: this.dateTo,
        customerId: this.sales.SalseCustomer_IDNo,
      };
      if (this.dateFrom == "") {
        data = { customerId: this.sales.SalseCustomer_IDNo };
      }
      await axios.post("/get_customer_payments", data).then((res) => {
        this.payments = res.data.filter(
          (payment) => payment.CPayment_date <= this.dateTo
        );
      });
    },
    async getCustomerDue() {
      await axios
        .post("/get_customer_due", {
          customerId: this.sales.SalseCustomer_IDNo,
          dateTo: this.sales.SaleMaster_SaleDate,
        })
        .then((res) => {
          this.customerDue =
            res.data[0].dueAmount > 0 ? res.data[0].dueAmount : 0;
        });
    },
    getCurrentBranch() {
      axios.get("/get_current_branch").then((res) => {
        this.currentBranch = res.data;
      });
    },
    setStyle() {
      this.style = document.createElement("style");
      this.style.innerHTML = `
                div[_h098asdh]{
                    /*background-color:#e0e0e0;*/
                    font-weight: bold;
                    font-size:15px;
                    margin-bottom:15px;
                    padding: 5px;
                    border-top: 1px dotted #454545;
                    border-bottom: 1px dotted #454545;
                }
                div[_d9283dsc]{
                    padding-bottom:25px;
                    border-bottom: 1px solid #ccc;
                    margin-bottom: 15px;
                }
                table[_a584de]{
                    width: 100%;
                    text-align:center;
                }
                table[_a584de] thead{
                    font-weight:bold;
                }
                table[_a584de] td{
                    padding: 3px;
                    border: 1px solid #ccc;
                }
                table[_t92sadbc2]{
                    width: 100%;
                }
                table[_t92sadbc2] td{
                    padding: 2px;
                }
            `;
      document.head.appendChild(this.style);
    },
    async translate() {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=bn&dt=t&q=${encodeURIComponent(
          this.englishText
        )}`
      );
      const data = await response.json();
      this.banglaText = data[0][0][0];
    },
    convertToBanglaNumber(number) {
      const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

      const numberString = String(number);
      let banglaNumber = "";

      for (let i = 0; i < numberString.length; i++) {
        const digit = numberString[i];
        const englishIndex = englishNumbers.indexOf(digit);

        if (englishIndex !== -1) {
          const banglaDigit = banglaNumbers[englishIndex];
          banglaNumber += banglaDigit;
        } else {
          banglaNumber += digit;
        }
      }

      return banglaNumber;
    },

    convertEnglishToBanglaDate(date) {
      const d = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Dhaka",
        numberingSystem: "beng",
      };

      const banglaDate = d.toLocaleDateString("bn-BD", options);
      return banglaDate;
    },

    convertNumberToWords(amountToWord) {
      var words = new Array();
      words[0] = "";
      words[1] = "One";
      words[2] = "Two";
      words[3] = "Three";
      words[4] = "Four";
      words[5] = "Five";
      words[6] = "Six";
      words[7] = "Seven";
      words[8] = "Eight";
      words[9] = "Nine";
      words[10] = "Ten";
      words[11] = "Eleven";
      words[12] = "Twelve";
      words[13] = "Thirteen";
      words[14] = "Fourteen";
      words[15] = "Fifteen";
      words[16] = "Sixteen";
      words[17] = "Seventeen";
      words[18] = "Eighteen";
      words[19] = "Nineteen";
      words[20] = "Twenty";
      words[30] = "Thirty";
      words[40] = "Forty";
      words[50] = "Fifty";
      words[60] = "Sixty";
      words[70] = "Seventy";
      words[80] = "Eighty";
      words[90] = "Ninety";
      amount = amountToWord == null ? "0.00" : amountToWord.toString();
      var atemp = amount.split(".");
      var number = atemp[0].split(",").join("");
      var n_length = number.length;
      var words_string = "";
      if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
          received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
          n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
          if (i == 0 || i == 2 || i == 4 || i == 7) {
            if (n_array[i] == 1) {
              n_array[j] = 10 + parseInt(n_array[j]);
              n_array[i] = 0;
            }
          }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
          if (i == 0 || i == 2 || i == 4 || i == 7) {
            value = n_array[i] * 10;
          } else {
            value = n_array[i];
          }
          if (value != 0) {
            words_string += words[value] + " ";
          }
          if (
            (i == 1 && value != 0) ||
            (i == 0 && value != 0 && n_array[i + 1] == 0)
          ) {
            words_string += "Crores ";
          }
          if (
            (i == 3 && value != 0) ||
            (i == 2 && value != 0 && n_array[i + 1] == 0)
          ) {
            words_string += "Lakhs ";
          }
          if (
            (i == 5 && value != 0) ||
            (i == 4 && value != 0 && n_array[i + 1] == 0)
          ) {
            words_string += "Thousand ";
          }
          if (
            i == 6 &&
            value != 0 &&
            n_array[i + 1] != 0 &&
            n_array[i + 2] != 0
          ) {
            words_string += "Hundred and ";
          } else if (i == 6 && value != 0) {
            words_string += "Hundred ";
          }
        }
        words_string = words_string.split("  ").join(" ");
      }
      this.englishText = words_string + " only";
      return words_string + " only";
    },

    async print() {
      let invoiceContent = document.querySelector("#invoiceContent").innerHTML;
      let printWindow = window.open(
        "",
        "PRINT",
        `width=${screen.width}, height=${screen.height}, left=0, top=0`
      );
      if (this.currentBranch.print_type == "3") {
        printWindow.document.write(`
                    <html>
                        <head>
                            <title>Invoice</title>
                            <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
                            <style>
                                body, table{
                                    font-size:11px;
                                }
                            </style>
                        </head>
                        <body>
                            <div style="text-align:center;">
                                <img src="/uploads/company_profile_thum/${this.currentBranch.Company_Logo_org}" alt="Logo" style="height:80px;margin:0px;" /><br>
                                <strong style="font-size:18px;">${this.currentBranch.Company_Name}</strong><br>
                                <p style="white-space:pre-line;">${this.currentBranch.Repot_Heading}</p>
                            </div>
                            ${invoiceContent}
                        </body>
                    </html>
                `);
      } else if (this.currentBranch.print_type == "2") {
        printWindow.document.write(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Invoice</title>
                        <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
                        <style>
                            html, body{
                                width:500px!important;
                            }
                            body, table{
                                font-size: 13px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="row">
                            <div class="col-xs-2"><img src="/uploads/company_profile_thum/${this.currentBranch.Company_Logo_org}" alt="Logo" style="height:80px;" /></div>
                            <div class="col-xs-10" style="padding-top:20px;">
                                <strong style="font-size:18px;">${this.currentBranch.Company_Name}</strong><br>
                                <p style="white-space:pre-line;">${this.currentBranch.Repot_Heading}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <div style="border-bottom: 4px double #454545;margin-top:7px;margin-bottom:7px;"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                ${invoiceContent}
                            </div>
                        </div>
                    </body>
                    </html>
				`);
      } else {
        printWindow.document.write(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Invoice</title>
                        <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
                        <style>
                            body, table{
                                font-size: 13px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <table style="width:100%;">
                                <thead>
                                    <tr>
                                        <td>
                                            <div class="row">
                                                <div class="col-xs-2"><img src="/uploads/company_profile_thum/${
                                                  this.currentBranch
                                                    .Company_Logo_org
                                                }" alt="Logo" style="height:80px;" /></div>
                                                <div class="col-xs-10" style="padding-top:20px;">
                                                    <strong style="font-size:18px;">${
                                                      this.currentBranch
                                                        .Company_Name
                                                    }</strong><br>
                                                    <p style="white-space:pre-line;">${
                                                      this.currentBranch
                                                        .Repot_Heading
                                                    }</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    <div style="border-bottom: 4px double #454545;margin-top:7px;margin-bottom:7px;"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    ${invoiceContent}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>
                                            <div style="width:100%;height:50px;">&nbsp;</div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div class="row" style="border-bottom:1px solid #ccc;margin-bottom:5px;padding-bottom:6px;">
                                <div class="col-xs-6">
                                    <span style="text-decoration:overline;">Received by</span><br><br>
                                    ** THANK YOU FOR YOUR BUSINESS **
                                </div>
                                <div class="col-xs-6 text-right">
                                    <span style="text-decoration:overline;">Authorized by</span>
                                </div>
                            </div>
                            <div style="position:fixed;left:0;bottom:15px;width:100%;">
                                <div class="row" style="font-size:12px;">
                                    <div class="col-xs-6">
                                        Print Date: ${moment().format(
                                          "DD-MM-YYYY h:mm a"
                                        )}, Printed by: ${this.sales.AddBy}
                                    </div>
                                    <div class="col-xs-6 text-right">
                                        Developed by: Link-Up Technologoy, Contact no: 01911978897
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </body>
                    </html>
				`);
      }
      let invoiceStyle = printWindow.document.createElement("style");
      invoiceStyle.innerHTML = this.style.innerHTML;
      printWindow.document.head.appendChild(invoiceStyle);
      printWindow.moveTo(0, 0);

      printWindow.focus();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      printWindow.print();
      printWindow.close();
    },
  },
});
