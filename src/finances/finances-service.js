const config = require('../config');
const fetch = require('node-fetch');

const financesService = {

  getContributionTotals(bioguideId) {

    const baseUrl = process.env.WHO_BOUGHT_MY_REP_BASE_URL;
    const apiKey = process.env.WHO_BOUGHT_MY_REP_API_KEY;
  
    if (!baseUrl) {
      throw new Error(
        'WHO_BOUGHT_MY_REP_BASE_URL is missing from the configuration'
      );
    }

     if (!apiKey) {
      throw new Error(
        'WHO_BOUGHT_MY_REP_API_KEY is missing from the configuration'
      );
    }

    const url = `${baseUrl}/reps/${encodeURIComponent(bioguideId)}`;

    return fetch(url, {
      headers: {
        'X-API-Key':  apiKey,
      }
    })
    .then(res => {
      if(!res.ok) {
        throw new Error(`Finance API returned ${res.status}: ${res.message}`);
      }
      console.log("res from who bought my rep", JSON.stringify(res));
      return res.json();
    })
  },

  getTopIndustries(bioguideId) {
    const url = `${config.OPEN_SECRETS_BASE_URL}method=candIndustry&bioguideId=${cid}&output=json&apikey=${config.OPEN_SECRETS_API_KEY}`;

    return fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error(`Finance API returned ${res.status}: ${res.message}`);
        }

        return res.json();
      })
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
