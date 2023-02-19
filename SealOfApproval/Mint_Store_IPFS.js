function mint(address _to, string memory _tokenURI, string memory _companyName, string memory _approvedBy) public onlyOwner returns (uint256) {
    uint256 tokenId = getNextTokenId();
    _mint(_to, tokenId);
    _setTokenURI(tokenId, _tokenURI);
    _setTokenCompany(tokenId, _companyName);
    _setTokenApprovedBy(tokenId, _approvedBy);

    // Store data in IPFS
    bytes memory data = abi.encodePacked(_companyName, " was approved by ", _approvedBy);
    string memory hash = storeInIPFS(data);
    _setTokenIPFSHash(tokenId, hash);

    return tokenId;
}

function storeInIPFS(bytes memory data) internal returns (string memory) {
    // Connect to IPFS using an HTTP client
    IPFSClient ipfs = IPFSClient("http://localhost:5001");

    // Add data to IPFS and get the hash
    IpfsHash memory hash = ipfs.add(data);

    // Return the hash as a string
    return hash.toBase58();
}
