import Container from "@/components/Container";
import Field from "@/components/Field";
import { COLORS } from "@/constants/colors";
import { CAR_FEATURES } from "@/constants/features";

type Brand = {
  id: number;
  name: string;
};

const loadBrands = async () => {
  const response = await fetch(`${process.env.SITE_URL}/api/brands`);
  return response.json() as Promise<{ brands: Brand[] }>;
};

const CreateVehicle = async () => {
  const { brands } = await loadBrands();

  return (
    <Container>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold mb-8">Dodaj novo vozilo</h1>
        <form className="bg-white border border-gray-200 rounded-md w-full lg:w-3/4 p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full md:w-2/3 h-full overflow-hidden">
              <div className="w-full flex gap-4">
                <Field name="model" label="Model" className="flex-1" />
                <Field
                  name="brandId"
                  type="select"
                  label="Brend"
                  className="flex-1"
                >
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="w-full flex gap-4">
                <Field
                  name="year"
                  label="Godina proizvodnje"
                  className="flex-1"
                  type="select"
                >
                  {Array.from(
                    { length: 50 },
                    (_, i) => new Date().getFullYear() - i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Field>
                <Field
                  name="type"
                  type="select"
                  label="Tip vozila"
                  className="flex-1"
                >
                  <option value="SEDAN">Limuzina</option>
                  <option value="COUPE">Coupe</option>
                  <option value="SUV">SUV</option>
                </Field>
                <Field
                  name="typeOfFuel"
                  type="select"
                  label="Vrsta goriva"
                  className="flex-1"
                >
                  <option value="GASOLINE">Benzin</option>
                  <option value="DIESEL">Dizel</option>
                  <option value="ELECTRIC">Električni</option>
                  <option value="HYBRID">Hibrid</option>
                </Field>
              </div>
              <div className="w-full flex gap-4">
                <Field
                  name="numberOfSeats"
                  label="Broj sjedišta"
                  className="flex-1"
                  type="number"
                />
                <Field
                  name="numberOfDoors"
                  label="Broj vrata"
                  className="flex-1"
                  type="number"
                />
                <Field
                  name="color"
                  label="Boja"
                  className="flex-1"
                  type="select"
                >
                  {COLORS.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </Field>
              </div>
              <div
                className="flex flex-wrap"
                v-if="Object.keys(vehicle.features).length"
              >
                {CAR_FEATURES.sort((a, b) => b.type.localeCompare(a.type)).map(
                  (feature) => (
                    <div
                      key={feature.name}
                      className="w-full sm:w-1/2 lg:w-1/3 feature"
                    >
                      <Field
                        key="feature.name"
                        name={feature.name}
                        label={feature.label}
                        type={feature.type}
                        className="mr-2"
                      >
                        {feature.type === "select" &&
                          feature.options?.map((featureOption) => (
                            <option
                              key={featureOption.value}
                              value={featureOption.value}
                            >
                              {featureOption.label}
                            </option>
                          ))}
                      </Field>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="w-full md:w-1/3 h-full p-0 md:p-4">
              <Field name="price" label="Cijena" type="number" step={200} />
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 cursor-pointer float-right"
          >
            Sačuvaj
          </button>
        </form>
      </div>
    </Container>
  );
};

export default CreateVehicle;
