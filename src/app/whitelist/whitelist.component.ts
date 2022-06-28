import { Component, OnInit } from '@angular/core';
declare let window: any
import { ethers } from 'ethers';
import { FormControl, FormGroup } from '@angular/forms';
import { WhitelistABI } from '../../connection/ABI'
import { ADDRESS_WHITELIST } from '../../connection/address'
import { NgxSpinnerService } from "ngx-spinner"

@Component({
  selector: 'app-whitelist',
  templateUrl: './whitelist.component.html',
  styleUrls: ['./whitelist.component.css']
})
export class WhitelistComponent implements OnInit {
  window: any
  buttonDisable: boolean = false;
  connected: boolean = false;
  signer: any
  ListWhitelistUser: any
  whitelistContract: any





  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {


  }














}
