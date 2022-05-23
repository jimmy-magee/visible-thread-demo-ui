import React, { useState, ChangeEvent } from "react";
import SupplierDataService from "../../services/SupplierService";
import ISupplierData from '../../types/Supplier';

const AddUser: React.FC = () => {
  const initialSupplierState = {
    id: null,
    name: "",
    description: "",
    published: false
  };
  const [supplier, setSupplier] = useState<ISupplierData>(initialSupplierState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const saveSupplier = () => {
    var data = {
      name: supplier.name,
      description: supplier.description
    };

    SupplierDataService.create(data)
      .then((response: any) => {
        setSupplier({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newSupplier = () => {
    setSupplier(initialSupplierState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newSupplier}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={supplier.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={supplier.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveSupplier} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
