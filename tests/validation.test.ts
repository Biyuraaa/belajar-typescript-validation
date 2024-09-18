import { z } from "zod";

describe("Test Validation", () => {
  it("should support validation in typescript", () => {
    const schema = z.string().min(5).max(100);

    const request = "M Bimo Bayu B";

    expect(schema.parse(request)).toBe(request);
  });
  it("should support validate primitive data type", () => {
    const emailSchema = z.string().email();

    const email = "biyurasan@gmail.com";

    const isAdminSchema = z.boolean();

    const isAdmin = true;

    const priceSchema = z.number().min(5000).max(10000);

    const price = 7500;

    expect(emailSchema.parse(email)).toBe("biyurasan@gmail.com");
    expect(isAdminSchema.parse(isAdmin)).toBe(true);
    expect(priceSchema.parse(price)).toBe(price);
  });
});
