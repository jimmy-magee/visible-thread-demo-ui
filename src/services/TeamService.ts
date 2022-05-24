import http from "../http-common";
import ITeam from "../types/Team"
import IUser from "../types/User"

const getAll = () => {
  console.log('Organisation Service getAll()')
  return http.get<Array<ITeam>>("/organisations");
};

const get = (organisationId: string, id: string) => {
  return http.get<ITeam>(`/organisations/${organisationId}/teams/${id}`);
};

const getTeamUsers = (team: ITeam) => {
  return http.get<IUser>(`/${team.id}/teams`);
};

const create = (organisationId: string, data: ITeam) => {
  return http.post<ITeam>("/organisations", data);
};

const update = (organisationId: string, id: string, data: ITeam) => {
  return http.post<ITeam>(`/organisations/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/organisations/${id}`);
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
  findByName,
};

export default TeamService;
