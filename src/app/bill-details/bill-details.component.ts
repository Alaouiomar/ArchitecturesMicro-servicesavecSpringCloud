import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {

  constructor(private http :HttpClient) { }

  ngOnInit(): void {

  }

}
