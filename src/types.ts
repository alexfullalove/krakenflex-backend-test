export interface Outages {
  id: string;
  begin: string;
  end: string;
}

export interface SiteOutageData extends Outages {
  name: string;
}

export interface Devices {
  id: string;
  name: string;
}

export interface SiteInfo extends Devices {
  devices: Devices[];
}
