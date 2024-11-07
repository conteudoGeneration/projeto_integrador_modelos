import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { useContext, ReactNode } from "react";
import AuthContext from "../../contexts/AuthContext";


function Footer() {
  let data = new Date().getFullYear();

  const { usuario } = useContext(AuthContext);

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div className="flex justify-center bg-gradient-to-b from-emerald-600 to-emerald-900  text-white">
        <div className="container flex flex-col items-center py-4">
          <p className="text-xl font-bold">
            Aplicativo Fitness Generation | Copyright: {data}
          </p>
          <p className="text-lg">Acesse nossas redes sociais</p>
          <div className="flex gap-2">
            <a
              href="https://www.linkedin.com/school/generationbrasil"
              target="_blank"
            >
              <LinkedinLogo size={48} weight="bold" />
            </a>
            <a
              href="https://www.instagram.com/generationbrasil"
              target="_blank"
            >
              <InstagramLogo size={48} weight="bold" />
            </a>
            <a href="https://www.facebook.com/generationbrasil" target="_blank">
              <FacebookLogo size={48} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{component}</>;
}

export default Footer;
