import { useState } from "react";
import { Edit2 } from "lucide-react";
import EditProfileModal from "./EditProfileModal";

export default function ProfileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:mt-2 sm:text-base">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Right Section */}
        <button
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 sm:w-auto"
        >
          <Edit2 size={18} />
          <span>Edit Profile</span>
        </button>
      </div>

      <EditProfileModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}