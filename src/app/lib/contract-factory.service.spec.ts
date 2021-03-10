import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ContractFactory } from '@ethersproject/contracts';
import { Contract } from 'ethers';
import { CommonService } from './common.service';

import { ContractFactoryService } from './contract-factory.service';

describe('ContractFactoryService', () => {
  let service: ContractFactoryService;
  let comServ: CommonService;

  let uri = "https://0xcertif.art/assets/{id}.json";

  let NFT_CACT_ADDR = "0xB47bd93124a01F088D4A91B178aFEE36425fA153";
  let deploy: boolean = false

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ContractFactoryService);
    comServ = TestBed.inject(CommonService);
  });

  it('Deploy contract', async () =>  {
    if (NFT_CACT_ADDR == null){
      console.log("Bal "+comServ.format(await service.wallet.getBalance()));
      let c : Contract = await service.deployERC1155(uri);
      console.log("Transaction: "+JSON.stringify(c.deployTransaction.hash));
      expect(c.deployTransaction.hash).toBeDefined();
    }    
  });

  it('Mint', async () =>  {

    if (deploy){
      console.log("Bal "+comServ.format(await service.wallet.getBalance()));
      await service.mintERC1155(NFT_CACT_ADDR, 1, 1);
      expect(service).toBeTruthy();
    }
  });

  it('Get Balance', async () => {
     await service.getBalanceCollection(NFT_CACT_ADDR, service.owner_addr,1)

  });

});
