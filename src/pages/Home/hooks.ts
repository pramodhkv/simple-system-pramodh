import { useState } from "react";
import { IUser } from "../../types/interfaces";

export const useFetchUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isFound, setIsFound] = useState<boolean>(true);
  const [searchStr, setSearchStr] = useState<string>("");

  const fetchUsers = async (searchVal: string) => {
    setLoading(true);
    setError(false);
    setSearchStr(searchVal.trim());

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchVal || ""}&per_page=5`
      );
      const data = await response.json();

      if (response.status !== 200) {
        throw new Error("Error fetching users");
      }

      setIsFound(data.total_count > 0);
      setUsers(data.items || []);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, isFound, searchStr, fetchUsers };
};
