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
                      <div class="col-xs-8">
                          <strong style="font-size:14px;font-weight:bold;">নাম: {{ sales.Customer_Name }}</strong><br>
                          <strong>ঠিকানা:</strong> {{ sales.Customer_Address }}<br>
                          <strong>মোবাইল:</strong> {{ convertToBanglaNumber(sales.Customer_Mobile) }} <br>
                          <strong>ট্রাক নং.:</strong> {{ sales.Truck_Name }}<br>
                      </div>
                      <div class="col-xs-4 text-left">
                          <span id="addby"><strong>সেলস বাই:</strong> {{ sales.AddBy }}<br></span>
                          <strong>কাস্টমার আইডি:</strong> {{ sales.Customer_Code }}<br>
                          <strong>ইনভয়েস নং.:</strong> {{ convertToBanglaNumber(sales.SaleMaster_InvoiceNo) }}<br>
                          <strong>সিরিয়াল নং.:</strong> {{ sales.serial_no }}<br>
                          <strong>চালান নং.:</strong> {{ sales.chalan_no }}<br>
                          <strong>পার্টি নং.:</strong> {{ sales.party_no }}<br>
                          <strong>তারিখ:</strong> {{ convertEnglishToBanglaDate(sales.SaleMaster_SaleDate) }} {{ sales.AddTime | formatDateTime('h:mm a') }}
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
                                      <td>বস্তার সংখ্যা</td>
                                      <td>বস্তার ওজন</td>
                                      <td>প্রতি বস্তার মূল্য</td>
                                      <td align="right">মোট টাকা</td>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr v-for="(product, sl) in cart">
                                      <td>{{ convertToBanglaNumber(sl + 1) }}</td>
                                      <td>{{ product.Product_Name }}</td>
                                      <td>{{ convertToBanglaNumber(product.SaleDetails_TotalQuantity) }} {{product.Unit_Name}}</td>
                                      <td>{{ convertToBanglaNumber(product.SaleDetails_per_unit) }}</td>
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
                                      <td>{{payment.account_id == null ? 'নগদ' : payment.bank_name}}</td>
                                      <td>{{ convertToBanglaNumber(payment.CPayment_amount) }}</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <div class="col-xs-5">
                          <table _t92sadbc2>
                              <tr>
                                  <td><strong>মোট মালের মূল্য:</strong></td>
                                  <td style="text-align:right;color:black;">{{ convertToBanglaNumber(sales.SaleMaster_SubTotalAmount) }}</td>
                              </tr>
                              <tr>
                                  <td><strong>অন্যান্য খরচ:</strong></td>
                                  <td style="text-align:right;color:black;">{{ convertToBanglaNumber(sales.SaleMaster_Others) }}</td>
                              </tr>
                              <tr>
                                  <td><strong>বাদ গাড়ী ভাড়া:</strong></td>
                                  <td style="text-align:right;color:black;">{{ convertToBanglaNumber(sales.SaleMaster_Freight) }}</td>
                              </tr>
                              <tr>
                                  <td><strong>মোট চালানের মূল্য:</strong></td>
                                  <td style="text-align:right;color:black;">{{ convertToBanglaNumber(sales.SaleMaster_TotalSaleAmount) }}</td>
                              </tr>
                              <tr>
                                  <td><strong>সাবেক জের:</strong></td>
                                  <td style="text-align:right;color:black;">{{convertToBanglaNumber(parseFloat(customerDue).toFixed(2))}}</td>
                              </tr>
                              <tr>
                                  <td><strong>মোট দাম:</strong></td>
                                  <td style="text-align:right;color:black;">{{ convertToBanglaNumber(parseFloat(parseFloat(sales.SaleMaster_TotalSaleAmount) + +customerDue).toFixed(2))}}</td>
                              </tr>
                              <tr>
                                  <td><strong>জমা বাদ:</strong></td>
                                  <td style="text-align:right;color:black;">{{convertToBanglaNumber(parseFloat(payments.reduce((acc, pre) => {return acc + +parseFloat(pre.CPayment_amount)},0) + +parseFloat(sales.SaleMaster_PaidAmount)).toFixed(2))}}</td>
                              </tr>
                              <tr>
                                  <td><strong>বাকী:</strong></td>
                                  <td style="text-align:right;color:black;">{{convertToBanglaNumber(totaldueAmount) }}</td>
                              </tr>
                          </table>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-xs-12">
                          <strong>কথায়: </strong> {{ banglaText }} <br><br>
                          <!--<strong>বর্ণনা: </strong>
                          <p style="white-space: pre-line">{{ sales.SaleMaster_Description }}</p>-->
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
      englishText: "",
      banglaText: "",
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
      todayPayments: [],
      customerDue: 0.0,
      totaldueAmount: 0.0,
      lastPaymentDate: "",
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
    },
    async getPayments() {
      let data = {
        dateFrom:
          this.dateFrom == ""
            ? moment().format("YYYY-MM-DD")
            : moment(this.dateFrom).add(1, "d").format("YYYY-MM-DD"),
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
        if (this.payments.length > 0) {
          this.lastPaymentDate =
            this.payments[this.payments.length - 1].CPayment_date;
        } else {
          this.lastPaymentDate = this.sales.SaleMaster_SaleDate;
        }
      });
    },
    async getCustomerDue() {
      await axios
        .post("/get_customer_due", {
          customerId: this.sales.SalseCustomer_IDNo,
          dateTo: this.lastPaymentDate,
        })
        .then((res) => {
          this.customerDue = res.data[0].dueAmount;
        });

      this.totaldueAmount = parseFloat(
        parseFloat(this.sales.SaleMaster_TotalSaleAmount) +
          +this.customerDue -
          (this.payments.reduce((acc, pre) => {
            return acc + +parseFloat(pre.CPayment_amount);
          }, 0) +
            +parseFloat(this.sales.SaleMaster_PaidAmount))
      ).toFixed(2);

      await this.convertBan(
        parseFloat(
          parseFloat(this.sales.SaleMaster_TotalSaleAmount) + +this.customerDue
        )
      );
    },
    invoiceTextChange() {
      let data = {
        salesId: this.sales_id,
        invoiceText: this.sales.invoiceText,
      };
      axios.post("/salesinvoicetext", data).then((res) => {
        this.sales.invoiceText = res.data.invoiceText;
      });
    },
    async convertBan(num) {
      var a1 = ["", "এক ", "দুই ", "তিন ", "চার ", "পাঁচ ", "ছয় ", "সাত ", "আট ", "নয় ", "দশ ", "এগার ", "বার ", "তের ", "চৌদ্দ ", "পনের ", "ষোল ", "সতের ", "আঠার ", "ঊনিশ ", "বিশ ", "একুশ ", "বাইশ ", "তেইশ ", "চব্বিশ ", "পঁচিশ ", "ছাব্বিশ ", "সাতাশ ", "আটাশ ", "ঊনত্রিশ ", "ত্রিশ ", "একত্রিশ ", "বত্রিশ ", "তেত্রিশ ", "চৌত্রিশ ", "পঁয়ত্রিশ ", "ছত্রিশ ", "সাঁইত্রিশ ", "আটত্রিশ ", "ঊনচল্লিশ ", "চল্লিশ ", "একচল্লিশ ", "বিয়াল্লিশ ", "তেতাল্লিশ ", "চুয়াল্লিশ ", "পঁয়তাল্লিশ ", "ছেচল্লিশ ", "সাতচল্লিশ ", "আটচল্লিশ ", "ঊনপঞ্চাশ ", "পঞ্চাশ ", "একান্ন ", "বায়ান্ন ", "তিপ্পান্ন ", "চুয়ান্ন ", "পঞ্চান্ন ", "ছাপ্পান্ন ", "সাতান্ন ", "আটান্ন ", "ঊনষাট ", "ষাট ", "একষট্টি ", "বাষট্টি ", "তেষট্টি ", "চৌষট্টি ", "পঁয়ষট্টি ", "ছেষট্টি ", "সাতষট্টি ", "আটষট্টি ", "ঊনসত্তর ", "সত্তর ", "একাত্তর ", "বাহাত্তর ", "তিয়াত্তর ", "চুয়াত্তর ", "পঁচাত্তর ", "ছিয়াত্তর ", "সাতাত্তর ", "আটাত্তর ", "ঊনআশি ", "আশি ", "একাশি ", "বিরাশি ", "তিরাশি ", "চুরাশি ", "পঁচাশি ", "ছিয়াশি ", "সাতাশি ", "আটাশি ", "ঊননব্বই ", "নব্বই ", "একানব্বই ", "বিরানব্বই ", "তিরানব্বই ", "চুরানব্বই ", "পঁচানব্বই ", "ছিয়ানব্বই ", "সাতানব্বই ", "আটানব্বই ", "নিরানব্বই ",];
      var b1 = [
        "",
        "",
        "বিশ",
        "ত্রিশ",
        "চল্লিশ",
        "পঞ্চাশ",
        "ষাট",
        "সত্তর",
        "আশি",
        "নব্বই",
      ];
      if ((num = num.toString()).length > 9) return "overflow";
      n = ("000000000" + num)
        .substr(-9)
        .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return;
      var str = "";
      str +=
        n[1] != 0
          ? (a1[Number(n[1])] || b1[n[1][0]] + " " + a[n[1][1]]) + "কোটি "
          : "";
      str +=
        n[2] != 0
          ? (a1[Number(n[2])] || b1[n[2][0]] + " " + a[n[2][1]]) + "লাখ "
          : "";
      str +=
        n[3] != 0
          ? (a1[Number(n[3])] || b1[n[3][0]] + " " + a[n[3][1]]) + "হাজার "
          : "";
      str +=
        n[4] != 0
          ? (a1[Number(n[4])] || b1[n[4][0]] + " " + a[n[4][1]]) + "শত "
          : "";
      str +=
        n[5] != 0
          ? (str != "" ? " " : "") +
            (a1[Number(n[5])] || b1[n[5][0]] + " " + a1[n[5][1]]) +
            "টাকা মাত্র ।"
          : "টাকা মাত্র ।";

      this.banglaText = str;
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
                      border-bottom: 1px solid black;
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
                      border: 1px solid black;
                  }
                  table[_t92sadbc2]{
                      width: 100%;
                      margin-top:5px;
                  }
                  table[_t92sadbc2] tr{
                      border: 1px solid black;
                      border-top: 0;
                  }
                  table[_t92sadbc2] tr:first-child{
                      border-top: 1px solid black;
                  }
                  table[_t92sadbc2] td{
                      padding: 2px;
                      font-weight:bold;
                  }
              `;
      document.head.appendChild(this.style);
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
                                  @media print{
                                    #addby{
                                        display: none;
                                    }
                                  }
                              </style>
                          </head>
                          <body>
                              <div class="container" style="position:relative;">
                                  <div class="row" style="position:absolute;top:0;left:0;width:100%;">
                                      <div class="col-xs-12">
                                          <div style="text-align:center;">
                                              <img src="/uploads/company_profile_thum/${this.currentBranch.Company_Logo_org}" alt="Logo" style="height:80px;margin:0px;" /><br>
                                              <strong style="font-size:18px;">${this.currentBranch.Company_Name}</strong><br>
                                              <p style="white-space:pre-line;">${this.currentBranch.Repot_Heading}</p>
                                          </div>
                                      </div>
                                  </div>
                                  <table style="width:100%;">
                                      <thead>
                                          <tr>
                                              <td>
                                                  <div style="height:125px;"></div>
                                              <td>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr>
                                              <td>
                                                  ${invoiceContent}
                                              </td>
                                          </tr>
                                      </tbody>
                                      <tfoot>
                                          <tr>
                                              <td>
                                                  <div style="height:25px;"></div>
                                              </td>
                                          </tr>
                                      </tfoot>
                                  </table>
  
                                  <div class="row" style="position:fixed;bottom:0;left:0;width:100%;">
                                    <div class="col-xs-4">
                                        <span style="text-decoration:overline;">প্রস্তুতকারকের স্বাক্ষর</span>
                                    </div>
                                    <div class="col-xs-4 text-center">
                                        <span style="text-decoration:overline;">ম্যানেজারের স্বাক্ষর</span>
                                    </div>
                                    <div class="col-xs-4 text-right">
                                        <span style="text-decoration:overline;">মালিকের স্বাক্ষর</span>
                                    </div>
                                  </div>
                              </div>
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
                              @media print{
                                #addby{
                                    display: none;
                                }
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
                              @media print{
                                #addby{
                                    display: none;
                                }
                              }
                          </style>
                      </head>
                      <body>
                        <div class="container" style="position:relative;">
                            <div class="row" style="position:absolute;top:0;left:0;width:100%;">
                                <div class="col-xs-12">
                                    <div style="text-align:center;">
                                        <img src="/uploads/company_profile_thum/${this.currentBranch.Company_Logo_org}" alt="Logo" style="height:80px;margin:0px;" /><br>
                                        <strong style="font-size:18px;">${this.currentBranch.Company_Name}</strong><br>
                                        <p style="white-space:pre-line;">${this.currentBranch.Repot_Heading}</p>
                                    </div>
                                </div>
                            </div>
                            <table style="width:100%;">
                                <thead>
                                    <tr>
                                        <td>
                                            <div style="height:125px;"></div>
                                        <td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            ${invoiceContent}
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>
                                            <div style="height:25px;"></div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                            <div class="row" style="position:fixed;bottom:0;left:0;width:100%;">
                                <div class="col-xs-4">
                                    <span style="text-decoration:overline;">প্রস্তুতকারকের স্বাক্ষর</span>
                                </div>
                                <div class="col-xs-4 text-center">
                                    <span style="text-decoration:overline;">ম্যানেজারের স্বাক্ষর</span>
                                </div>
                                <div class="col-xs-4 text-right">
                                    <span style="text-decoration:overline;">মালিকের স্বাক্ষর</span>
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
