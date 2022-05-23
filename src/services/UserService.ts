import http from "../http-common";
import IUser from "../types/User";

const getAll = () => {
  console.log('User Service getAll()')
  return http.get<Array<IUser>>("/teams");
};

const get = (id: any) => {
  return http.get<IUser>(`/6284993b76172b0235aac138/teams/${id}`);
};

const create = (data: IUser) => {
  return http.post<IUser>("/6284993b76172b0235aac138/teams", data);
};

const update = (id: any, data: IUser) => {
  return http.post<any>(`/6284993b76172b0235aac138/teams/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/6284993b76172b0235aac138/teams/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/suppliers`);
};

const findByTitle = (title: string) => {
  return http.get<Array<IUser>>(`/suppliers?title=${title}`);
};

const findByName = (title: string) => {
  return http.get<Array<IUser>>(`/suppliers?title=${title}`);
};

const UserService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
  findByTitle,
};

export default UserService;
