import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { type Address, createWalletClient, custom } from 'viem';
import { harmonyOne } from 'viem/chains';
import 'viem/window';

const walletClient = createWalletClient({
  chain: harmonyOne,
  transport: custom(window.ethereum!),
});

function Example() {
  const [account, setAccount] = useState<Address | null>(null);
  const message = 'successfully signed into Harmony wallet';

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const addresses = await walletClient.getAddresses();
        if (addresses.length > 0) {
          setAccount(addresses[0]);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };
    checkConnection();
  }, []);

  const connect = async () => {
    try {
      const [address] = await walletClient.requestAddresses();
      setAccount(address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
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

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '25px',
    border: '2px solid #07aee9',
    backgroundColor: '#fff',
    color: '#07aee9',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#07aee9',
    color: '#fff',
  };

  const [hovered, setHovered] = useState(false);

  if (account) {
    return (
      <>
        <div>Connected: {account}</div>
        <button
          onClick={addHarmonyChain}
          style={hovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Add to Metamask
        </button>
      </>
    );
  }

  return (
    <button
      onClick={connect}
      style={hovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Connect Wallet
    </button>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Example />
);
