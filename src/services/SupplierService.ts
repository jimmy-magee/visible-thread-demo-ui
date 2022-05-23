import http from "../http-common";
import ISupplierData from "../types/Supplier";

const getAll = () => {
  console.log('Supplier Service getAll()')
  return http.get<Array<ISupplierData>>("/teams");
};

const get = (id: any) => {
  return http.get<ISupplierData>(`/6284993b76172b0235aac138/teams/${id}`);
};

const create = (data: ISupplierData) => {
  return http.post<ISupplierData>("/6284993b76172b0235aac138/teams", data);
};

const update = (id: any, data: ISupplierData) => {
  return http.post<any>(`/6284993b76172b0235aac138/teams/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/6284993b76172b0235aac138/teams/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/suppliers`);
};

const findByTitle = (title: string) => {
  return http.get<Array<ISupplierData>>(`/suppliers?title=${title}`);
};

const findByName = (title: string) => {
  return http.get<Array<ISupplierData>>(`/suppliers?title=${title}`);
};

const SupplierService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
  findByTitle,
};

export default SupplierService;
