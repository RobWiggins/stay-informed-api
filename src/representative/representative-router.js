
const express = require('express');
const path = require('path');
const RepresentativeService = require('./representative-service');
const ProPublicaService = require('../propublica/propublica-service');
const FinanceService = require('../finances/finances-service');

const representativeRouter = express.Router();
const jsonBodyParser = express.json();

async function getAll(address) {
  const reps = await RepresentativeService.getReps(address);

  const result = reps?.results?.[0];
  const addressComponents = result?.address_components;
  const district = result?.fields?.congressional_districts?.[0];
  const representatives = district?.current_legislators;

  if (!addressComponents || !district || !representatives) {
    const error = new Error(
      "We couldn't find your district, check your address and try again"
    );
    error.status = 400;
    throw error;
  }

  return {
    address: addressComponents,
    district,
    representatives
  }
}


  async function repsResponse(rep) {
    const results = rep.results[0]
    const photoUrl = `https://theunitedstates.io/images/congress/450x550/${results.member_id}.jpg`
    const smallPhotoUrl = `https://theunitedstates.io/images/congress/225x275/${results.member_id}.jpg`
    // TODO REMOVE? probably
    // let cid = results.crp_id
    // let contributionTotals = await FinanceService.getContributionTotals(cid);
    // let topIndustries = await FinanceService.getTopIndustries(cid);
    // let topContributors = await FinanceService.getTopContributors(cid);
    
    return {...results, photoUrl, smallPhotoUrl};
  };
  //   const reps = representatives.map((rep) => {
  //     return repsResponse(rep);
  // });

  // return Promise.all(reps).then(repsArray => ({representatives: repsArray, state: districtObject.state,district: districtObject.district}))
// }

representativeRouter.post('/', jsonBodyParser, (req, res, next) => {
  const { address } = req.body;

  if(!address) {
    return res.status(400).json({error: 'Must include address in request body'});
  }

  getAll(address)
    .then(reps => res.json(reps))
    .catch(error => {
      if (error.status) {
        return res.status(error.status).json({ error: error.message });
      }

      next(error);
    });

});
 

module.exports = representativeRouter;
