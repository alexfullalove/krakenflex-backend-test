import { filterAndMergeSiteOutages } from "../outage-logic";
import { Devices, Outages } from "../types";

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

const mockDevices: Devices[] = [
  {
    id: "mock-id-1",
    name: "Battery 1",
  },
  {
    id: "mock-id-2",
    name: "Battery 2",
  },
];

describe("filterAndMergeSiteOutages", () => {
  test("it should return an empty array when passed an empty array of outages and devices", () => {
    const result = filterAndMergeSiteOutages([], []);
    expect(result).toEqual([]);
  });
  test("it should return an empty array when passed an array of outages and an empty array of devices", () => {
    const result = filterAndMergeSiteOutages([mockOutages[1]], []);
    expect(result).toEqual([]);
  });
  test("it should return an empty array when passed an empty array of outages and an array of devices", () => {
    const result = filterAndMergeSiteOutages([], [mockDevices[0]]);
    expect(result).toEqual([]);
  });
  test("It should return an empty array if the devices passed in are older than the date cut-off (1/1/22)", () => {
    const result = filterAndMergeSiteOutages([mockOutages[0]], mockDevices);
    expect(result).toEqual([]);
  });
  test("It should return an empty array if the devices passed in are older than the date cut-off (1/1/22)", () => {
    const result = filterAndMergeSiteOutages([mockOutages[0]], mockDevices);
    expect(result).toEqual([]);
  });
  test("It should return an empty array if the devices passed in are newer than the date cut-off (1/1/22) but there are no matchign devices", () => {
    const result = filterAndMergeSiteOutages([mockOutages[2]], mockDevices);
    expect(result).toEqual([]);
  });
  test("it should filter all outages that are before the date cut-off and pay with corresponding devices", () => {
    const result = filterAndMergeSiteOutages(mockOutages, mockDevices);
    expect(result).toEqual([
      {
        name: "Battery 2",
        id: "mock-id-2",
        begin: "2022-07-12T16:31:47.254Z",
        end: "2022-10-13T04:05:10.044Z",
      },
    ]);
  });
});
