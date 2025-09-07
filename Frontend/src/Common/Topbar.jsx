import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import User from "../assets/Images/UserIcon.svg";
export default function Topbar() {
    return (
        <header className="bg-white shadow rounded-2xl mt-4 mb-2 ml-4 mr-4 flex items-center justify-between px-4 py-2">

            <div className="flex items-center w-full max-w-md bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
                <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 text-sm text-gray-600 placeholder-gray-400 focus:outline-none"
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-yellow-500" />
            </div>

            <div className="ml-4">
                <img
                    src={User}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full shadow"
                />
            </div>
        </header>
    );
}
