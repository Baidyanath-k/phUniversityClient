import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { tokenVerify } from "../utils/tokenVerify";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useAppDispatch();

  const [login, { data, error }] = useLoginMutation();
  console.log(data);
  console.log(error);

  const onSubmit = async (data) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();

    const user = tokenVerify(res.data.accessToken);
    console.log(user);

    dispatch(setUser({ user: user, token: res.data.accessToken }));
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
