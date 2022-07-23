import * as apiFns from "./api.service";

const handler = async (siteId: string): Promise<void> => {
  try {
    console.log("Fetching all outages ...");
    const outages = await apiFns.getOutages();
    console.log(`Returned ${outages.length} outages`);
    console.log("Getting site info ...");
    const siteInfo = await apiFns.getSiteInfo(siteId);
    console.log(`Successfully retrieved site info for ${siteInfo.name}`);
    // filter and merge dat

    // await apiFns.postSiteOutages(siteId, siteOutages)
  } catch (err) {
    console.log(err);
  }
};

handler("norwich-pear-tree");
