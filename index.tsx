import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { type Address, createWalletClient, custom, parseEther } from 'viem';
import { harmonyOne } from 'viem/chains';
import 'viem/window';

const walletClient = createWalletClient({
  chain: harmonyOne,
  transport: custom(window.ethereum!),
});

function Example() {
  const [account, setAccount] = useState<Address>();
  const message = 'successfully signed into Harmony wallet';

  const connect = async () => {
    const [address] = await walletClient.requestAddresses();
    setAccount(address);
  };

  const sendTransaction = async () => {
    if (!account) return;
    await walletClient.sendTransaction({
      account,
      to: '0x82BD5fD0F73bA74f335917991519b151f7eD6E02',
      value: parseEther('0.000001'),
    });
  };

  const watchWone = async () => {
    const success = await walletClient.watchAsset({
      type: 'ERC20',
      options: {
        address: '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a',
        decimals: 18,
        symbol: 'WONE',
      },
    });

    if (success) {
      console.log('WONE has been successfully added to the wallet.');
    } else {
      console.log('Failed to add WONE to the wallet.');
    }
  };

  const signMessage = async () => {
    if (!account) return;
    try {
      const signature = await walletClient.signMessage({
        account,
        message,
      });
      console.log('Message signed:', signature);
    } catch (error) {
      console.error('Failed to sign message:', error);
    }
  };

  const addHarmonyChain = async () => {
    try {
      const success = await walletClient.addChain({ chain: harmonyOne });
      if (success) {
        console.log('Harmony chain has been successfully added to the wallet.');
      } else {
        console.log('Failed to add Harmony chain to the wallet.');
      }
    } catch (error) {
      console.error('Error adding Harmony chain:', error);
    }
  };

  if (account)
    return (
      <>
        <div>Connected: {account}</div>
        <button onClick={sendTransaction}>Send Transaction</button>
        <button onClick={watchWone}>Watch WONE</button>
        <button onClick={signMessage}>Sign Message</button>
        <button onClick={addHarmonyChain}>Add Harmony Chain</button>
      </>
    );

  return <button onClick={connect}>Connect Wallet</button>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Example />
);
