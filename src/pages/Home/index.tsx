import React from "react";
import FormTextInput from "../../components/FormTextInput";
import InfoMessage from "../../components/InfoMessage";
import UserDisclosure from "../../components/UserDisclosure";
import Loader from "../../Loader";
import { useFetchUsers } from "./hooks";

const Home = () => {
  const { users, loading, error, isFound, searchStr, fetchUsers } =
    useFetchUsers();

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <h1 className="text-3xl font-bold">Hello Simple system!</h1>

      <div className="bg-white w-96 min-h-[600px] md:w-[480px] p-4 my-4">
        <FormTextInput
          onSubmit={(searchStr: string) => fetchUsers(searchStr)}
        />

        <div className="flex flex-col gap-5 mt-4 overflow-x-hidden overflow-y-auto h-[550px]">
          {loading && <Loader />}

          {!!users.length && (
            <span
              className="text-sm text-gray-500 mx-2"
              data-testid="show-user-name"
            >
              Showing users for &quot;{searchStr}&quot;
            </span>
          )}

          {!isFound && !error && <InfoMessage message="No users found" />}

          {error && <InfoMessage message="Error fetching users" />}

          {!loading &&
            users.map((user) => (
              <div key={user.id} className="flex flex-col mx-2">
                <UserDisclosure user={user} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
