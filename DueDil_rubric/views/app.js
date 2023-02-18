const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Rating = require('./models/rating');

const app = express();

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/due-diligence', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database');
});

// Parse request body as JSON
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Render form
app.get('/', function(req, res) {
  res.render('form');
});

// Handle form submission
app.post('/submit', function(req, res) {
  const rating = new Rating({
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

  rating.save(function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.render('thanks');
    }
  });
});

// Start server
app.listen(3000, function() {
  console.log('Server started on port 3000');
});

