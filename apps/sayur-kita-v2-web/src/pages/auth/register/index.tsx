import { useState, ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2";
import axios from "axios";

interface Register {
  name: string;
  email: string;
  password: string;
}

function Register() {
  const [credentials, setCredentials] = useState<Register>({
    name: "",
    email: "",
    password: "",
  });

  async function submitRegister(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        role: "user",
      });

      console.log(response);
      if (response) {
        Swal.fire({
          title: "Register success",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/users/products";
          }
        });
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      Swal.fire({
        title: "Failed to register",
        icon: "error",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/auth/register";
        }
      });
    }
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof Register
  ) => {
    setCredentials({
      ...credentials,
      [field]: e.target.value,
    });
  };

  return (
    <div className="w-screen h-screen bg-slate-300 flex flex-col justify-center items-center">
      <form
        onSubmit={submitRegister}
        className="w-1/2 h-auto rounded-md bg-white shadow-sm text-slate-700"
      >
        <div className="w-full h-full flex flex-col p-5 justify-center items-center space-y-5">
          <div className="flex flex-col space-y-3">
            <label className="font-semibold">Name</label>
            <input
              className="w-full h-10 p-3 text-slate-700 border"
              value={credentials.name}
              onChange={(e) => handleInputChange(e, "name")}
            />
          </div>
          <div className="flex flex-col space-y-3">
            <label className="font-semibold">Email</label>
            <input
              className="w-full h-10 p-3 text-slate-700 border"
              value={credentials.email}
              onChange={(e) => handleInputChange(e, "email")}
            />
          </div>
          <div className="flex flex-col space-y-3">
            <label className="font-semibold">Password</label>
            <input
              className="w-full h-10 p-3 text-slate-700 border"
              type="password"
              value={credentials.password}
              onChange={(e) => handleInputChange(e, "password")}
            />
          </div>
          <button
            type="submit"
            className="w-1/2 rounded-md bg-slate-700 text-white font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
