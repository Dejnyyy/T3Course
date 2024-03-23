import { NextPage } from "next";
import { useState } from "react";
import { api } from "@/utils/api";
import { set } from "zod";
import LoadingOverlay from "@/common/modules/components/LoadingOverlay/LoadingOverlay";

const SignUp: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const { mutateAsync, isPending } = api.user.register.useMutation();


  const signUp = async () => {
    console.log(email, password, surname, name, passwordCheck);

    if(password !== passwordCheck) {
      console.log("hesla se neshodují");
      return;
    }
    const response = await mutateAsync({
      email: email,
      password: password,
      name: name,
      surname: surname
    });
    if(response){
      console.log("User created");
    return;
    }
    setName("");
    setSurname("");
    setPasswordCheck("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
    <LoadingOverlay isPending={isPending} />
    <div className="flex h-full min-h-full w-full items-center justify-center bg-gray-800 text-white">
      <div className="flex min-h-[300px] flex-col gap-10 rounded-lg bg-gray-600 p-12 shadow-md">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="relative my-2">
              <input
                type="text"
                id="default-search"
                onChange={(parametr) => {
                  setName(parametr.target.value);
                }}
                value={name}
                className="w-full bg-gray-800 rounded-lg py-4 px-8 "
                placeholder="name"
                required
              />
            </div>
            <div className="relative my-2">
              <input
                type="text"
                id="surname"
                onChange={(parametr) => {
                  setSurname(parametr.target.value);
                }}
                value={surname}
                className="w-full rounded-lg py-4 px-8 bg-gray-800"
                placeholder="surname"
                required
              />
            </div>
          </div>
          <div className="relative my-2">
            <input
              type="text"
              id="email"
              onChange={(parametr) => {
                setEmail(parametr.target.value);
              }}
              value={email}
              className="w-full rounded-lg py-4 px-8 bg-gray-800"
              placeholder="e-mail"
              required
            />
          </div>
          <div className="relative my-2">
            <input
              type="password"
              id="default-search"
              className="w-full rounded-lg py-4 px-8 bg-gray-800"
              placeholder="password"
              required
              onChange={(parametr) => {
                setPassword(parametr.target.value);
              }}
              value={password}
            />
          </div>
          <div className="relative my-2">
            <input
              type="password"
              id="confpassword"
              className="w-full rounded-lg py-4 px-8 bg-gray-800"
              placeholder="Confirm Password"
              required
              onChange={(parametr) => {
                setPasswordCheck(parametr.target.value);
              }}
              value={passwordCheck}
            />
          </div>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={async () => {
            await signUp();
            console.log("sign in");
          }}
        >
          Sign In
        </button>
      </div>
    </div>
    </>
  );
};

export default SignUp;
