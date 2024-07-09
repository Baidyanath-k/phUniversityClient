import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const [login, { data, error }] = useLoginMutation();
  console.log(data);
  console.log(error);

  const onSubmit = (data) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    login(userInfo);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <label htmlFor="id">ID</label>
        <input type="text" id="id" {...register("id")} />
      </div>
      <div className="">
        <label htmlFor="password">password</label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
