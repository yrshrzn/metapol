const companyList = document.getElementById('company-list');
const proposalList = document.getElementById('proposal-list');

async function displayCompanies() {
  // Replace with your code to get the list of companies
  const companies = await fetch('/api/companies').then(res => res.json());

  companyList.innerHTML = '';
  for (const company of companies) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="/companies/${company.id}">${company.name}</a>`;
    companyList.appendChild(listItem);
  }
}

async function displayProposals() {
  // Replace with your code to get the list of proposals
  const proposals = await fetch('/api/proposals').then(res => res.json());

  proposalList.innerHTML = '';
  for (const proposal of proposals) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="/proposals/${proposal.id}">${proposal.description}</a>`;
    proposalList.appendChild(listItem);
  }
}

displayCompanies();
displayProposals();
