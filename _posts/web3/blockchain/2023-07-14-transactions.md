---
layout: post
title: 交易
tagline: 
category: web3      #分类
author: wali    #作者
tag: blockchain     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载
comments: true

post_nav: ["1.什么是交易", "2.data字段", "3.交易的类型", "4.以太坊生命周期"]
group_tag: blockchain
---

交易是由帐户发出，带密码学签名的指令。 帐户将发起交易以更新以太坊网络的状态。 最简单的交易是将 ETH 从一个账户转到另一个帐户。

- [以太坊虚拟机图解](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf){:target="_blank"} [下载]({{ site.url }}/assets/pdf/web3/ethereum_evm_illustrated.pdf){:target="_blank"}


# 1.什么是交易

以[太坊交易](https://ethereum.org/zh/developers/docs/transactions/)是指由外部持有账户发起的行动，换句话说，是指由人管理而不是智能合约管理的账户。 

![ssl]({{ site.url }}/assets/image/web3/blockchain/blockchain-2.png)

改变 `EVM` 状态的交易需要广播到整个网络。 任何节点都可以广播在以太坊虚拟机上执行交易的请求；此后，验证者将执行交易并将由此产生的状态变化传播到网络的其他部分。交易需要付费并且必须包含在一个有效区块中。


### 交易包含的数据

所提交的交易包括下列信息：


- `from` - 发送者的地址，该地址将签署交易。 这将是一个外部帐户，因为合约帐户不能发送交易。
- `recipient` – 接收地址（如果是外部帐户，交易将传输值。 如果是合约帐户，交易将执行合约代码）
- `signature` – 发送者的标识符。 当发送者的私钥签署交易并确保发送者已授权此交易时，生成此签名。
- `nonce` - 一个有序递增的计数器，表示来自帐户的交易数量
- `value` – 发送者向接收者转移的以太币数量（面值为 WEI，1 个以太币 = 1e+18wei）
- `data` – 可包括任意数据的可选字段
- `gasLimit` – 交易可以消耗的最大数量的燃料单位。 [以太坊虚拟机(opens in a new tab)↗](https://ethereum.org/en/developers/docs/evm/opcodes/)指定每个可计算步骤所需的燃料单位
- `maxPriorityFeePerGas` - 作为小费提供给验证者的已消耗燃料的最高价格
- `maxFeePerGas` - 愿意为交易支付的每单位燃料的最高费用（包括 baseFeePerGas 和 maxPriorityFeePerGas）


燃料是指验证者处理交易所需的计算。 用户必须为此计算支付费用。 gasLimit 和 maxPriorityFeePerGas 决定支付给验证者的最高交易费。 [关于燃料的更多信息](https://ethereum.org/zh/developers/docs/gas/)。


交易对象看起来像这样：

```
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300"
  maxPriorityFeePerGas: "10"
  nonce: "0",
  value: "10000000000",
}
```
但交易对象需要使用发送者的私钥签名。 这证明交易只可能来自发送者，而不是欺诈。
Geth 这样的以太坊客户端将处理此签名过程。

示例 [JSON-RPC](https://ethereum.org/zh/developers/docs/apis/json-rpc/#eth_sign) 调用：
```
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

示例响应：

|name|descipt|
-|-|
raw|是采用[递归长度前缀 (RLP)](https://ethereum.org/zh/developers/docs/data-structures-and-encoding/rlp/) 编码形式的签名交易|
tx|是已签名交易的 JSON 形式。|

```
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

# 2.data字段

绝大多数交易都是从外部所有的帐户访问合约。 大多数合约用 Solidity 语言编写，并根据[应用程序二进制接口 (ABI)](https://ethereum.org/zh/glossary/#abi) 解释其data字段。



# 3.交易的类型

以太坊有几种不同类型的交易：

- `常规交易`：从一个帐户到另一个帐户的交易。
- `合约部署交易`：没有“to”地址的交易，数据字段用于合约代码。
- `执行合约`：与已部署的智能合约进行交互的交易。 在这种情况下，“to”地址是智能合约地址。



# 4.以太坊生命周期

以太坊交易的生命周期：

- `交易创建`: 以太坊交易的生命周期开始于交易的创建。交易可以由任何以太坊账户发起，包括个人用户和智能合约。交易的创建包括确定交易的发送方、接收方、数额以及可选的附加数据。这些信息构成了交易的基本内容。
- `交易签名`: 在交易创建后，交易发送方需要对交易进行签名。以太坊使用椭圆曲线数字签名算法来保证交易的安全性和完整性。通过使用发送方的私钥对交易进行签名，确保只有发送方能够修改交易的内容。
- `交易广播`: 一旦交易被发送方签名，它将通过网络进行广播。交易可以通过以太坊网络中的节点传播到其他节点。在交易广播过程中，其他节点将接收到交易，并验证交易的合法性，以确保交易满足以太坊的协议规则。
- `交易确认`: 当交易被广播到网络后，它将进入待确认状态。在以太坊中，每个区块都包含一组交易。矿工通过解决密码学难题来创建新的区块，并将区块添加到区块链中。一旦出现新块，其中包含交易，交易将被确认。
- `交易确认时间`: 交易确认的时间取决于网络的拥塞程度以及矿工选择的手续费。手续费用于奖励矿工，在区块中包含特定的交易。通常情况下，交易需要等待几秒钟到几分钟不等来获得确认。
- `交易成功`: 交易成功意味着交易已经被确认，并且被包含在一个区块中。一旦交易成功，接收方将能够访问他们接收到的以太币。同时，其他节点也会更新账本，记录交易的发生。
- `交易失败`: 然而，有时交易可能会失败。交易可能会因为各种原因被拒绝，包括余额不足、智能合约执行失败或网络问题。当交易失败时，以太坊网络将不会承认该交易的有效性，并且没有资金流动。
- `交易状态追踪`: 通过交易的哈希值，可以在以太坊区块链浏览器中追踪交易的状态。交易的哈希值是交易在网络上的唯一标识符。通过输入交易的哈希值，可以查看交易的详细信息，包括发送方、接收方、数额等





























