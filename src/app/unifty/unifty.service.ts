import { Injectable } from '@angular/core';
import { BigNumber, BigNumberish, Contract, ethers, Signer, Wallet } from "ethers";

import { HttpClient } from '@angular/common/http';

import ERC1155 from '../../assets/contracts/ERC1155.json';
import { stringify } from '@angular/compiler/src/util';
import { Nft } from './metadata';
import { NetworkService } from '../lib/network.service';

@Injectable({
  providedIn: 'root'
})
export class UniftyService {

  //signer: Signer;
  ethersProvider: ethers.providers.JsonRpcProvider;
  public OWNER_ADDR;
  public NFT_CACT_ADDR;
  ERC1155 = ERC1155;

  
  constructor( private http : HttpClient, private network : NetworkService) {
    this.ethersProvider =  this.getProvider();
    //this.signer = this.ethersProvider.getSigner().connect(this.ethersProvider);
    this.OWNER_ADDR = network.MAIN_OWNER_ADDR;
    this.NFT_CACT_ADDR = network.MATIC_UNIFTY_CACT_ADDR;
  }
  

  format(n : BigNumberish): string{
    return ethers.utils.formatEther(n);
  }

  async getBalance(acc: string): Promise<string> {
    let a = await this.ethersProvider.getBalance(acc);
    return this.format(a);
  }

  private getProvider(): any {
    return new ethers.providers.JsonRpcProvider(this.network.MATIC_MAIN_CHAINURL);
  }
    
  public async getBalanceCollection(contractAddr : string, ownerAddr: String, mintNr: number){
    let nftContract: Contract = new ethers.Contract(contractAddr,this.ERC1155.abi,this.ethersProvider);
    
    let b = await nftContract.balanceOf("0x95Ab81Bc1532C8A696d89365f2e6f76a404Fe4DF",1);
    console.log("Balance: "+b);

    let uri = await nftContract.uri(1);
    console.log("Uri: "+uri);

    let m : Nft = await this.http.get<Nft>(uri).toPromise();
    console.log("Metadata: "+JSON.stringify(m));
  }
}
