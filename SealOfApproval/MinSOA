const Web3 = require('web3');
const contractAbi = require('./contractAbi');
const IPFS = require('ipfs-core');
const { CID } = require('ipfs-http-client');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const contractAddress = 'CONTRACT_ADDRESS';
const contract = new web3.eth.Contract(contractAbi, contractAddress);
const ipfs = await IPFS.create();

const proposals = [];

async function getProposalData(proposalId) {
  const proposal = proposals[proposalId];
  const proposalData = await ipfs.dag.get(proposal.proposalCid);
  return proposalData.value;
}

async function submitProposal(name, description, websiteUrl) {
  const accounts = await web3.eth.getAccounts();
  const proposal = {
    proposer: accounts[0],
    name,
    description,
    websiteUrl,
    proposalCid: '',
    proposalId: proposals.length,
    votes: 0,
  };
  const cid = await ipfs.dag.put(proposal);
  proposal.proposalCid = cid.toString();

  const gas = await contract.methods.submitProposal(proposal.proposalCid).estimateGas({ from: accounts[0] });
  const result = await contract.methods.submitProposal(proposal.proposalCid).send({ from: accounts[0], gas });
  proposal.proposalId = result.events.ProposalSubmitted.returnValues.proposalId;

  proposals.push(proposal);
}

async function voteForProposal(proposalId) {
  const accounts = await web3.eth.getAccounts();
  const proposal = proposals[proposalId];
  const gas = await contract.methods.voteForProposal(proposal.proposalId).estimateGas({ from: accounts[0] });
  await contract.methods.voteForProposal(proposal.proposalId).send({ from: accounts[0], gas });
  proposal.votes++;
}

async function mintSealOfApproval(proposalId) {
  const accounts = await web3.eth.getAccounts();
  const proposal = proposals[proposalId];
  const proposalData = await getProposalData(proposalId);
  const sealOfApprovalData = `Web3 company ${proposalData.name} has been granted the Seal of Approval by METAPOL for passing Due Diligence requirements.`;
  const cid = await ipfs.add(sealOfApprovalData);
  const sealOfApprovalCid = cid.toString();

  const gas = await contract.methods.mintSealOfApproval(proposal.proposalId, sealOfApprovalCid).estimateGas({ from: accounts[0] });
  await contract.methods.mintSealOfApproval(proposal.proposalId, sealOfApprovalCid).send({ from: accounts[0], gas });
}

async function displayProposals() {
  console.log('Proposals:');
  console.log('---------------------------');

  for (let i = 0; i < proposals.length; i++) {
    const proposalData = await getProposalData(i);
    const proposal = proposals[i];
    console.log(`Proposal ID: ${proposal.proposalId}`);
    console.log(`Proposer: ${proposal.proposer}`);
    console.log(`Name: ${proposalData.name}`);
    console.log(`Description: ${proposalData.description}`);
    console.log(`Website URL: ${proposalData.websiteUrl}`);
    console.log(`Votes: ${proposal.votes}`);
    console.log('---------------------------');
  }
}

displayProposals();

// Example usage:
submitProposal('Web3 Company A', 'A blockchain-based social network platform with decentralized governance.', ['0x123...', '0x456...'], [80, 20]);
