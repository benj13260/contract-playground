import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BigNumberish, Contract, ContractFactory, ethers, Wallet } from 'ethers';
import { NetworkService } from './network.service';
import ERC1155 from '../../assets/contracts/ERC1155PresetMinterPauser.json';

@Injectable({
  providedIn: 'root'
})
export class ContractFactoryService {

  wallet: Wallet;
  ethersProvider: ethers.providers.JsonRpcProvider;
  public ERC1155 = ERC1155;

  public owner_addr : string;
  //public cact_addr : string;
  
  
  constructor( private httpClient : HttpClient, private network : NetworkService) {
    this.ethersProvider =  new ethers.providers.JsonRpcProvider(this.network.AVAX_TEST_CHAINURL);
    this.wallet = Wallet.fromMnemonic(this.network.MNEMO_TEST).connect(this.ethersProvider);
    this.owner_addr = network.AVAX_TEST_OWNER_ADDR;
    //this.cact_addr = network.AVAX_TEST_NFT_CACT_ADDR;
  }

  public getContractFactory(cSol: any): ContractFactory {
    return new ethers.ContractFactory(cSol.abi, cSol.bytecode, this.wallet);
    //console.log(contract.address);
  }

  public async deployERC1155(uri: string) : Promise<Contract> {
    let factory = this.getContractFactory(this.ERC1155);
    return await factory.deploy(uri);
    //console.log(contract.address);
  }

  public async mintERC1155(contractAddr: string, id: number, amount: number) {
    let contract = new ethers.Contract(contractAddr, this.ERC1155.abi,this.wallet);
    let res = await contract.mint(this.owner_addr, 1, 1,0X00);
    console.log("Minted trx: "+JSON.stringify(res));
  }
  

  public async getBalanceCollection(contractAddr : string, ownerAddr: String, mintNr: number){
    let contract = new ethers.Contract(contractAddr, this.ERC1155.abi,this.wallet);
    
    let b = await contract.balanceOf(ownerAddr,mintNr);
    console.log("Balance: "+b);

    let uri = await contract.uri(mintNr);
    console.log("Uri: "+uri);

    //let m : Nft = await this.http.get<Nft>(uri).toPromise();
    //console.log("Metadata: "+JSON.stringify(m));
  }


}
