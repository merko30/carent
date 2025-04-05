"use client";

import { useActionState, useEffect } from "react";
import { redirect, useParams } from "next/navigation";
import toast from "react-hot-toast";

import { Brand } from "@/types";

import Field from "@/components/Field";
import SubmitButton from "@/components/SubmitButton";
import { COLORS } from "@/constants/colors";
import Alert from "@/components/Alert";

import { State } from "./type";

export const initialState: State = {
  error: null,
  errors: {},
  success: false,
  vehicle: null,
  data: {
    brandId: undefined,
    model: undefined,
    year: undefined,
    price: undefined,
    type: undefined,
    typeOfFuel: undefined,
    numberOfDoors: undefined,
    numberOfSeats: undefined,
    color: undefined,
    description: undefined,
    features: {},
  },
};

const Form = ({
  brands,
  actionFn,
  data,
}: {
  brands: Brand[];
  actionFn: (data: any, formData: FormData) => Promise<any>;
  data?: any;
}) => {
  const params = useParams();
  const [state, action] = useActionState(actionFn, {
    ...initialState,
    data: {
      ...initialState.data,
      ...data,
    },
  });

  useEffect(() => {
    if (state.success) {
      if (params.id) {
        toast.success("Uspješno ste uredili vozilo");
      } else {
        redirect(`/vehicles/${state.vehicle?.id}`);
      }
    }
  });

  return (
    <form
      action={action}
      className="bg-white border border-gray-200 rounded-md w-full lg:w-3/4"
    >
      {state.error && (
        <Alert variant="error">
          {state.error.message || "Došlo je do greške"}
        </Alert>
      )}
      <div className="h-full flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 h-full overflow-hidden p-4">
          <div className="w-full flex gap-4">
            <Field
              name="model"
              error={state.errors.model}
              defaultValue={state.data?.model}
              label="Model"
              className="flex-1"
            />
            <Field
              name="brandId"
              type="select"
              error={state.errors.brandId}
              defaultValue={state.data?.brandId}
              label="Brend"
              className="flex-1"
            >
              <option value="" disabled>
                Odaberi
              </option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Field>
          </div>
          <Field
            type="textarea"
            name="description"
            error={state.errors.description}
            defaultValue={state.data?.description}
            label="Opis"
            className="w-full"
            rows={4}
          />
          <div className="w-full flex gap-4">
            <Field
              name="year"
              error={state.errors.year}
              defaultValue={state.data?.year}
              label="Godina proizvodnje"
              className="flex-1"
              type="select"
            >
              <option value="" disabled>
                Odaberi
              </option>
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
              error={state.errors.type}
              defaultValue={state.data?.type}
              label="Tip vozila"
              className="flex-1"
            >
              <option value="" disabled>
                Odaberi
              </option>
              <option value="SEDAN">Limuzina</option>
              <option value="COUPE">Coupe</option>
              <option value="SUV">SUV</option>
            </Field>
            <Field
              name="typeOfFuel"
              type="select"
              error={state.errors.typeOfFuel}
              defaultValue={state.data?.typeOfFuel}
              label="Vrsta goriva"
              className="flex-1"
            >
              <option value="" disabled>
                Odaberi
              </option>
              <option value="GASOLINE">Benzin</option>
              <option value="DIESEL">Dizel</option>
              <option value="ELECTRIC">Električni</option>
              <option value="HYBRID">Hibrid</option>
            </Field>
          </div>
          <div className="w-full flex gap-4">
            <Field
              name="numberOfSeats"
              error={state.errors.numberOfSeats}
              defaultValue={state.data?.numberOfSeats}
              label="Broj sjedišta"
              className="flex-1"
              type="number"
            />
            <Field
              name="numberOfDoors"
              error={state.errors.numberOfDoors}
              defaultValue={state.data?.numberOfDoors}
              label="Broj vrata"
              className="flex-1"
              type="number"
            />
            <Field
              name="color"
              error={state.errors.color}
              defaultValue={state.data?.color}
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
          {/* {Object.keys(vehicle.features).length && */}
          {/* <div
            className="flex flex-wrap"
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
                //    error={state.errors.features?.[feature.name]}
                     defaultValue={state.data?.features[feature.name]}
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
          </div> */}
          {/* </div>} */}
        </div>
        <div className="w-full md:w-1/3 min-h-full p-0 bg-gray-50">
          <div className="h-full flex flex-col p-4">
            <Field
              name="price"
              error={state.errors.price}
              defaultValue={state.data?.price}
              label="Cijena"
              type="number"
            />
            <SubmitButton
              label={params.id ? "Sačuvaj izmjene" : "Dodaj vozilo"}
              loadingLabel={
                params.id ? "Čuvanje izmjena..." : "Dodavanje vozila..."
              }
              className="mt-auto"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
