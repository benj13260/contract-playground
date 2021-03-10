import { Injectable } from '@angular/core';
import { BigNumber, BigNumberish, Contract, ethers, Wallet } from "ethers";

import { HttpClient } from '@angular/common/http';

//import StorageJSON from '../assets/contracts/Storage.json';
import CreaturesJSON from '../assets/contracts/Creatures.json';
import {NFT_ABI} from './nft';
import { stringify } from '@angular/compiler/src/util';
import { NetworkService } from './lib/network.service';

@Injectable({
  providedIn: 'root'
})
export class EthService {

  wallet: Wallet;
  ethersProvider: ethers.providers.JsonRpcProvider;
  public owner_addr : string;
  public cact_addr : string;
  

  //public storageJSON = StorageJSON;

  constructor( private httpClient : HttpClient, private network : NetworkService) {
    this.ethersProvider =  this.getProvider();
    this.wallet = this.getWallet();
    this.owner_addr = network.AVAX_TEST_OWNER_ADDR;
    this.cact_addr = network.AVAX_TEST_NFT_CACT_ADDR;
  }

  format(n : BigNumberish): string{
    return ethers.utils.formatEther(n);
  }

  async getBalance(acc: string): Promise<string> {
    let a = await this.ethersProvider.getBalance(acc);
    return this.format(a);
  }

  private getProvider(): any {
    return new ethers.providers.JsonRpcProvider(this.network.AVAX_TEST_CHAINURL);
  }
  

  private getWallet(): Wallet{
    return Wallet.fromMnemonic(this.network.MNEMO_TEST).connect(this.ethersProvider);
  }

  public async providerInfo(){
    let accounts = await this.ethersProvider.listAccounts();
    console.log(accounts);
  }

  public async walletInfo(){
    let a = await this.wallet?.getBalance();
    if (a !== undefined)
    console.log(ethers.utils.formatEther(a));
  }
  

  public async getContractFactory(cSol: any) {
    let factory = new ethers.ContractFactory(cSol.abi, cSol.bytecode, this.wallet);
    let contract: Contract = await factory.deploy();
    console.log(contract.address);
  }

  public async runContract(addr: string, cSol: any){
    let contract: Contract = new ethers.Contract(addr,cSol.abi,this.wallet);
    await contract.store(1234);
    let v = await contract.retrieve();
    console.log("contract exec: "+v);
  }


  public async mintNFT(contractAddr : string, ownerAddr: String, mintNr: number){
    let nftContract: Contract = new ethers.Contract(contractAddr,CreaturesJSON.abi,this.ethersProvider);
    nftContract = await nftContract.connect(this.wallet);
    
        // Creatures issued directly to the owner.
        for (var i = 0; i < mintNr; i++) {
          const result = await nftContract.mintTo(ownerAddr); //.send({ from: ownerAddr });
          console.log("Minted creature. Transaction: " + JSON.stringify(result));

          const resul = await nftContract.baseURI() //.send({ from: ownerAddr });
          console.log(resul);
        }
  }



}
