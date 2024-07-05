import Button from "../Button";
import Input from "../Input";

const Register = () => {
  return (
    <div className="w-full">
      <p className="my-2 text-gray-500">Welcome back!!!</p>
      <p className="font-bold text-5xl text-primary pb-10">Register</p>
      <div className="flex flex-col gap-2">
        <Input label="Email" required />
        <Input type="password" label="Password" required />
        <Input type="password" label="Confirm password" required />
        <div className="justify-center flex mt-2">
          <Button icon="bx bx-log-in" mode="primary" width={100}>
            Register
          </Button>
        </div>
      </div>
      <p className="text-center text-primary py-6">or continue with</p>
      <ul className="mx-auto flex gap-3 justify-center">
        <li
          className="bx bxl-google text-2xl px-6 py-1.5 rounded-full border border-solid border-gray-300 shadow-lg 
        hover:bg-primary hover:text-white cursor-pointer transition-all text-primary"
        ></li>
        <li
          className="bx bxl-github text-2xl px-6 py-1.5 rounded-full border border-solid border-gray-300 shadow-lg 
        hover:bg-primary hover:text-white cursor-pointer transition-all text-primary"
        ></li>
        <li
          className="bx bxl-facebook text-2xl px-6 py-1.5 rounded-full border border-solid border-gray-300 shadow-lg 
        hover:bg-primary hover:text-white cursor-pointer transition-all text-primary"
        ></li>
      </ul>
    </div>
  );
};

export default Register;
