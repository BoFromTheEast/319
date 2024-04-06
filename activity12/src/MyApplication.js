// netdId: Bhoo
// Name: Bo H. Oo
// Assignment: Activity 12

import React, { useState } from "react";
import { useForm } from "react-hook-form";

function MyApplication() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [dataF, setDataF] = useState({});
  const [viewer, setViewer] = useState(0);
  // const [viewer, setViewer] = useState(1);
  // const [viewer, setViewer] = useState(2);

  return (
    <div>
      {<Payment />}
      {<Summary />}
    </div>
  );

  // return (
  //   <div>
  //     {viewer === 1 && <Payment />}
  //     {viewer === 2 && <Summary />}
  //   </div>
  // );

  function Payment() {
    const onSubmit = (data) => {
      console.log(data); // log all data
      console.log(data.fullName); // log only fullname
      // update hooks
      setDataF(data);
      setViewer(1); // Assuming viewer is a property of data
    };
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("fullName", { required: true })}
            placeholder="Full Name"
          />
          {errors.fullName && (
            <p className="text-danger">Full Name is required.</p>
          )}

          <input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="Email"
          />
          {errors.email && <p className="text-danger">Email is required.</p>}

          <input
            {...register("creditCard", { required: true })}
            placeholder="Credit Card"
          />
          {errors.creditCard && (
            <p className="text-danger">Credit Card is required.</p>
          )}

          <input
            {...register("address", { required: true })}
            placeholder="Address"
          />
          {errors.address && (
            <p className="text-danger">Address is required.</p>
          )}

          <input {...register("address2")} placeholder="Address 2" />

          <input {...register("city", { required: true })} placeholder="City" />
          {errors.city && <p className="text-danger">City is required.</p>}

          <input
            {...register("state", { required: true })}
            placeholder="State"
          />
          {errors.state && <p className="text-danger">State is required.</p>}

          <input {...register("zip", { required: true })} placeholder="Zip" />
          {errors.zip && <p className="text-danger">Zip is required.</p>}

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  function Summary() {
    const updateHooks = () => {
      setViewer(2);
      setDataF(dataF);
    };
    return (
      <div>
        <h1>Payment summary:</h1>
        <h3>{dataF.fullName}</h3>
        <p>{dataF.email}</p>
        <p>{dataF.creditCard}</p>
        <p>{dataF.address}</p>
        <p>{dataF.address2}</p>
        <p>
          {dataF.city},{dataF.state} {dataF.zip}{" "}
        </p>
        <button onClick={updateHooks}>Submit</button>
      </div>
    );
  }
}
export default MyApplication;
