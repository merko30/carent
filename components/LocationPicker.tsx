import { useState } from "react";

import Modal from "./Modal";
import Button from "./Button";
import Field from "./Field";

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

const LocationSelect = ({
  onSave,
}: {
  onSave?: (location: { address: string; city: string; zip: string }) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState({
    address: "",
    city: "",
    zip: "",
  });
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full bg-white border border-gray-300 hover:bg-gray-50
        text-gray-800 hover:text-black text-sm font-medium
        "
      >
        {location.address && location.city
          ? `${location.address} ${location.city} (${location.zip})`
          : "Odaberi lokaciju"}
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <Field
          label="Adresa"
          value={location.address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLocation((oldLocation) => ({
              ...oldLocation,
              address: e.target.value,
            }))
          }
        />
        <div className="flex items-center gap-4">
          <Field
            className="flex-1"
            value={location.city}
            label="Grad"
            type="select"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const selectedCity = CITIES.find(
                (city) => city.zip === e.target.value
              );
              if (selectedCity) {
                setLocation((oldLocation) => ({
                  address: oldLocation.address,
                  city: selectedCity.name,
                  zip: selectedCity.zip,
                }));
              }
            }}
          >
            <option value="" disabled>
              Odaberi lokaciju
            </option>
            {CITIES.map((city) => (
              <option key={city.id} value={city.zip}>
                {city.name}
              </option>
            ))}
          </Field>
          <Field
            label="Poštanski broj"
            value={location.zip}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLocation((oldLocation) => ({
                ...oldLocation,
                zip: e.target.value,
              }))
            }
            className="flex-1"
          />
        </div>

        <Button
          onClick={() => {
            if (onSave) {
              onSave(location);
            }
            setIsOpen(false);
          }}
          className="w-full mt-4"
        >
          Spremi lokaciju
        </Button>
      </Modal>
    </>
  );
};

export default LocationSelect;
