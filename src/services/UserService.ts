import http from "../http-common";
import IUser from "../types/User"

const getAll = (organisationId: string) => {
  console.log('Organisation Service getAll()')
  return http.get<Array<IUser>>("/organisations/:organisationId/users");
};

const get = (organisationId: string, id: string) => {
  return http.get<IUser>(`/organisations/${organisationId}/users/${id}`);
};

const findByEmail = (organisationId: string, email: string) => {
  return http.get<IUser>(`/organisations/${organisationId}/users/${email}`);
};

const create = (organisationId: string, teamId: string, data: IUser) => {
  return http.post<IUser>("/organisations/${organisationId}/teams/${teamId}/users", data);
};

const update = (organisationId: string, id: string, data: IUser) => {
  return http.post<IUser>(`/organisations/${organisationId}/users/${id}`, data);
};

const remove = (organisationId: string, id: string) => {
  return http.delete<any>(`/organisations/${organisationId}/users/${id}`);
};

const UserService = {
  getAll,
  get,
  findByEmail,
  create,
  update,
  remove,
};

export default UserService;
