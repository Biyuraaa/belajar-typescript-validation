import { z, ZodError } from "zod";

describe("Test Validation", () => {
  it("should support data convertion in typescript", () => {
    const schema = z.coerce.string().min(5).max(100);

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
  it("should support convertion data type", () => {
    const emailSchema = z.coerce.string().min(3).max(10);

    const email = 1234;

    const isAdminSchema = z.coerce.boolean();

    const isAdmin = "1234";

    const priceSchema = z.coerce.number().min(5000).max(10000);

    const price = "7500";

    expect(emailSchema.parse(email)).toBe("1234");
    expect(isAdminSchema.parse(isAdmin)).toBe(true);
    expect(priceSchema.parse(price)).toBe(7500);
  });
  it("should support convertion data type", () => {
    const emailSchema = z.coerce.string().min(3).max(10);

    const email = 1234;

    const isAdminSchema = z.coerce.boolean();

    const isAdmin = "1234";

    const priceSchema = z.coerce.number().min(5000).max(10000);

    const price = "7500";

    expect(emailSchema.parse(email)).toBe("1234");
    expect(isAdminSchema.parse(isAdmin)).toBe(true);
    expect(priceSchema.parse(price)).toBe(7500);
  });
  it("should support date validation", () => {
    const dateSchema = z.coerce
      .date()
      .min(new Date(2000, 1, 1))
      .max(new Date());
    const tgl_lahir = "2003-07-08";
    console.info(dateSchema.parse(tgl_lahir));
  });

  it("should return zod error if invalid", async () => {
    const emailSchema = z.string().email().min(3).max(255);

    const email = "by";

    try {
      emailSchema.parse(email);
    } catch (err) {
      if (err instanceof ZodError) {
        console.info(err.errors);
      }
    }
  });
  it("should return zod error if invalid without exception", async () => {
    const emailSchema = z.string().email().min(3).max(255);

    const email = "by";

    const result = emailSchema.safeParse(email);

    if (result.success) {
      console.info(result.data);
    } else {
      console.info(result.error);
    }
  });

  it("should support object validation", () => {
    const loginSchema = z.object({
      name: z.string().min(5).max(25),
      email: z.string().email(),
      password: z.string().min(8),
    });

    const login = {
      name: "Bimo",
      email: "biyurasan@gmail.com",
      password: "187221049",
    };

    const result = loginSchema.safeParse(login);

    if (result.success) {
      console.info(result.data);
    } else {
      console.info(result.error);
    }
  });
  it("should support nested object validation", () => {
    const createUserSchema = z.object({
      name: z.string().min(5).max(25),
      email: z.string().email(),
      password: z.string().min(8),
      address: z.object({
        street: z.string().max(100),
        city: z.string().max(25),
        country: z.string().max(55),
      }),
    });

    const login = {
      name: "Biyuraaa",
      email: "biyurasan@gmail.com",
      password: "187221049",
      address: {
        street: "Jl. Demak Jaya 2 no.82",
        city: "Surabaya",
        country: "Indonesia",
      },
    };

    const result = createUserSchema.safeParse(login);

    if (result.success) {
      console.info(result.data);
    } else {
      console.info(result.error);
    }
  });

  it("should support colletion validation", () => {
    const arraySchema = z.array(z.string().min(1).max(10));

    const array = new Array<string>("M", "Bimo", "Bayu");

    const resultArray = arraySchema.parse(array);
    console.info(resultArray);

    const setSchema = z.set(z.string());

    const set: Set<string> = new Set(["M", "Bimo", "Bayu"]);

    const resultSet = setSchema.parse(set);

    console.info(resultSet);

    const mapSchema = z.map(z.string(), z.string());

    const map: Map<string, string> = new Map([
      ["name", "M Bimo Bayu Bagaskara"],
      ["nim", "187221049"],
    ]);

    const resultMap = mapSchema.parse(map);
    console.info(resultMap);
  });

  it("should support object validation with custom validation message", () => {
    const loginSchema = z.object({
      name: z
        .string()
        .min(5, "Karakter minimal 5 cak")
        .max(25, "Kakean su maksimal 25 ye"),
      email: z.string().email("Iku guduk format email blog"),
      password: z.string().min(8),
    });

    const login = {
      name: "Bimo",
      email: "biyurasan@gmail",
      password: "187221049",
    };

    const result = loginSchema.safeParse(login);

    if (result.success) {
      console.info(result.data);
    } else {
      console.info(result.error);
    }
  });
  it("should support object validation with custom validation message and optional", () => {
    const loginSchema = z.object({
      first_name: z
        .string()
        .min(5, "Karakter minimal 5 cak")
        .max(25, "Kakean su maksimal 25 ye"),
      last_name: z.string().optional(),
      email: z.string().email("Iku guduk format email blog"),
      password: z.string().min(8),
    });

    const login = {
      name: "Bimo",
      email: "biyurasan@gmail",
      password: "187221049",
    };

    const result = loginSchema.safeParse(login);

    if (result.success) {
      console.info(result.data);
    } else {
      console.info(result.error);
    }
  });

  it("shoulld support transform after validating data", () => {
    const nameSchema = z.string().transform((data) => data.toUpperCase());

    const name = "Bimo";

    const result = nameSchema.parse(name);

    console.info(result);
  });
});
