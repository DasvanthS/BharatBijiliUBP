import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonthlyBill } from 'src/app/classes/monthlyBill';
import { Transaction } from 'src/app/classes/transaction';
import { MonthlybillService } from 'src/app/services/monthlybill.service';

@Component({
  selector: 'app-update-cash',
  templateUrl: './update-cash.component.html',
  styleUrls: ['./update-cash.component.css']
})
export class UpdateCashComponent implements OnInit {

  billId!: number;
  monthlyBill!:MonthlyBill;

  isValidBill:boolean = false

  alertError: boolean = false;
  errorMessage:string = "" 

  alertPaid: boolean = false;
  paidMessage:string = "" 

  transaction!:Transaction;

  constructor(private monthlyBillService: MonthlybillService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.monthlyBillService.getBillById(this.billId)
    .subscribe(response => {
      console.log(response);
      this.monthlyBill = response;
      this.isValidBill = true;
      this.alertError = false;
    },
    error => {
      this.alertError = true;
      this.alertPaid = false;
      this.errorMessage = error;
    })
  }

  onPay(){
    this.monthlyBillService.updateCash(this.billId)
    .subscribe(response => {
      console.log(response);
      this.transaction = response;
      this.alertPaid = false;
      setTimeout(() => {
        this.router.navigate(['transactions/getTransactionById',this.transaction.id])
      },500);
    },
    error => {
      console.log(error);
      this.alertPaid = true;
      this.paidMessage = error
    }
    )
  }

}
