import React, { createContext, useContext, useState, useEffect } from 'react';
import { initWeb3, initContract } from '../pages/utils/web3';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3State, setWeb3State] = useState({
    web3: null,
    contract: null,
    account: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize web3
        const web3Instance = await initWeb3();
        
        // Get current account
        const accounts = await web3Instance.eth.getAccounts();
        const currentAccount = accounts[0];

        // Initialize contract
        const contractInstance = await initContract();

        setWeb3State({
          web3: web3Instance,
          contract: contractInstance,
          account: currentAccount,
          loading: false,
          error: null
        });

      } catch (error) {
        setWeb3State(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    initialize();
  }, []);

  return (
    <Web3Context.Provider value={web3State}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
