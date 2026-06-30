export default function Header({ children }) {
  return (
    <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md flex flex-wrap items-center justify-between">
      <h1 className="text-2xl font-bold">Личный финансовый трекер</h1>
      <div className="mt-2 sm:mt-0">
        {children}
      </div>
    </header>
  );
}