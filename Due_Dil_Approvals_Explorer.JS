const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/your_project_id');

const contractAddress = '0x123...'; // contract address
const contractABI = [ /* contract ABI here */ ];
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

async function getProposals() {
  const proposals = await contractInstance.methods.proposals().call();
  return proposals.map(proposal => ({
    id: proposal.id,
    description: proposal.description,
    votesFor: parseInt(proposal.votesFor),
    votesAgainst: parseInt(proposal.votesAgainst),
    proposer: proposal.proposer,
    open: proposal.open
  }));
}

async function getVotes(id) {
  const votesFor = await contractInstance.methods.getVotesFor(id).call();
  const votesAgainst = await contractInstance.methods.getVotesAgainst(id).call();
  return {
    votesFor: parseInt(votesFor),
    votesAgainst: parseInt(votesAgainst)
  };
}

async function displayProposals() {
  const proposals = await getProposals();
  console.log('Proposals:');
  for (const proposal of proposals) {
    const votes = await getVotes(proposal.id);
    console.log(`${proposal.id}: ${proposal.description} - For: ${votes.votesFor}, Against: ${votes.votesAgainst}`);
  }
}

displayProposals();
