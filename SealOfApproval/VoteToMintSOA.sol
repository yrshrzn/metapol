// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Proposal is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _proposalIds;
    string private _baseURIextended;

    struct Web3Company {
        string name;
        string url;
        string metadataHash;
    }

    struct ProposalDetails {
        uint256 id;
        Web3Company company;
        uint256 votes;
        bool approved;
    }

    ProposalDetails[] public proposals;

    mapping(address => bool) public hasVoted;
    mapping(address => uint256) public voteWeights;
    address public admin;

    event ProposalCreated(uint256 proposalId, string name, string url, string metadataHash);
    event VoteCasted(uint256 proposalId, uint256 votes);
    event ProposalApproved(uint256 proposalId, string name);

    constructor() ERC721("METAPOL Seal of Approval", "METAPOL-SOA") {
        admin = msg.sender;
        _setBaseURI("https://gateway.ipfs.io/ipfs/");
    }

    function createProposal(string memory name, string memory url, string memory metadataHash) public returns (uint256) {
        require(bytes(name).length > 0, "Name is required");
        require(bytes(url).length > 0, "URL is required");
        require(bytes(metadataHash).length > 0, "Metadata Hash is required");
        require(voteWeights[msg.sender] > 0, "You don't have enough voting power to create a proposal");
        _proposalIds.increment();
        uint256 newProposalId = _proposalIds.current();
        proposals.push(ProposalDetails(newProposalId, Web3Company(name, url, metadataHash), 0, false));
        emit ProposalCreated(newProposalId, name, url, metadataHash);
        return newProposalId;
    }

    function vote(uint256 proposalId) public {
        require(proposalId <= proposals.length, "Invalid proposal id");
        require(!hasVoted[msg.sender], "You have already voted");
        proposals[proposalId - 1].votes += voteWeights[msg.sender];
        hasVoted[msg.sender] = true;
        emit VoteCasted(proposalId, proposals[proposalId - 1].votes);
    }

    function setVoteWeight(address user, uint256 weight) public {
        require(msg.sender == admin, "Only admin can set vote weight");
        voteWeights[user] = weight;
    }

    function approveProposal(uint256 proposalId) public {
        require(msg.sender == admin, "Only admin can approve a proposal");
        require(proposalId <= proposals.length, "Invalid proposal id");
        ProposalDetails storage proposal = proposals[proposalId - 1];
        require(proposal.votes > (proposals.length / 2), "Proposal has not been approved by the majority");
        require(!proposal.approved, "Proposal has already been approved");
        proposal.approved = true;
        _mint(msg.sender, proposalId);
        _setTokenURI(proposalId, proposal.company.metadataHash);
        emit ProposalApproved(proposalId, proposal.company.name);
    }
}
