import Button from "../Button";
import Input from "../Input";

const Login = () => {
  return (
    <div className="w-full">
      <p className="my-2 text-gray-500">Welcome back!!!</p>
      <p className="font-bold text-5xl text-primary pb-10">Login</p>
      <div className="flex flex-col gap-2">
        <Input label="Email" required />
        <Input
          type="password"
          label="Password"
          required
          rightContent={{
            label: "Forget password?",
            handle: () => "",
          }}
        />
        <div className="justify-center flex mt-2">
          <Button icon="bx bx-log-in" mode="primary" width={100}>
            Login
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
      <p className="py-4 mt-5 text-gray-500 flex gap-2 items-center justify-center">
        <span>Don't have an account yet?</span>
        <span className="hover:underline text-primary cursor-pointer">
          Sign up for here
        </span>
      </p>
    </div>
  );
};

export default Login;
