import * as apiFns from "./api.service";

const handler = async (siteId: string): Promise<void> => {
  try {
    console.log("Fetching all outages ...");
    const outages = await apiFns.getOutages();
    console.group(`returned ${outages.length} outages`);
  } catch (err) {
    console.log(err);
  }
  // get site info
  // filter outages if they are different ID or pre 2022 and combine remainder with site info
  // post data to site endpoint
};

handler("norwich-pear-tree");
