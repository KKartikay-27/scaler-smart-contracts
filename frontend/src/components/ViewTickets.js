import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import TicketNFT from "../contracts/TicketNFT.json"; 

const ViewTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // Track wallet connection
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  useEffect(() => {
    checkWalletConnection(); // Check if the user is already connected
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        setIsConnected(!!userAddress);
      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    }
  };

  const fetchAllTickets = async () => {
    try {
      if (!window.ethereum) {
        console.error("MetaMask is not installed.");
        return;
      }

      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, TicketNFT.abi, signer);

      const totalSupply = await contract.ticketCounter();
      const fetchedTickets = [];

      for (let i = 1; i <= totalSupply; i++) {
        const [metadata, owner] = await Promise.all([
          contract.getTicketMetadata(i),
          contract.ownerOf(i)
        ]);

        fetchedTickets.push({ id: i, metadata, owner });
      }

      setTickets(fetchedTickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyTickets = async () => {
    try {
      if (!window.ethereum) {
        console.error("MetaMask is not installed.");
        return;
      }

      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const contract = new ethers.Contract(contractAddress, TicketNFT.abi, signer);
      const totalSupply = await contract.ticketCounter();
      const fetchedTickets = [];

      for (let i = 1; i <= totalSupply; i++) {
        const owner = await contract.ownerOf(i);
        
        if (owner.toLowerCase() === userAddress.toLowerCase()) {
          const metadata = await contract.getTicketMetadata(i);
          fetchedTickets.push({ id: i, metadata, owner });
        }
      }

      setTickets(fetchedTickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black p-6">
      <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-4xl border border-gray-800">
        <h1 className="text-4xl font-extrabold text-center text-white neon-text mb-6">
          🎟️ NFT Tickets
        </h1>

        {/* Connect Wallet Button */}
        {!isConnected ? (
          <button
            onClick={checkWalletConnection}
            className="bg-pink-500 text-white py-2 px-4 rounded-lg font-semibold transition hover:bg-pink-600 w-full mb-4"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex justify-between mb-4">
            <button
              onClick={fetchAllTickets}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold transition hover:bg-blue-600 w-1/2 mx-1"
            >
              View All Tickets
            </button>
            <button
              onClick={fetchMyTickets}
              className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold transition hover:bg-green-600 w-1/2 mx-1"
            >
              My Tickets
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-pink-500"></div>
          </div>
        ) : tickets.length > 0 ? (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="relative border border-gray-700 p-6 rounded-xl shadow-md bg-gradient-to-br from-gray-800 to-gray-900 transition-transform hover:scale-105 hover:shadow-pink-500/50"
              >
                <div className="absolute top-2 right-2 text-white text-sm bg-pink-500 px-3 py-1 rounded-full shadow">
                  NFT #{ticket.id}
                </div>

                <p className="text-lg font-semibold text-white">
                  <strong>Metadata:</strong> {ticket.metadata}
                </p>
                <p className="text-md text-gray-300">
                  <strong>Owner:</strong> {ticket.owner}
                </p>

                
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-300">No tickets found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewTickets;
