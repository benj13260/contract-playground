import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class NetworkService {
  

    /**  MATIC UNIFTY MAIN
    */
    MAIN_OWNER_ADDR = "0x95Ab81Bc1532C8A696d89365f2e6f76a404Fe4DF";
    // ERC1155
    public MATIC_UNIFTY_CACT_ADDR =  "0x4C0dB34dDfe13C86863c363b03d933f80599a3BD";
    MATIC_MAIN_CHAINURL = "https://rpc-mainnet.maticvigil.com/";


    /**  AVAX TEST
    */
    public MNEMO_TEST: string = "";
    public AVAX_TEST_OWNER_ADDR = "0x2304513f83cB4F6185D0ba739C6d85672D88d701";
    public AVAX_TEST_NFT_CACT_ADDR =  "0xAe1ef9B3D3F745359c6B5Ea80bC90B80280ec4F2";  
    public c1 = "0xbF653b26E36Fa4f97152A8463f8f2ee09E932Ba0";
    AVAX_TEST_CHAINURL = "http://localhost:9650/ext/bc/C/rpc" // Ganache UI 

  }  
    
    
  