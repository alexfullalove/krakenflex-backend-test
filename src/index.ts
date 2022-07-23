import { getOutages, getSiteInfo, postSiteOutages } from "./api.service";
import { filterAndMergeSiteOutages } from "./outage-logic";

const siteId = "norwich-pear-tree";

export const handler = async (siteId: string): Promise<void> => {
  try {
    console.log("Fetching all outages and site info ...");
    const outages = await getOutages();
    if (outages.length === 0) {
      console.log("No outages were returned");
      return;
    }

    const siteInfo = await getSiteInfo(siteId);
    const { devices } = siteInfo;
    const filteredSiteOutages = filterAndMergeSiteOutages(outages, devices);

    if (filteredSiteOutages.length === 0) {
      console.log("No outages matched any of the devices");
      return;
    }

    await postSiteOutages(siteId, filteredSiteOutages);
    console.log(
      `Successfully posted ${filteredSiteOutages.length} devices out of ${outages.length} outages to site-outages endpoint for site: ${siteInfo.name}`
    );
  } catch (err: any) {
    console.error(err.response.status, err.response.data.message);
  }
};

handler(siteId);
