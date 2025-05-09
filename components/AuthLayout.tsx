export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-100px)] py-10 h-full flex items-center justify-center bg-gray-50">
      <div className="w-full min-w-80 md:w-2/3 lg:w-1/2 xl:w-1/3 p-4 sm:p-6 lg:p-8 bg-white border border-gray-300 rounded-lg">
        {children}
      </div>
    </div>
  );
}
