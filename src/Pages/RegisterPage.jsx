import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../Hooks/useForm.js";
import api from "../Services/api.js";
import Form from "../Components/Atoms/Form.jsx";
import Input from "../Styles/Input.js";
import ButtonSubmit from "../Components/Atoms/ButtonSubmit.jsx";
import SignPagesTemplate from "../Components/Templates/SignPagesTemplate.jsx";

function isAnyFieldEmpty({ email, password, user_name, photo }) {
  return (email === "" || password === "" || user_name === "" || photo === "");
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { form, handleForm } = useForm({
    email: "",
    password: "",
    user_name: "",
    photo: ""
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    if (isAnyFieldEmpty(form)) {
      alert("Preencha todos os campos!");
      return;
    }

    api.signup(form)
      .then(({ data }) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <SignPagesTemplate margin="274px">
      <Form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="e-mail"
          value={form.email}
          onChange={handleForm}
          maxLength={64}
          required
          data-test="email"
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
          data-test="password"
        />
        <Input
          name="user_name"
          type="text"
          placeholder="username"
          value={form.user_name}
          onChange={handleForm}
          minLength={3}
          maxLength={64}
          required
          data-test="username"
        />
        <Input
          name="photo"
          type="url"
          placeholder="picture url"
          value={form.photo}
          onChange={handleForm}
          required
          data-test="picture-url"
        />
        <ButtonSubmit disabled={isLoading} datatest="sign-up-btn">
          Sign Up
        </ButtonSubmit>
      </Form>
      <Link to="/" data-test="login-link">Switch back to log in</Link>
    </SignPagesTemplate>
  );
}