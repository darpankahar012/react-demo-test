const Profile = ({ profile }) => {
  return (
    <>
      <div className="font-sans leading-tight bg-grey-lighter p-8">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="bg-cover h-20"></div>
          <div className="border-b px-4 pb-6">
            <div className="text-center sm:text-left sm:flex mb-4">
              <img
                className="h-32 w-32 rounded-full border-4 border-white -mt-16 mr-4"
                src={profile?.image}
                alt=""
              />
              <div className="py-2">
                <h3 className="font-bold text-2xl mb-1">
                  {profile?.firstName} {profile?.lastName}
                </h3>
                <div className="inline-flex text-grey-dark sm:flex items-center">
                  <svg
                    className="h-5 w-5 text-grey mr-1"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      className="heroicon-ui"
                      d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                    />
                  </svg>
                  {profile?.address?.address}, {profile?.address?.city}, {""}
                  {profile?.address?.state}
                </div>
              </div>
            </div>
            <div className="flex">
              <button className="flex-1 rounded-full bg-blue text-white antialiased font-bold hover:bg-blue-dark px-4 py-2 mr-2">
                Follow
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 p-5">
            <div className="bg-gray-100 text-lg p-6 rounded-lg">
              <h4 className="font-bold text-2xl mb-2">Personal Details</h4>
              <p className="text-sm mb-1">
                <span className="font-bold">Username:</span> {profile?.username}
              </p>
              <p className="text-sm mb-1">
                <span className="font-bold">Email:</span> {profile?.email}
              </p>
              <p className="text-sm mb-1">
                <span className="font-bold">Phone (M):</span> {profile?.phone}
              </p>
              <p className="text-sm mb-1">
                <span className="font-bold">Birthdate:</span>{" "}
                {profile?.birthDate}
              </p>
              <p className="text-sm mb-1">
                <span className="font-bold">Gender (M):</span> {profile?.gender}
              </p>
              <p className="text-sm mb-1">
                <span className="font-bold">Blood Group:</span>{" "}
                {profile?.bloodGroup}
              </p>
              <p className="text-sm mb-1">
                <span className="font-bold">Height:</span> {profile?.height} cm
              </p>
            </div>
            <div className="bg-gray-100 text-lg p-6 rounded-lg">
              <h4 className="font-bold text-2xl mb-2">Company Details</h4>
              <p className="text-sm mb-1">
                <span className="font-bold">Department:</span>{" "}
                {profile?.company?.department}
              </p>
              <p className="text-sm mb-1">
                <span className="font-bold ">Designation:</span>{" "}
                {profile?.company?.title}
              </p>
              <p className="text-sm mb-1">
                <span className="font-bold ">Address:</span>{" "}
                {profile?.company?.address?.address},{" "}
                {profile?.company?.address?.city},{" "}
                {profile?.company?.address?.state}
              </p>
            </div>
            <div className="bg-gray-100 text-lg p-6 rounded-lg">
              <h4 className="font-bold text-2xl mb-2">Bank Details</h4>
              <p className="text-sm mb-1">
                <span className="font-bold ">Currency:</span>{" "}
                {profile?.bank?.currency}
              </p>
              <p className="text-sm mb-1">
                <span className="font-bold">IBAN:</span> {profile?.bank?.iban}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
