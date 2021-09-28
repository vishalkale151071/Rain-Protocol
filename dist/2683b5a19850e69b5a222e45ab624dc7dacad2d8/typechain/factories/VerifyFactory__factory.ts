/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { VerifyFactory } from "../VerifyFactory";

export class VerifyFactory__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<VerifyFactory> {
    return super.deploy(overrides || {}) as Promise<VerifyFactory>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): VerifyFactory {
    return super.attach(address) as VerifyFactory;
  }
  connect(signer: Signer): VerifyFactory__factory {
    return super.connect(signer) as VerifyFactory__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VerifyFactory {
    return new Contract(address, _abi, signerOrProvider) as VerifyFactory;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_contract",
        type: "address",
      },
    ],
    name: "NewContract",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data_",
        type: "bytes",
      },
    ],
    name: "createChild",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin_",
        type: "address",
      },
    ],
    name: "createChild",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "maybeChild_",
        type: "address",
      },
    ],
    name: "isChild",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506001600055611c16806100256000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632ea72a4914610046578063eaa744d7146100df578063fc91a89714610112575b600080fd5b6100b66004803603602081101561005c57600080fd5b81019060208101813564010000000081111561007757600080fd5b82018360208201111561008957600080fd5b803590602001918460018302840111640100000000831117156100ab57600080fd5b509092509050610159565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6100b6600480360360208110156100f557600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610266565b6101456004803603602081101561012857600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610382565b604080519115158252519081900360200190f35b6000600260005414156101cd57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015290519081900360640190fd5b600260009081556101de84846103ad565b73ffffffffffffffffffffffffffffffffffffffff8116600081815260016020819052604080832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169092179091555192935090917f387ea218537e939551af33bbc2dd6c53b1fee55d377a0dce288258f972cb3a9c9190a260016000559392505050565b6040805173ffffffffffffffffffffffffffffffffffffffff8316602080830191909152825180830382018152828401938490527f2ea72a4900000000000000000000000000000000000000000000000000000000909352604482018181528351606484015283516000943094632ea72a499491939283926084909201918501908083838b5b838110156103045781810151838201526020016102ec565b50505050905090810190601f1680156103315780820380516001836020036101000a031916815260200191505b5092505050602060405180830381600087803b15801561035057600080fd5b505af1158015610364573d6000803e3d6000fd5b505050506040513d602081101561037a57600080fd5b505192915050565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604090205460ff1690565b600080838360208110156103c057600080fd5b50604051903573ffffffffffffffffffffffffffffffffffffffff16915060009082906103ec90610430565b73ffffffffffffffffffffffffffffffffffffffff909116815260405190819003602001906000f080158015610426573d6000803e3d6000fd5b5095945050505050565b6117a38061043e8339019056fe60806040523480156200001157600080fd5b50604051620017a3380380620017a38339810160408190526200003491620002d5565b6001600160a01b038116620000665760405162461bcd60e51b81526004016200005d9062000305565b60405180910390fd5b620000a17f5ff1fb0ce9089603e6e193667ed17164e0360a6148f4a39fc194055588948a31600080516020620017438339815191526200016f565b620000bc6000805160206200174383398151915282620001c1565b620000f77f794e4221ebb6dd4e460d558b4ec709511d44017d6610ba89daa896c0684ddfac600080516020620017838339815191526200016f565b620001126000805160206200178383398151915282620001c1565b6200014d7f5a686c9d070917be517818979fb56f451f007e3ae83e96fb5a22a304929b070d600080516020620017638339815191526200016f565b620001686000805160206200176383398151915282620001c1565b5062000328565b600082815260208190526040808220600201549051839285917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a460009182526020829052604090912060020155565b620001cd8282620001d1565b5050565b600082815260208181526040909120620001f691839062000c8b6200024a821b17901c565b15620001cd57620002066200026a565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600062000261836001600160a01b0384166200026e565b90505b92915050565b3390565b60006200027c8383620002bd565b620002b45750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915562000264565b50600062000264565b60009081526001919091016020526040902054151590565b600060208284031215620002e7578081fd5b81516001600160a01b0381168114620002fe578182fd5b9392505050565b6020808252600990820152680c17d050d0d3d5539560ba1b604082015260600190565b61140b80620003386000396000f3fe608060405234801561001057600080fd5b50600436106101775760003560e01c80633d111c7e116100d857806391d148541161008c578063b8c55bfa11610066578063b8c55bfa146102dd578063ca15c873146102e5578063d547741f146102f857610177565b806391d14854146102a2578063a217fddf146102c2578063b759f954146102ca57610177565b80637547a867116100bd5780637547a8671461027257806381792e441461027a5780639010d07c1461028257610177565b80633d111c7e146102575780636b6ece261461025f57610177565b8063248a9ca31161012f5780632f2ff15d116101145780632f2ff15d1461021157806331e658a51461022457806336568abe1461024457610177565b8063248a9ca3146101eb57806329092d0e146101fe57610177565b8063100ec99811610160578063100ec998146101bb5780631847c06b146101d05780631e210912146101e357610177565b8063017a91051461017c5780631003e2d2146101a6575b600080fd5b61018f61018a36600461100d565b61030b565b60405161019d9291906110c2565b60405180910390f35b6101b96101b436600461100d565b61032d565b005b6101c36104b7565b60405161019d91906110b9565b6101c36101de366004610fd2565b6104db565b6101c36104ed565b6101c36101f936600461100d565b610511565b6101b961020c366004610fd2565b610529565b6101b961021f366004611025565b610615565b610237610232366004610fd2565b610677565b60405161019d91906113a2565b6101b9610252366004611025565b6106f3565b6101c3610769565b6101b961026d36600461100d565b61078d565b6101c361099d565b6101c36109c1565b61029561029036600461106c565b6109e5565b60405161019d919061108d565b6102b56102b0366004611025565b610a06565b60405161019d91906110ae565b6101c3610a1e565b6101b96102d836600461100d565b610a23565b6101c3610bfc565b6101c36102f336600461100d565b610c20565b6101b9610306366004611025565b610c37565b60026020526000908152604090205460ff811690610100900463ffffffff1682565b336000908152600160205260409020541561037d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103749061130e565b60405180910390fd5b600160008281526002602052604090205460ff16600381111561039c57fe5b106103d3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610374906112d7565b3360009081526001602081905260409182902083905581518083019092528190815263ffffffff431660209182015260008381526002909152604090208151815482907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600183600381111561044657fe5b021790555060209190910151815463ffffffff909116610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000ff909116179055604051819033907f2728c9d3205d667bbc0eefdfeda366261b4d021949630c047f3e5834b30611ab90600090a350565b7f9d65f741849e7609dd1e2c70f0d7da5f5433b36bfcf3ba4d27d2bb08ad2155b181565b60016020526000908152604090205481565b7f2d4d1d70bd81797c3479f5c3f873a5c9203d249659c3b317cdad46367472783c81565b6000818152602081905260409020600201545b919050565b6105537f794e4221ebb6dd4e460d558b4ec709511d44017d6610ba89daa896c0684ddfac33610a06565b610589576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103749061119e565b73ffffffffffffffffffffffffffffffffffffffff81166000818152600160208181526040808420805485526002835281852080547fffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000001690558585529290915290829055517fbe7c7ac3248df4581c206a84aab3cb4e7d521b5398b42b681757f78a5a7d411e9190a250565b600082815260208190526040902060020154610633906102b0610cad565b610669576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161037490611141565b6106738282610cb1565b5050565b61067f610fbb565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020908152604080832054835260029091529081902081518083019092528054829060ff1660038111156106cd57fe5b60038111156106d857fe5b81529054610100900463ffffffff1660209091015292915050565b6106fb610cad565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461075f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161037490611345565b6106738282610d34565b7f5ff1fb0ce9089603e6e193667ed17164e0360a6148f4a39fc194055588948a3181565b806107c4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610374906111d5565b6107ee7f5a686c9d070917be517818979fb56f451f007e3ae83e96fb5a22a304929b070d33610a06565b610824576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610374906112a0565b60008181526002602052604081205460ff16600381111561084157fe5b11610878576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610374906112d7565b600360008281526002602052604090205460ff16600381111561089757fe5b106108ce576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610374906112d7565b60408051808201909152806003815263ffffffff431660209182015260008381526002909152604090208151815482907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600183600381111561092e57fe5b021790555060209190910151815463ffffffff909116610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000ff90911617905560405181907f10c91cab40bd045b8ac5fdc1ca69bfc3f8a63ab08131495a922b3653382187f690600090a250565b7f794e4221ebb6dd4e460d558b4ec709511d44017d6610ba89daa896c0684ddfac81565b7fbb496ca6fee71a17f78592fbc6fc7f04a436edb9c709c4289d6bbfbc5fd45f4d81565b60008281526020819052604081206109fd9083610db7565b90505b92915050565b60008281526020819052604081206109fd9083610dc3565b600081565b610a4d7f5ff1fb0ce9089603e6e193667ed17164e0360a6148f4a39fc194055588948a3133610a06565b610a83576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103749061120c565b60008181526002602052604081205460ff166003811115610aa057fe5b11610ad7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610374906112d7565b600260008281526002602052604090205460ff166003811115610af657fe5b10610b2d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610374906112d7565b60408051808201909152806002815263ffffffff431660209182015260008381526002909152604090208151815482907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001836003811115610b8d57fe5b021790555060209190910151815463ffffffff909116610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000ff90911617905560405181907f77b92c0722e5bbe8d1413b7fbec6093bc4dc966a65832498dc8c2c67d9a937cc90600090a250565b7f5a686c9d070917be517818979fb56f451f007e3ae83e96fb5a22a304929b070d81565b6000818152602081905260408120610a0090610de5565b600082815260208190526040902060020154610c55906102b0610cad565b61075f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161037490611243565b60006109fd8373ffffffffffffffffffffffffffffffffffffffff8416610df0565b3390565b6000828152602081905260409020610cc99082610c8b565b1561067357610cd6610cad565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000828152602081905260409020610d4c9082610e3a565b1561067357610d59610cad565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b60006109fd8383610e5c565b60006109fd8373ffffffffffffffffffffffffffffffffffffffff8416610ebb565b6000610a0082610ed3565b6000610dfc8383610ebb565b610e3257508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610a00565b506000610a00565b60006109fd8373ffffffffffffffffffffffffffffffffffffffff8416610ed7565b81546000908210610e99576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610374906110e4565b826000018281548110610ea857fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b60008181526001830160205260408120548015610fb15783547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8083019190810190600090879083908110610f2857fe5b9060005260206000200154905080876000018481548110610f4557fe5b600091825260208083209091019290925582815260018981019092526040902090840190558654879080610f7557fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610a00565b6000915050610a00565b604080518082019091526000808252602082015290565b600060208284031215610fe3578081fd5b813573ffffffffffffffffffffffffffffffffffffffff81168114611006578182fd5b9392505050565b60006020828403121561101e578081fd5b5035919050565b60008060408385031215611037578081fd5b82359150602083013573ffffffffffffffffffffffffffffffffffffffff81168114611061578182fd5b809150509250929050565b6000806040838503121561107e578182fd5b50508035926020909101359150565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b901515815260200190565b90815260200190565b604081016110cf846113ca565b825263ffffffff831660208301529392505050565b60208082526022908201527f456e756d657261626c655365743a20696e646578206f7574206f6620626f756e60408201527f6473000000000000000000000000000000000000000000000000000000000000606082015260800190565b6020808252602f908201527f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60408201527f2061646d696e20746f206772616e740000000000000000000000000000000000606082015260800190565b6020808252600c908201527f4f4e4c595f52454d4f5645520000000000000000000000000000000000000000604082015260600190565b60208082526004908201527f305f494400000000000000000000000000000000000000000000000000000000604082015260600190565b6020808252600d908201527f4f4e4c595f415050524f56455200000000000000000000000000000000000000604082015260600190565b60208082526030908201527f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60408201527f2061646d696e20746f207265766f6b6500000000000000000000000000000000606082015260800190565b6020808252600b908201527f4f4e4c595f42414e4e4552000000000000000000000000000000000000000000604082015260600190565b6020808252600e908201527f43555252454e545f535441545553000000000000000000000000000000000000604082015260600190565b6020808252600c908201527f4f56455257524954455f49440000000000000000000000000000000000000000604082015260600190565b6020808252602f908201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560408201527f20726f6c657320666f722073656c660000000000000000000000000000000000606082015260800190565b815160408201906113b2906113ca565b825263ffffffff602084015116602083015292915050565b806004811061052457fefea264697066735822122042b505f21668e5fedb14cb01442d88168a4c0a7c16d3a75dc39f40a72b81a71164736f6c634300060c00332d4d1d70bd81797c3479f5c3f873a5c9203d249659c3b317cdad46367472783cbb496ca6fee71a17f78592fbc6fc7f04a436edb9c709c4289d6bbfbc5fd45f4d9d65f741849e7609dd1e2c70f0d7da5f5433b36bfcf3ba4d27d2bb08ad2155b1a264697066735822122067dd8a7862c59917c28ecfd51631fa9529f7b8c58eeb62dc8a8be771885cc38464736f6c634300060c0033";
