const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
      <h1 className="text-5xl font-bold text-red-600">403</h1>
      <p className="mt-4 text-2lg">
        Nemate autorizovan za pristup ovoj stranici.
      </p>
    </div>
  );
};

export default Forbidden;
