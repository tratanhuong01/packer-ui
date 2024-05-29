import { FormEvent, useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

const Login = () => {
  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //
  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        if (username === "sysadmin" && password === "admin") {
          alert("Success");
        }
      }}
      className="w-80 -mt-16"
    >
      <p className="text-center font-bold text-3xl my-5">Login</p>
      <Input
        type="text"
        placeholder="Username"
        className="mb-3"
        value={username}
        handleChange={(e) => {
          setUsername(e);
        }}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        handleChange={(e) => {
          setPassword(e);
        }}
      />
      <Button
        handleClick={() => setLoading(true)}
        mode="primary"
        className="mt-2"
        type="submit"
        width={"100%"}
        disabled={!username || !password}
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
