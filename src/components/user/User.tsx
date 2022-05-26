import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { RouteComponentProps, Link } from 'react-router-dom';

import UserService from "../../services/UserService";
import IUser from "../../types/User";
import VTDocService from "../../services/VTDocService";
import IVTDoc from "../../types/VTDoc";

interface RouterProps { // type for `match.params`
  organisationId: string;
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

const User: React.FC<Props> = (props: Props) => {
  const initialUserState = {
    id: null,
    organisationId: "",
    firstname: "",
    lastname: "",
    email: "",
    published: false
  };
  const [currentUser, setCurrentUser] = useState<IUser>(initialUserState);
  const [message, setMessage] = useState<string>("");
  const [organisationId, setOrganisationId] = useState<string>("");
  const [userVTDocs, setUserVTDocs] = useState<IVTDoc[]>([]);

  useEffect(() => {
      setOrganisationId(props.match.params.organisationId);
      getUser(props.match.params.organisationId, props.match.params.id);
      getUserVTDocs(props.match.params.organisationId, props.match.params.id)
    }, [props.match.params.id]);

  const getUser = (organisationId:string, id: string) => {
    UserService.get(organisationId, id)
      .then((response: any) => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const getUserVTDocs = (organisationId:string, id: string) => {
      VTDocService.getVTDocsByUserId(organisationId, id)
        .then((response: any) => {
          setUserVTDocs(response.data);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    };

  const downloadVTDocX = ( id: string ) => {
      console.log('Download VTDoc..',id, currentUser.id, organisationId);
      VTDocService.downloadVTDocById(organisationId, currentUser.id, id)
              .then((response: any) => {
                setMessage(response.data);
                console.log(response.data);
              })
              .catch((e: Error) => {
                console.log(e);
              });

  };

  const downloadVTDoc = (organisationId:string, userId:string, id: string) => {
      console.log('Download VTDoc..', organisationId);
      VTDocService.downloadVTDocById(organisationId, userId, id)
        .then((response: any) => {
          setUserVTDocs(response.data);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    };


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };


  const updatePublished = (status: boolean) => {
    var data = {
      id: currentUser.id,
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
      email: currentUser.email,
      published: status
    };
/*
    UserService.update(currentUser.id, data)
      .then((response: any) => {
        console.log(response.data);
        setCurrentUser({ ...currentUser, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });*/
  };

  const updateUser = () => {
   /*
    UserService.update(currentUser.id, currentUser)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The supplier was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });*/
  };

  const deleteUser = () => {
    console.log('Deleting user with id '+currentUser.id)
    UserService.remove(organisationId, currentUser.id)
      .then((response: any) => {
        props.history.push("/suppliers");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User</h4>
          <form>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                value={currentUser.firstname}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                value={currentUser.lastname}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentUser.published ? "Published" : "Pending"}
            </div>
          </form>


          {currentUser.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteUser}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateUser}
          >
            Update
          </button>



          {userVTDocs && userVTDocs.length > 0 &&
                                         <table className="min-w-full divide-y divide-gray-300">
                                                         <thead className="bg-gray-50">
                                                           <tr>
                                                             <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                               FileName
                                                             </th>
                                                             <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                               Uploaded
                                                             </th>
                                                             <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                               Word Count
                                                             </th>
                                                             <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                  Download
                                                             </th>
                                                           </tr>
                                                         </thead>
                                                         <tbody className="divide-y divide-gray-200 bg-white">
                                                           {userVTDocs.map((user, index) => (
                                                             <tr key={user.id}>
                                                               <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                 {user.fileName}
                                                               </td>
                                                               <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.wordCount}</td>
                                                               <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.dateUploaded}</td>
                                                               <td><button
                                                                               type="submit"
                                                                               className="badge badge-success"
                                                                               onClick={() => downloadVTDocX(user.id)}
                                                                               //onClick={() => downloadVTDoc(`${user.organisationId}`, `${user.teamId}`, `${user.userId}`, `${user.id}`)}
                                                                             >
                                                                               Download
                                                                             </button></td>
                                                             </tr>
                                                           ))}
                                                         </tbody>
                                                       </table>
                               }

 <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default User;
