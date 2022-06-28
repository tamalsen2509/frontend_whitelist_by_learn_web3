import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
declare let window: any
import { ethers } from 'ethers';
import { WhitelistABI } from '../../connection/ABI'
import { ADDRESS_WHITELIST } from '../../connection/address'
import { NgxSpinnerService } from "ngx-spinner"



@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  window: any
  buttonDisable: boolean = false;
  connected: boolean = false;
  signer: any
  whiteListNumbers!: number;
  whitelistContract: any
  errResponse: any
  isError: boolean = false;
  successResponse: any




  constructor(private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.connectToWallet() // while componet load connect wallet function will ignite

  }




  async connectToWallet() {
    // methods to connect with meta mask wallet
    try {

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      await provider.send("eth_requestAccounts", []);
      this.signer = provider.getSigner()

      this.buttonDisable = true;

      provider.on("network", (newNetwork: any, oldNetwork: any) => {
        if (oldNetwork) {
          window.location.reload();
        }
      })

      if (await this.signer.getChainId() == 4) {
        this.connected = true;
      } else {
        this.connected = false
      }



    } catch (err: any) {

      this.errResponse = err
      // console.log(this.errResponse)

    }

  }

  async connectContract() {
    // method to enter details in smart contract
    try {
      this.whitelistContract = new ethers.Contract(ADDRESS_WHITELIST, WhitelistABI.abi, this.signer)
      const tx = await this.whitelistContract.addAddresstoWhiteList()
      this.spinner.show()
      await tx.wait();
      this.spinner.hide()
      this.getNumberofWhiteList()


    } catch (error: any) {


      // console.log(error.message)
      this.isError = this.fetchStringContent(error.message)


    }



  }


  async getNumberofWhiteList() {

    try {
      this.whitelistContract = new ethers.Contract(ADDRESS_WHITELIST, WhitelistABI.abi, this.signer)
      this.whiteListNumbers = await this.whitelistContract.numAddressesWhitelisted()

      console.log(this.whiteListNumbers)
    } catch (error) {
      console.log(error)
    }


  }



  fetchStringContent(args: string): boolean {
    let content: string = "Sender is already white listed";
    let result: boolean = args.search(content) > -1 ? true : false;
    return result

  }


  refresh() {
    window.location.reload()
  }



}
