import Container from "./Container";
import Field from "./Field";

const Hero = () => (
  <div className="w-screen bg-gray-50 mb-8">
    <Container>
      <div className="h-120 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 w-full sm:w-2/3 md:w-2/3 lg:w-1/2 mb-8">
          Tražiš ili iznajmljuješ vozilo? Ovo je pravo mjesto za tebe!
        </h1>
        <div className="flex items-center w-full sm:w-96 gap-2 px-2 bg-white border border-gray-300 rounded-lg focus-within:ring-1 focus-within:ring-gray-600">
          {/* <Search className="h-12 text-gray-500" /> */}
          <Field
            name="search"
            // value={value}
            placeholder="Traži vozilo"
            inputClass="w-full border-0 outline-none focus:ring-0"
            className="mb-0"
          />
        </div>
      </div>
    </Container>
  </div>
);

export default Hero;
