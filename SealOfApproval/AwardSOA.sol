// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Proposal {
    struct DueDiligence {
        string companyName;
        bool hasProductMarketFit;
        bool hasStrongTeam;
        bool hasCompetitiveAdvantage;
        bool hasClearVision;
        bool hasViableEconomicModel;
    }
    struct ProposalDetails {
        address proposedBy;
        DueDiligence dueDiligence;
        uint256 votes;
        mapping(address => bool) voted;
    }

    mapping(uint256 => ProposalDetails) public proposals;
    uint256 public proposalCount;
    uint256 public quorum = 5;

    event ProposalAdded(uint256 proposalId, address proposedBy);
    event Voted(uint256 proposalId, address voter, uint256 votes);

    function addProposal(DueDiligence memory _dueDiligence) external {
        require(_dueDiligence.hasProductMarketFit, "Due Diligence failed: no product market fit");
        require(_dueDiligence.hasStrongTeam, "Due Diligence failed: no strong team");
        require(_dueDiligence.hasCompetitiveAdvantage, "Due Diligence failed: no competitive advantage");
        require(_dueDiligence.hasClearVision, "Due Diligence failed: no clear vision");
        require(_dueDiligence.hasViableEconomicModel, "Due Diligence failed: no viable economic model");

        proposalCount += 1;
        proposals[proposalCount] = ProposalDetails({
            proposedBy: msg.sender,
            dueDiligence: _dueDiligence,
            votes: 0
        });

        emit ProposalAdded(proposalCount, msg.sender);
    }

    function vote(uint256 _proposalId, uint256 _votes) external {
        ProposalDetails storage proposal = proposals[_proposalId];
        require(!proposal.voted[msg.sender], "You already voted for this proposal");

        proposal.voted[msg.sender] = true;
        proposal.votes += _votes;

        emit Voted(_proposalId, msg.sender, _votes);
    }

    function proposalPassed(uint256 _proposalId) public view returns (bool) {
        ProposalDetails storage proposal = proposals[_proposalId];
        return proposal.votes >= quorum;
    }
}

contract METAPOLSealOfApproval is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("METAPOL Seal of Approval", "MSA") {}

    function awardSealOfApproval(address _web3Company, string memory _companyName, string memory _metadataURI) public {
        require(msg.sender == address(this), "Only the contract can mint new tokens");
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _mint(_web3Company, newTokenId);
        _setTokenURI(newTokenId, _metadataURI);
    }
}
