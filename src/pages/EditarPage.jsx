import {
  Form,
  useNavigate,
  useLoaderData,
  useActionData,
  redirect
} from "react-router-dom";
import { actualizarCliente, obtenerCliente } from "../data/clientes";
import Formulario from "../components/Formulario";
export async function loader({ params }) {
  const cliente = await obtenerCliente(params.clienteId);
  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "El Cliente no ha sido encontrado",
    });
  }
  return cliente;
}

export async function action({ request,params }) {

    const formData = await request.formData();
    const datos = Object.fromEntries(formData);
    const email = formData.get("email");
  
    const errores = [];
    if (Object.values(datos).includes("")) {
      errores.push("Todos los campos son obligatorios");
    }
    let regex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
  
    if (!regex.test(email)) {
      errores.push("El Email ingresado no es válido");
    }
  
    if (errores.length) {
      return errores;
    }
  
    await actualizarCliente(params.clienteId,datos);
    return redirect("/");
}

const EditarPage = () => {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores=useActionData()
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">
        Llena todos los campos parar registrar un nuevo cliente
      </p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => {
            navigate(-1);
          }}
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <Formulario cliente={cliente}></Formulario>
          <input
            type="submit"
            value="Guardar Cambios"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
          />
        </Form>
      </div>
    </>
  );
};

export default EditarPage;
