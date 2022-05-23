import http from "../http-common";
import ITeam from "../types/Team";

const getAll = () => {
  console.log('Team Service getAll()')
  return http.get<Array<ITeam>>("/teams");
};

const get = (id: any) => {
  return http.get<ITeam>(`/6284993b76172b0235aac138/teams/${id}`);
};

const create = (data: ITeam) => {
  return http.post<ITeam>("/6284993b76172b0235aac138/teams", data);
};

const update = (id: any, data: ITeam) => {
  return http.post<any>(`/6284993b76172b0235aac138/teams/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/6284993b76172b0235aac138/teams/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/suppliers`);
};

const findByTitle = (title: string) => {
  return http.get<Array<ITeam>>(`/suppliers?title=${title}`);
};

const findByName = (title: string) => {
  return http.get<Array<ITeam>>(`/suppliers?title=${title}`);
};

const TeamService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
  findByTitle,
};

export default TeamService;
