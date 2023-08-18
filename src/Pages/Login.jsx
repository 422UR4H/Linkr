import { useState } from 'react';
import SignPagesTemplate from '../Components/Templates/SignPagesTemplate.jsx';
import Form from '../Components/Atoms/Form.jsx';
import Input from '../Styles/Input.js';
import useForm from '../Hooks/useForm.js';
import ButtonSubmit from '../Components/Atoms/ButtonSubmit.jsx';
import api from '../Services/api.js';
import useToken from '../Hooks/useToken.js';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '../Hooks/useUser.js';


export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { putUser } = useUser();
  const { form, handleForm } = useForm({ email: "", password: "" });
  const { login } = useToken();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    if (form.email === "" || form.password === "") {
      alert("Preencha todos os campos!");
      return;
    }

    api.signin(form)
      .then(({ data }) => {
        login(data);
        putUser(data);
        navigate("/timeline");
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <SignPagesTemplate margin="317px">
      <Form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="e-mail"
          value={form.email}
          onChange={handleForm}
          maxLength={64}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          value={form.password}
          onChange={handleForm}
          minLength={3}
          maxLength={32}
          required
        />
        <ButtonSubmit disabled={isLoading}>
          Log In
        </ButtonSubmit>
      </Form>
      <Link to="/sign-up">First time? Create an account!</Link>
    </SignPagesTemplate>
  );
}