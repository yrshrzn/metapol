const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  foundingTeam: { type: Number, required: true },
  businessModel: { type: Number, required: true },
  technology: { type: Number, required: true },
  market: { type: Number, required: true },
  tokenEconomics: { type: Number, required: true },
  regulatoryCompliance: { type: Number, required: true },
  community: { type: Number, required: true },
  funding: { type: Number, required: true },
  foundingTeamComment: { type: String },
  businessModelComment: { type: String },
  technologyComment: { type: String },
  marketComment: { type: String },
  tokenEconomicsComment: { type: String },
  regulatoryComplianceComment: { type: String },
  communityComment: { type: String },
  fundingComment: { type: String }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
