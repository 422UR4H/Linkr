import { useState } from "react"

export default function useForm(initialForm) {
    const [form, setForm] = useState(initialForm);

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return { form, handleForm, setForm };
}