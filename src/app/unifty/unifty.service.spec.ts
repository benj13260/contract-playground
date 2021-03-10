import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { UniftyService } from './unifty.service';

describe('UniftyService', () => {
  let service: UniftyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(UniftyService);
  });

  /*
  it('should be created', async () => {
    console.log("Bal before token update: "+await service.getBalance(service.acc));
    //await service.providerInfo();
    await service.walletInfo();
    if (service.c1 === undefined){
      await service.getContractFactory(service.storageJSON);
    }
    await service.runContract(service.c1, service.storageJSON);
    expect(service).toBeTruthy();
  });
  */

  it('Call NFT', async () => {
    //let a=await service.getBalance(service.NFT_CONTRACT_ADDRESS);
    //console.log("Balance: "+a);
    await service.getBalanceCollection(
      service.NFT_CACT_ADDR,
      service.OWNER_ADDR,
      1
      );
    
    expect(service).toBeTruthy();

  });

});



