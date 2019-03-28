import api from './api';

export const retrieveClientUserwithRolesAndPrivileges = async (id) => {
  let res = null;
  try {
    res = await api.get(`clientUser/rolesAndPrivileges/${id}`);
  } catch (error) {
    throw error;
  }
  return res;
};

export const createClientUser = async (clientUser) => {
  let res = null;
  try {
    res = await api.post('clientUser/', clientUser);
  } catch (error) {
    throw error;
  }
  return res;
};

export const updateClientUser = async (clientUser, deletedRoles) => {
  let res = null;
  const obj = {
    clientUser,
    deletedRoles,
  };
  try {
    res = await api.put(`clientUser/${clientUser.id}`, obj);
  } catch (error) {
    throw error;
  }
  return res;
};

const setClientUserRoles = (clientUserRoles, cur) => {
  if (clientUserRoles && clientUserRoles.length) {
    const loClientUserRoles = clientUserRoles.map((role) => {
      const clientUserRole = {
        clientRole: {
          id: role,
        },
      };
      cur.map(userRole => {
        if (userRole.clientRole.id === role) {
          clientUserRole.id = userRole.id;
        }
        return null;
      });
      return clientUserRole;
    });
    return loClientUserRoles;
  }
  return cur;
};

const setClientUserPrivileges = (clientUserPrivileges, cup) => {
  if (clientUserPrivileges) {
    const loClientUserPrivileges = clientUserPrivileges.map((prvlg) => {
      const clientUserPrivilege = {
        privilege: {
          id: prvlg,
        },
      };
      return clientUserPrivilege;
    });
    return loClientUserPrivileges;
  }
  return cup;
};

export const setUserDetails = (user, clientUser) => {
  const loClientUser = clientUser;
  const is2fa = '2faEnabled';
  loClientUser.firstName = user.firstName || clientUser.firstName;
  loClientUser.middleName = user.middleName || clientUser.middleName;
  loClientUser.lastName = user.lastName || clientUser.lastName;
  loClientUser.email = user.email || clientUser.email;
  loClientUser.title = user.title || clientUser.title;
  loClientUser.userName = user.userName || clientUser.userName;
  loClientUser.loginPassword = user.loginPassword || clientUser.loginPassword;
  loClientUser[is2fa] = user[is2fa] || clientUser[is2fa];
  loClientUser.clientUserRoles = setClientUserRoles(user.clientUserRoles, clientUser.clientUserRoles);
  loClientUser.clientUserPrivileges = setClientUserPrivileges(user.clientUserPrivileges, clientUser.clientUserPrivileges);
  return loClientUser;
};

export const getlogInDetails = (clientUser) => {
  const is2fa = '2faEnabled';
  const logInDetails = {
    userName: clientUser.userName,
    loginPassword: clientUser.loginPassword,
    is2faEnabled: clientUser[is2fa],
  };
  return logInDetails;
};

export const getPrivileges = (clientUser) => {
  const { clientUserRoles } = clientUser;
  const privileges = {
    clientUserRoles,
    clientUserPrivileges: clientUser.clientUserPrivileges,
  };
  return privileges;
};

export const getUserDetails = (clientUser) => {
  const userDetails = {
    firstName: clientUser.firstName,
    lastName: clientUser.lastName,
    middleName: clientUser.middleName,
    title: clientUser.title,
    email: clientUser.email,
  };
  return userDetails;
};

export const getClientUserRoleIds = (clientUserRoles) => {
  const clientUserRolesIds = clientUserRoles.map(cr => cr.id);
  return clientUserRolesIds;
};

export const getClientUserPrivilegeIds = (clientUserPrivileges) => {
  const clientUserPrivilegeIds = clientUserPrivileges.map(cup => cup.privilege.id);
  return clientUserPrivilegeIds;
};
