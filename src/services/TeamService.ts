import http from "../http-common";
import ITeam from "../types/Team"
import IUser from "../types/User"

const getAll = () => {
  return http.get<Array<ITeam>>("/teams");
};

const getAllByOrganisationId = (organisationId: string) => {
  return http.get<Array<ITeam>>(`/${organisationId}/teams`);
};

const get = (organisationId: string, id: string) => {
  return http.get<ITeam>(`/${organisationId}/teams/${id}`);
};

const create = (organisationId: string, data: ITeam) => {
  return http.post<ITeam>(`/${organisationId}/teams`, data);
};

const update = (organisationId: string, id: string, data: ITeam) => {
  return http.post<ITeam>(`/${organisationId}/teams/${id}`, data);
};

const remove = (organisationId: string, id: any) => {
  return http.delete<any>(`/${organisationId}/teams/${id}`);
};

const findByName = (organisationId: string, name: string) => {
  return http.get<Array<ITeam>>(`/${organisationId}/team/${name}`);
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
