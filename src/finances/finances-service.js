const config = require('../config');
const fetch = require('node-fetch');

const financesService = {
  //This gets the total contributions and spending by cid #
  getContributionTotals(bioguideId) {
    const url = `${config.WHO_BOUGHT_MY_REP_BASE_URL}/reps/${biogguideId}}`;

    return fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log("res from who bought my rep", res);
        return res
      });
  },

  getTopIndustries(bioguideId) {
    const url = `${config.OPEN_SECRETS_BASE_URL}method=candIndustry&bioguideId=${cid}&output=json&apikey=${config.OPEN_SECRETS_API_KEY}`;

    return fetch(url)
      .then(res => res.json())
      .then(res => {
        let industries = [];

        res.response.industries.industry.forEach(ind => {
          industries.push(ind['@attributes']);

        });
        return industries;
      });
  },

  getTopContributors(cid) {
    const url = `${config.OPEN_SECRETS_BASE_URL}method=candContrib&cid=${cid}&output=json&apikey=${config.OPEN_SECRETS_API_KEY}`;

    return fetch(url)
      .then(res => res.json())
      .then(res => {
        let contributors = [];

        res.response.contributors.contributor.forEach(ind => {
          contributors.push(ind['@attributes']);

        });
        return contributors;
      });
  },


};



module.exports = financesService;
