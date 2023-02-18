const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/due-diligence', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define a schema for the due diligence items
const dueDiligenceSchema = new mongoose.Schema({
  foundingTeam: { type: Number },
  businessModel: { type: Number },
  technology: { type: Number },
  market: { type: Number },
  tokenEconomics: { type: Number },
  regulatoryCompliance: { type: Number },
  community: { type: Number },
  funding: { type: Number },
  foundingTeamComment: { type: String },
  businessModelComment: { type: String },
  technologyComment: { type: String },
  marketComment: { type: String },
  tokenEconomicsComment: { type: String },
  regulatoryComplianceComment: { type: String },
  communityComment: { type: String },
  fundingComment: { type: String }
});

// Define a model for the due diligence items
const DueDiligence = mongoose.model('DueDiligence', dueDiligenceSchema);

// Set up middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  const dueDiligence = new DueDiligence({
    foundingTeam: req.body.foundingTeam,
    businessModel: req.body.businessModel,
    technology: req.body.technology,
    market: req.body.market,
    tokenEconomics: req.body.tokenEconomics,
    regulatoryCompliance: req.body.regulatoryCompliance,
    community: req.body.community,
    funding: req.body.funding,
    foundingTeamComment: req.body.foundingTeamComment,
    businessModelComment: req.body.businessModelComment,
    technologyComment: req.body.technologyComment,
    marketComment: req.body.marketComment,
    tokenEconomicsComment: req.body.tokenEconomicsComment,
    regulatoryComplianceComment: req.body.regulatoryComplianceComment,
    communityComment: req.body.communityComment,
    fundingComment: req.body.fundingComment
  });
  dueDiligence.save();
  res.redirect('/thanks');
});

app.get('/thanks', (req, res) => {
  res.render('thanks');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
