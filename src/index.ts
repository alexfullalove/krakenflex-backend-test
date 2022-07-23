import * as apiFns from "./api.service";
import * as logicFns from "./outage-logic";

const siteId = "norwich-pear-tree";

export const handler = async (siteId: string): Promise<void> => {
  try {
    console.log("Fetching all outages and site info ...");
    const outages = await apiFns.getOutages();
    if (outages.length === 0) {
      console.log("No outages were returned");
      return;
    }

    const siteInfo = await apiFns.getSiteInfo(siteId);
    const filteredSiteOutages = logicFns.filterAndMergeSiteOutages(
      outages,
      siteInfo.devices
    );

    if (filteredSiteOutages.length === 0) {
      console.log("No outages matched any of the devices");
      return;
    }

    await apiFns.postSiteOutages(siteId, filteredSiteOutages);
    console.log(
      `Successfully posted ${filteredSiteOutages.length} devices out of ${outages.length} outages to site-outages endpoint for site: ${siteInfo.name}`
    );
  } catch (err: any) {
    console.error(err.response.status, err.response.data.message);
  }
};

handler(siteId);
