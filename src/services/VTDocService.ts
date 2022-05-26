import http from "../http-common";
import IVTDoc from "../types/VTDoc"

const getVTDocsByTeamId = (organisationId: string, teamId: string) => {
  return http.get<Array<IVTDoc>>(`/vtdocs/${organisationId}/teams/${teamId}`);
};

const getVTDocsByUserId = (organisationId: string, userId: string) => {
  return http.get<Array<IVTDoc>>(`/vtdocs/${organisationId}/users/${userId}`);
};

const getVTDocById = (organisationId: string, userId: string, id:string) => {
  return http.get<Array<IVTDoc>>(`/vtdocs/${organisationId}/users/${userId}/${id}`);
};

const downloadVTDocById = (organisationId: string, userId: string, id:string) => {
  console.log('VTDocService download ', organisationId, userId, id)
  return http.get<any>(`/vtdocs/${organisationId}/users/${userId}/${id}/download`);
};

const get = (organisationId: string, id: string) => {
  return http.get<IVTDoc>(`/${organisationId}/teams/${id}`);
};

const create = (organisationId: string, data: IVTDoc) => {
  return http.post<IVTDoc>(`/${organisationId}/teams`, data);
};

const update = (organisationId: string, id: string, data: IVTDoc) => {
  return http.post<IVTDoc>(`/${organisationId}/teams/${id}`, data);
};

const remove = (organisationId: string, id: any) => {
  return http.delete<any>(`/${organisationId}/teams/${id}`);
};

const findByName = (organisationId: string, name: string) => {
  return http.get<Array<IVTDoc>>(`/${organisationId}/team/${name}`);
};

const VTDocService = {
  getVTDocsByTeamId,
  getVTDocsByUserId,
  getVTDocById,
  downloadVTDocById,
  get,
  create,
  update,
  remove,
  findByName,
};

export default VTDocService;
