import { Injectable } from '@angular/core';
import { BigNumberish, ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  format(n : BigNumberish): string{
    return ethers.utils.formatEther(n);
  }


}
