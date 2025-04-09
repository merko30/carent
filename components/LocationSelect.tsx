import { useState } from "react";

import Modal from "./Modal";
import Button from "./Button";
import Field from "./Field";
import { z } from "zod";
import { Location } from "@/types";

// Bosnian cities
const CITIES = [
  { id: 1, name: "Sarajevo", zip: "71000" },
  { id: 2, name: "Banja Luka", zip: "78000" },
  { id: 3, name: "Tuzla", zip: "75000" },
  { id: 4, name: "Zenica", zip: "72000" },
  { id: 5, name: "Mostar", zip: "88000" },
  { id: 6, name: "Bihać", zip: "77000" },
  { id: 7, name: "Doboj", zip: "74000" },
  { id: 8, name: "Livno", zip: "80101" },
  { id: 9, name: "Goražde", zip: "73000" },
  { id: 10, name: "Srebrenik", zip: "76260" },
  { id: 11, name: "Cazin", zip: "77220" },
  { id: 12, name: "Visoko", zip: "71300" },
  { id: 13, name: "Gradačac", zip: "76100" },
  { id: 14, name: "Kakanj", zip: "72240" },
  { id: 15, name: "Jajce", zip: "70101" },
];

const schema = z.object({
  address: z.string().min(5, "Adresa je obavezno polje"),
  city: z.string().min(1, "Molimo odaberite grad"),
  zip: z.string().min(1, "Molimo odaberite poštanski broj"),
  phone: z
    .string()
    .min(1, "Molimo unesite broj telefona")
    .regex(
      // 06(0|1|2|3|4|5|6|7|8|9)[0-9]{7}
      /^(06[0-9]{1}[0-9]{7})$/,
      "Molimo unesite validan broj telefona"
    ),
});

const LocationSelect = ({
  location: initialLocation,
  onSave: _onSave,
}: {
  location?: Location;
  onSave?: (location: { address: string; city: string; zip: string }) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState<Location>(
    initialLocation ?? {
      address: "",
      city: "",
      zip: "",
      phone: "",
    }
  );
  const [errors, setErrors] = useState<{
    address?: string;
    city?: string;
    zip?: string;
    phone?: string;
  }>({});

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = CITIES.find((city) => city.name === e.target.value);
    if (selectedCity) {
      setLocation((oldLocation) => ({
        ...oldLocation,
        city: selectedCity.name,
        zip: selectedCity.zip,
      }));
    }
  };

  const onSave = () => {
    setErrors({});
    const parsed = schema.safeParse(location);
    if (!parsed.success) {
      parsed.error.errors.forEach((error) => {
        const field = error.path[0];
        const message = error.message;
        setErrors((prev) => ({
          ...prev,
          [field]: message,
        }));
      });
      return;
    }
    if (_onSave) {
      _onSave(location);
    }
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full bg-white border border-gray-300 hover:bg-gray-50
        text-gray-800 hover:text-black text-sm font-medium
        "
      >
        {initialLocation?.address && initialLocation?.city
          ? `${initialLocation.address}, ${initialLocation.city} (${initialLocation.zip})`
          : "Odaberi lokaciju"}
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <Field
          label="Adresa"
          value={location.address}
          name="address"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLocation((oldLocation) => ({
              ...oldLocation,
              address: e.target.value,
            }))
          }
          error={errors.address}
        />
        <div className="flex items-center gap-4">
          <Field
            className="flex-1"
            value={location.city}
            name="city"
            label="Grad"
            type="select"
            onChange={onChangeCity}
            error={errors.city}
          >
            <option value="" disabled>
              Odaberi lokaciju
            </option>
            {CITIES.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </Field>
          <Field
            label="Poštanski broj"
            value={location.zip}
            name="zip"
            onChange={onChange}
            error={errors.zip}
            className="flex-1"
          />
        </div>
        <Field
          label="Kontakt telefon"
          value={location.phone}
          name="phone"
          onChange={onChange}
          error={errors.phone}
          className="flex-1"
        />

        <Button onClick={onSave} className="w-full mt-4">
          Sačuvaj
        </Button>
      </Modal>
    </>
  );
};

export default LocationSelect;
