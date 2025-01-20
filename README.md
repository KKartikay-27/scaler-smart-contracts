# Scaler School of Technology - Smart Contracts Course

### Project Overview
This project is a *blockchain-based ticketing system* that allows users to mint, view, and manage event tickets as NFTs on the Ethereum blockchain. Each ticket is represented as an *ERC-721 NFT*, ensuring authenticity, uniqueness, and security.  


###  Technologies Used  
1️⃣ *Frontend* – React.js + TailwindCSS for UI  
2️⃣ *Blockchain* – Ethereum (via MetaMask)  
3️⃣ *Smart Contract* – Solidity (ERC-721 standard)  
4️⃣ *Web3 Library* – Ethers.js for interacting with the contract  

## 📋 Project Details

- **Project Name**: NFT Ticketing Platform
- **Blockchain Platform**: Ethereum
- **Network**: Sepolia
- **Deployed Smart Contract Address**: 0x3d94F86B92522ae2bB8AcC6E9d570880a96CAa74
- **Wallet Address**: 0x7936d757997C9197849aE6a318e27939D958348f
- **Frontend Repository/Code**: frontend/
- **Team Members**:
  1. **Name (GitHub ID)**: Kumar Kartikay (https://github.com/KKartikay-27)
  2. **Name (GitHub ID)**: Abhay Raj (https://github.com/barrybyte)
  3. **Name (GitHub ID)**: Harsh Kumar (https://github.com/Harsh-svg988)
- **Project Description**:  
  The NFT Ticketing Platform is a cutting-edge solution designed to revolutionize event ticketing by leveraging blockchain technology and NFTs (Non-Fungible Tokens). This platform enables event organizers to create and sell NFT-based tickets, offering attendees a secure and unique way to access events.


## 📂 Directory Structure

```plaintext
/
├── README.md               # This file
├── .gitignore              # Ignore unnecessary files
├── contracts/              # Place smart contracts here
├── tests/                  # Place test files here
├── migrations/             # Migration scripts (optional)
├── frontend/               # Place frontend code here
└── package.json            # Node.js-based dependencies (if applicable)
```
---

## How the Project Works (End-to-End Flow)
### 1️⃣ User Connects MetaMask
- Checks if MetaMask is installed.
- If the user has a wallet, it connects and saves this state in localStorage.

### 2️⃣ Minting an NFT Ticket
- User *inputs an Ethereum address and event details*.
- Calls mintTicket() from the smart contract.
- The ticket is minted and assigned to the given Ethereum address.

### 3️⃣ Viewing NFT Tickets
- Calls ticketCounter() to get the total number of minted tickets.
- Fetches metadata & owner details for each ticket.
- Displays all the tickets owned by the connected wallet.

---

## Steps to run locally

.env
```
ETHERSCAN_API_KEY=...
METAMASK_API_KEY=...
ACCOUNT_KEY=...
```

frontend/.env
```
CONTRACT_ADDRESS=...
```

Install npm
```
npm install
```

### To start frontend - 
```
cd frontend && npm start
```

### To verify contract is Deployed
```
npx hardhat verify --network sepolia ${CONTRACT-ADDRESS} 
```
### To run tests
```
npx hardhat test tests/TicketNFT.test.mjs 
```