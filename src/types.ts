export interface Outages {
  id: string;
  begin: Date;
  end: Date;
}

export interface SiteOutageData extends Outages {
  name: string;
}

export interface SiteInfo extends Devices {
  devices: Devices[];
}

interface Devices {
  id: string;
  name: string;
}
