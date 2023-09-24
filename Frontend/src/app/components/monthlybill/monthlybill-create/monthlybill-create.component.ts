import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonthlyBill } from 'src/app/classes/monthlyBill';
import { MonthlybillService } from 'src/app/services/monthlybill.service';

@Component({
  selector: 'app-monthlybill-create',
  templateUrl: './monthlybill-create.component.html',
  styleUrls: ['./monthlybill-create.component.css']
})
export class MonthlybillCreateComponent implements OnInit {

  monthlyBill: MonthlyBill = new MonthlyBill();

  customerId!: number;

  errorAlert: boolean = false;

  errorMessage: string = ""

  MONTH_PATTERN = "^(?:January|February|March|April|May|June|July|August|September|October|November|December)$"

  constructor(private monthBillService: MonthlybillService, private router: Router) { }

  ngOnInit(): void {
  }

  saveMonthlyBill(){
    this.monthBillService.addMonthlyBill(this.monthlyBill, this.customerId)
    .subscribe(response => {
      console.log(response);
      setTimeout(() => {
        this.router.navigate(['/monthlyBills'])
      },500)
    },
    (error) => {
      console.log(error);
      this.errorAlert = true;
      this.errorMessage = error;
    })
  }

  onSubmit(){
    console.log(this.monthlyBill);
    this.saveMonthlyBill();
    
  }

}
