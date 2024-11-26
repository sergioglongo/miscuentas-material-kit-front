import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserView } from 'src/sections/user/view';
import { getAllUsers } from 'src/services/api/apiClient';

// ----------------------------------------------------------------------

export default function Page() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((res: any) => {
      if(res?.success) {
        setUsers(res.result);
      }
      console.log("users", res);
    })
  },[]);
  useEffect(() => {
    if(users?.length > 0) {
      console.log("users en state", users);
    }
  },[users]);
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserView />
    </>
  );
}
