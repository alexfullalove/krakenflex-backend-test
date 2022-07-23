export interface Outages {
  id: string;
  begin: Date;
  end: Date;
}

export interface SiteOutageData extends Outages {
  name: string;
}
