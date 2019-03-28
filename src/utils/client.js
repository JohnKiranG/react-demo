
import { message } from 'antd';
import api from './api';


export const saveClient = async client => {
  let res = null;
  try {
    res = await api.post('client/', client);
    res = res.data;
    message.success('Saved Successfully.', [2]);
  } catch (error) {
    console.error(error);
    message.error('Failed to save the form.', [2]);
    throw error;
  }
  return res;
};

export const updateClient = async client => {
  let res = null;
  try {
    res = await api.put(`client/${client.id}`, client);
    message.success('Updated Successfully.', [2]);
  } catch (error) {
    console.error(error);
    message.error('Failed to save the form.', [2]);
    throw error;
  }
  return res;
};

export const fetchAppPlans = async () => {
  let res = null;
  try {
    res = await api.get('appPlan/');
    res = res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
  return res;
};

export const retrieveClientRolesByClientIdAndclientType = async (id, clientType) => {
  let res = null;
  try {
    res = await api.get(`clientRole/client/${id}/${clientType}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
  return res;
};
export const saveClientPlans = async clientPlans => {
  let res = null;
  try {
    res = await api.post('clientPlan/', clientPlans);
    message.success('Saved Successfully.', [2]);
  } catch (error) {
    console.error(error);
    message.error('Failed to save the form.', [2]);
    throw error;
  }
  return res;
};

export const retrieveClientRolePrivileges = async (id, clientType, isLicensee) => {
  let res = null;
  try {
    if (!isLicensee) {
      res = await api.get(`privilege/clientAndClientType/${id}/${clientType}`);
    } else {
      res = await api.get(`privilege/planPrivileges/${id}`);
    }
  } catch (error) {
    throw error;
  }
  return res;
};
// export const updateClientPlans = async clientPlans => {
//   let res = null;
//   try {
//     res = await api.put(`client/${client.id}`, client);
//     message.success('Updated Successfully.', [2]);
//   } catch (error) {
//     console.error(error);
//     message.error('Failed to save the form.', [2]);
//     throw error;
//   }
//   return res;
// };
export const retrieveCountries = async () => {
  let res = null;
  try {
    res = await api.get('mstrCtry/');
  } catch (error) {
    throw error;
  }
  return res;
};
