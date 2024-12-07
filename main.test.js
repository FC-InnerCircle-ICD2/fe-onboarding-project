import Machine from "./src/components/Machine";
import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, screen } from "@testing-library/dom";

describe("machine", () => {
  let version = "";
  let machine;
  let price;

  beforeEach(() => {
    version = "one";
    machine = new Machine(version);
    price = "1700원";
  });

  it("머신 버전 on 테스트", () => {
    machine.on();

    const machineId = document.querySelector(`.${version}`);
    expect(machineId).not.toBeNull();
  });

  it("Press the machine button", async () => {
    machine.on();

    const div = screen.getAllByText(price);
    fireEvent.click(div[1]);
  });
});
