import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { IRepository, IUser } from "../../types/interfaces";
import RepositoryInfo from "../RepositoryInfo";
import ProfileInfo from "../ProfileInfo";
import Loader from "../../Loader";

import "./styles.scss";
import InfoMessage from "../InfoMessage";

interface IUserDisclosureProps {
  user: IUser;
}

const UserDisclosure = (props: IUserDisclosureProps) => {
  const { user } = props;
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUserClick = async (username: string, open: boolean) => {
    if (!open) {
      setRepositories([]);
      return;
    }

    setLoading(true);

    // fetch user details from github api
    try {
      const res = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=3&sort=created&order=desc`
      );
      const data = await res.json();
      setRepositories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="UserDisclosure w-full rounded-2xl bg-white"
      data-testid="user-disclosure"
    >
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className="UserDisclosure__button"
              onClick={() => handleUserClick(user.login, !open)}
            >
              <ProfileInfo
                imgSrc={user.avatar_url}
                alt={user.login}
                text={user.login}
              />

              <ChevronDownIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-gray-500`}
              />
            </Disclosure.Button>

            <Disclosure.Panel
              className={`UserDisclosure__panel ${
                loading ? "items-center" : "items-start"
              }`}
            >
              {loading ? (
                <Loader />
              ) : (
                <>
                  {repositories.map((repo) => (
                    <RepositoryInfo
                      key={repo.id}
                      name={repo.name}
                      description={repo.description}
                      link={repo.html_url}
                      stars={repo.stargazers_count}
                    />
                  ))}

                  {!repositories.length && (
                    <InfoMessage
                      message="No repositories found"
                      className="text-sm"
                    />
                  )}
                </>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default UserDisclosure;
