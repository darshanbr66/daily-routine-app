import MobileSidebar from "./MobileSidebar";

function Topbar({ navigation }) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:hidden">
      <MobileSidebar navigation={navigation} />

      <h1 className="text-lg font-semibold">
        Daily Routine
      </h1>

      <div className="w-8" />
    </header>
  );
}

export default Topbar;