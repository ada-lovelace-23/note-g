import React from "react";
import Content from "../ui/Content/Content";
import Footer from "../ui/Footer";
import HeaderTags from "../ui/HeaderTags";

const TermsAndConditions = () => {
  
  return (
    <Content>
        <h1>TÉRMINOS DE USO</h1>
        <p>Al acceder a este sitio web, aceptas estar sujeto a estos Términos y Condiciones de Uso del sitio web, todas las leyes y regulaciones aplicables, y aceptas que eres responsable del cumplimiento de cualquier ley local aplicable. Si no estás de acuerdo con alguno de estos términos, se te prohíbe utilizar o acceder a este sitio. Los materiales contenidos en este sitio web están protegidos por las leyes aplicables de copyright y marcas registradas.</p>
        <p>DESCARGO DE RESPONSABILIDAD</p>
        <p>El servicio se proporciona "tal cual", no ofrece garantías, expresas o implícitas, y por la presente renuncia y niega todas las demás garantías, incluidas, entre otras, garantías implícitas o condiciones de comercialización, adecuación para un propósito particular, o no infracción de propiedad intelectual u otra violación de derechos. Además, esta web no garantiza ni hace ninguna representación sobre la precisión, los resultados probables o la confiabilidad del uso de los materiales en su sitio web o en cualquier otro sitio vinculado a este sitio.</p>
        <p>USO JUSTO</p>
        <p>Este servicio se proporciona bajo una política de uso justo. Los usuarios que abusen de este servicio serán bloqueados permanentemente.</p>
        <p>LIMITACIONES</p>
        <p>En ningún caso esta sitio web será responsable de daños (incluidos, entre otros, daños por pérdida de datos o de beneficios, o debido a la interrupción del negocio), que surjan del uso o la imposibilidad de usar los materiales en el sitio, incluso si este sitio web o un representante autorizado ha sido notificado oralmente o por escrito de la posibilidad de tales daños. Debido a que algunas jurisdicciones no permiten limitaciones en garantías implícitas o limitaciones de responsabilidad por daños consecuentes o incidentales, estas limitaciones pueden no aplicarse a ti.</p>
        <Footer />
    </Content>
  )
}

export default TermsAndConditions

export const Head = () => (
  <>
    <HeaderTags />
  </>
)
