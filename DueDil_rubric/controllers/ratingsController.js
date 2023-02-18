const express = require('express');
const router = express.Router();
const Rating = require('../models/rating');

router.post('/submit-rating', async (req, res) => {
  try {
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

    await rating.save();

    res.redirect('/thanks');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error submitting rating');
  }
});

module.exports = router;
