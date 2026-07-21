const express = require('express');
//const path = require('path');
//const RepresentativeService = require('./representative-service');
//const ProPublicaService = require('../propublica/propublica-service');
const FinanceService = require('../finances/finances-service');
const financesRouter = express.Router();
const jsonBodyParser = express.json();

async function getFin(bioguideId) {
    console.log(`bioguideId: ${bioguideId}`);
    // const results = rep.results[0]
    // const photoUrl = `https://theunitedstates.io/images/congress/450x550/${results.member_id}.jpg`
    // const smallPhotoUrl = `https://theunitedstates.io/images/congress/225x275/${results.member_id}.jpg`
 
    const contributionTotals = await FinanceService.getContributionTotals(bioguideId);

    console.log(`contributionTotals: ${JSON.stringify(contributionTotals)}`);

    // TODO REMOVE OR CUT ENDPOINTS AND COMMENTS
    // let contributionTotals = await FinanceService.getContributionTotals(bioguide_id);
    // let topIndustries = await FinanceService.getTopIndustries(bioguide_id);
    // let topContributors = await FinanceService.getTopContributors(bioguide_id);
    
    return {
      bioguideId: bioguideId,
      totalFundingAndSpending: {
        totalFunding: contributionTotals.data.total_funding,
        totalSpent: contributionTotals.data.total_spent,
        cashOnHand: contributionTotals.data.cash_on_hand,
      },
      topIndustries: contributionTotals.data.top_industries,
      // TODO ADD OR CUT
      // contributionTotals
    };
  };

financesRouter.post('/', jsonBodyParser, (req, res, next) => {
  const { bioguide_id } = req.body;
  if(!bioguide_id) {
    return res.status(400).json({error: 'Must include bioguide_id in request body'});
  }
  getFin(bioguide_id).then(finObj => res.json(finObj)).catch(next);
});
 

module.exports = financesRouter;
