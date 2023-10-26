import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end">
      </div>
    </div>
  )
}
