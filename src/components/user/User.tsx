import React, { useState, useEffect, ChangeEvent } from "react";
import { RouteComponentProps, Link } from 'react-router-dom';

import UserDataService from "../../services/SupplierService";
import IUser from "../../types/User";

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

const User: React.FC<Props> = (props: Props) => {
  const initialUserState = {
    id: null,
    teamId: "",
    organisationId: "",
    firstname: "",
    lastname: "",
    email: "",
    published: false
  };
  const [currentUser, setCurrentUser] = useState<IUser>(initialUserState);
  const [message, setMessage] = useState<string>("");

  const getUser = (id: string) => {
    UserDataService.get(id)
      .then((response: any) => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

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
    UserDataService.update(currentUser.id, data)
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
    UserDataService.update(currentUser.id, currentUser)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The supplier was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });*/
  };

  const deleteUser = () => {
    console.log('Deleting team with id '+currentUser.id)
    UserDataService.remove(currentUser.id)
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
              <label htmlFor="title">User Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentUser.firstname}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentUser.lastname}
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
