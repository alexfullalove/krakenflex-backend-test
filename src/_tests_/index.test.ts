import { handler } from "../index";
import * as apiFns from "../api.service";
import * as logicFns from "../outage-logic";
import { Outages, SiteInfo, SiteOutageData } from "../types";

let logicSpy: jest.SpyInstance;
let getOutagesSpy: jest.SpyInstance;
let getSiteSpy: jest.SpyInstance;
let postSiteOutagesSpy: jest.SpyInstance;

const siteId = "norwich-pear-tree";

const mockOutages: Outages[] = [
  {
    id: "mock-id-1",
    begin: "2021-07-12T16:31:47.254Z",
    end: "2022-10-13T04:05:10.044Z",
  },
  {
    id: "mock-id-2",
    begin: "2022-07-12T16:31:47.254Z",
    end: "2022-10-13T04:05:10.044Z",
  },
  {
    id: "mock-id-3",
    begin: "2022-07-12T16:31:47.254Z",
    end: "2022-10-13T04:05:10.044Z",
  },
];

const mockSiteInfo: SiteInfo = {
  id: "kingfisher",
  name: "KingFisher",
  devices: [
    {
      id: "mock-id-1",
      name: "Battery 1",
    },
    {
      id: "mock-id-2",
      name: "Battery 2",
    },
  ],
};

const mockFilteredDevices: SiteOutageData[] = [
  {
    id: "mock-id-1",
    name: "Battery 1",
    begin: "2022-05-23T12:21:27.377Z",
    end: "2022-11-13T02:16:38.905Z",
  },
  {
    id: "mock-id-1",
    name: "Battery 1",
    begin: "2022-12-04T09:59:33.628Z",
    end: "2022-12-12T22:35:13.815Z",
  },
  {
    id: "mock-id-2",
    name: "Battery 2",
    begin: "2022-07-12T16:31:47.254Z",
    end: "2022-10-13T04:05:10.044Z",
  },
];

