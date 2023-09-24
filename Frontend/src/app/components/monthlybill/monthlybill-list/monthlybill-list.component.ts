import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MonthlyBill } from 'src/app/classes/monthlyBill';
import { MonthlybillService } from 'src/app/services/monthlybill.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-monthlybill-list',
  templateUrl: './monthlybill-list.component.html',
  styleUrls: ['./monthlybill-list.component.css']
})
export class MonthlybillListComponent implements OnInit {

  monthlyBills: MonthlyBill[] = [];

  dataSource!: MatTableDataSource<any>;

  columns: string[] = ["BillID", "Month", "DueDate", "UnitConsumption", "Amount", "CustomerID", "Paid"];

  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private monthlybillService: MonthlybillService, private router: Router) { }

  ngOnInit(): void {
    this.monthlybillService.getAllMonthlyBills().subscribe({
      next:(response) =>{
      this.monthlyBills = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    }
    });

  }

}
