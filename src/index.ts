import * as apiFns from "./api.service";
import * as logicFns from "./outage-logic";

const handler = async (siteId: string): Promise<void> => {
  try {
    console.log("Fetching all outages ...");
    const outages = await apiFns.getOutages();
    console.log(`Returned ${outages.length} outages`);
    console.log("Getting site info ...");
    const siteInfo = await apiFns.getSiteInfo(siteId);
    console.log(`Successfully retrieved site info for ${siteInfo.name}`);
    const filteredSiteOutages = logicFns.filterAndMergeSiteOutages(
      outages,
      siteInfo.devices
    );
    console.log(
      `Found ${filteredSiteOutages.length} for site: ${siteInfo.name}`
    );

    await apiFns.postSiteOutages(siteId, filteredSiteOutages);
    console.log(
      `Successfully posted ${filteredSiteOutages.length} outages to site-outages endpoint`
    );
  } catch (err: any) {
    console.log(err);
  }
};

handler("norwich-pear-tree");
