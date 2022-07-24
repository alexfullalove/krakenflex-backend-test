import { Outages, SiteOutageData, Devices } from "./types";

const dateCutoff = `2022-01-01T00:00:00.000Z`;

export const filterAndMergeSiteOutages = (
  outages: Outages[],
  devices: Devices[]
): SiteOutageData[] => {
  let siteOutages: SiteOutageData[] = [];
  outages.forEach((siteOutage) => {
    if (siteOutage.begin >= dateCutoff) {
      const device = devices.find((device) => device.id === siteOutage.id);
      if (device) siteOutages.push({ name: device.name, ...siteOutage });
    }
  });
  return siteOutages;
};
