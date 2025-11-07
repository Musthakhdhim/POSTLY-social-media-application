import Navigation from "../navigation/Navigation.jsx";

export default function HomePage() {
  return (
    <div className="px-5 lg:px-36 flex justify-between">
      {/* Left Column */}
      <div className="hidden lg:block w-2/12 relative">
        <Navigation/>
      </div>

      {/* Middle Column */}
      <div className="w-full lg:w-6/12 relative">
        <p className="text-center">Middle</p>
      </div>

      {/* Right Column */}
      <div className="hidden lg:block w-3/12 relative">
        <p className="text-center">Right</p>
      </div>
    </div>
  );
}