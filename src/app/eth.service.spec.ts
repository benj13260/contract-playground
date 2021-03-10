import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { EthService } from './eth.service';

describe('EthService', () => {
  let service: EthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(EthService);
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

  it('NFT should be created', async () => {
    await service.walletInfo();
    await service.mintNFT(
      service.cact_addr,
      service.owner_addr,
      1
      );
    await service.walletInfo();
    expect(service).toBeTruthy();
  });

});