describe("handler", () => {
  beforeEach(() => {
    logicSpy = jest.spyOn(logicFns, "filterAndMergeSiteOutages");
    getOutagesSpy = jest.spyOn(apiFns, "getOutages");
    getSiteSpy = jest.spyOn(apiFns, "getSiteInfo");
    postSiteOutagesSpy = jest.spyOn(apiFns, "postSiteOutages");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("if getOutages rejects then console.error should be called in catch block", async () => {
    console.error = jest.fn();
    getOutagesSpy = jest.spyOn(apiFns, "getOutages").mockRejectedValueOnce({
      response: {
        status: 500,
        data: { message: "internal server error" },
      },
    });
    await handler(siteId);
    expect(getOutagesSpy).toBeCalledTimes(1);
    expect(getSiteSpy).toBeCalledTimes(0);
    expect(logicSpy).toBeCalledTimes(0);
    expect(postSiteOutagesSpy).toBeCalledTimes(0);
    expect(console.error).toBeCalledWith(500, "internal server error");
  });

  test("if getOutages is an empty array then program should stop exectuing", async () => {
    console.log = jest.fn();
    getOutagesSpy = jest.spyOn(apiFns, "getOutages").mockResolvedValueOnce([]);
    await handler(siteId);
    expect(getOutagesSpy).toBeCalledTimes(1);
    expect(getSiteSpy).toBeCalledTimes(0);
    expect(logicSpy).toBeCalledTimes(0);
    expect(postSiteOutagesSpy).toBeCalledTimes(0);
    expect(console.log).toHaveBeenCalledWith("No outages were returned");
  });

  test("if site-info not found then catch block should console.error with status code", async () => {
    console.error = jest.fn();
    getOutagesSpy = jest
      .spyOn(apiFns, "getOutages")
      .mockResolvedValueOnce(mockOutages);
    getSiteSpy = jest.spyOn(apiFns, "getSiteInfo").mockRejectedValueOnce({
      response: {
        status: 404,
        data: { message: "site not found" },
      },
    });

    await handler(siteId);
    expect(getOutagesSpy).toBeCalledTimes(1);
    expect(getSiteSpy).toBeCalledTimes(1);
    expect(getSiteSpy).toBeCalledWith(siteId);
    expect(logicSpy).toBeCalledTimes(0);
    expect(postSiteOutagesSpy).toBeCalledTimes(0);
    expect(console.error).toBeCalledWith(404, "site not found");
  });

  test("if site found but no matches when filtering it should stop execution and log", async () => {
    console.log = jest.fn();
    getOutagesSpy = jest
      .spyOn(apiFns, "getOutages")
      .mockResolvedValueOnce(mockOutages);
    getSiteSpy = jest
      .spyOn(apiFns, "getSiteInfo")
      .mockResolvedValueOnce(mockSiteInfo);
    logicSpy = jest
      .spyOn(logicFns, "filterAndMergeSiteOutages")
      .mockReturnValueOnce([]);

    await handler(siteId);
    expect(getOutagesSpy).toBeCalledTimes(1);
    expect(getSiteSpy).toBeCalledTimes(1);
    expect(getSiteSpy).toBeCalledWith(siteId);
    expect(logicSpy).toBeCalledTimes(1);
    expect(logicSpy).toBeCalledWith(mockOutages, mockSiteInfo.devices);
    expect(postSiteOutagesSpy).toBeCalledTimes(0);
    expect(console.log).toBeCalledWith("No outages matched any of the devices");
  });

  test("if site found and devices filtered it should call postSiteOutageswith data", async () => {
    console.log = jest.fn();
    getOutagesSpy = jest
      .spyOn(apiFns, "getOutages")
      .mockResolvedValueOnce(mockOutages);
    getSiteSpy = jest
      .spyOn(apiFns, "getSiteInfo")
      .mockResolvedValueOnce(mockSiteInfo);
    logicSpy = jest
      .spyOn(logicFns, "filterAndMergeSiteOutages")
      .mockReturnValueOnce(mockFilteredDevices);
    postSiteOutagesSpy = jest
      .spyOn(apiFns, "postSiteOutages")
      .mockResolvedValueOnce();

    await handler(siteId);
    expect(getOutagesSpy).toBeCalledTimes(1);
    expect(getSiteSpy).toBeCalledTimes(1);
    expect(getSiteSpy).toBeCalledWith(siteId);
    expect(logicSpy).toBeCalledTimes(1);
    expect(postSiteOutagesSpy).toBeCalledTimes(1);
    expect(logicSpy).toBeCalledWith(mockOutages, mockSiteInfo.devices);
    expect(postSiteOutagesSpy).toBeCalledWith(siteId, mockFilteredDevices);
    expect(console.log).toBeCalledWith(
      `Successfully posted ${mockFilteredDevices.length} devices out of ${mockOutages.length} outages to site-outages endpoint for site: ${mockSiteInfo.name}`
    );
  });

  test("if site found and devices filtered it should call postSiteOutageswith data and catch if 500 is returned", async () => {
    console.error = jest.fn();
    getOutagesSpy = jest
      .spyOn(apiFns, "getOutages")
      .mockResolvedValueOnce(mockOutages);
    getSiteSpy = jest
      .spyOn(apiFns, "getSiteInfo")
      .mockResolvedValueOnce(mockSiteInfo);
    logicSpy = jest
      .spyOn(logicFns, "filterAndMergeSiteOutages")
      .mockReturnValueOnce(mockFilteredDevices);
    postSiteOutagesSpy = jest
      .spyOn(apiFns, "postSiteOutages")
      .mockRejectedValueOnce({
        response: {
          status: 500,
          data: { message: "internal server error" },
        },
      });

    await handler(siteId);
    expect(getOutagesSpy).toBeCalledTimes(1);
    expect(getSiteSpy).toBeCalledTimes(1);
    expect(getSiteSpy).toBeCalledWith(siteId);
    expect(logicSpy).toBeCalledTimes(1);
    expect(logicSpy).toBeCalledWith(mockOutages, mockSiteInfo.devices);
    expect(postSiteOutagesSpy).toBeCalledTimes(1);
    expect(postSiteOutagesSpy).toBeCalledWith(siteId, mockFilteredDevices);
    expect(console.error).toBeCalledWith(500, "internal server error");
  });
});
