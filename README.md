## Descripción del Proyecto

Reto: Cruz Roja


<img src="https://github.com/ada-lovelace-23/note-g/assets/23190882/d37605f3-c837-4740-8f38-1a51fd3477f9" width="150"/>

**El problema**

La Cruz Roja trabaja con colectivos desfavorecidos y vulnerables a través de programas y servicios de ayuda humanitaria, asistencia social, salud y educación para mejorar su calidad de vida y promover la inclusión social.
Los procesos de acogida y valoración, que se realizan como primer contacto entre Cruz Roja y un usuario a través de una entrevista con formularios específicos puede tomar demasiado tiempo, lo que resulta en una desconexión visual con el usuario y puede crear un primer contacto frío. Este problema puede afectar negativamente la experiencia del usuario y reducir su participación en los programas y servicios de la ONG.

<img src="https://github.com/ada-lovelace-23/note-g/assets/23190882/2ec7c777-5924-4907-b689-e50bdd191298" width="850"/>

**Insights**

- Los usuarios tienen dificultad para abrirse y contar sus problemas cuando el entrevistador está registrando sus datos en un ordenador mientras hablan.
- Los usuarios no siempre saben hablar español
- Los entrevistadores tienen distintos niveles de conocimientos telemáticos y pueden tardar mucho en ingresar los datos manualmente.
- Las entrevistas no siempre se realizan en frente de un ordenador, a veces se recolectan los datos en papel.
- Si las informaciones brindadas por el entrevistado no se insertan de manera completa en la plataforma, los usuarios se encuentran a tener que repetir (y revivir) sus problemas más veces, cada vez que hablan con un voluntario o empleado. 

## Instalación

### Crear Recursos

You can create the AWS resources required for this cross-service example using either of the following:

### Create the resources using Amazon CloudFormation

To run the stack using the AWS CLI:

1. Install and configure the AWS CLI following the instructions in the AWS CLI User Guide.

2. Open the AWS Command Console from the _./transcribe-streaming-app_ folder.

3. Run the following command, replacing _STACK_NAME_ with a unique name for the stack and REGION-NAME with the region.

aws cloudformation create-stack --stack-name STACK_NAME --template-body file://setup.yaml --capabilities CAPABILITY_IAM --region REGION-NAME

**Important**: The stack name must be unique within an AWS Region and AWS account. You can specify up to 128 characters, and numbers and hyphens are allowed.

4. Open Cloud Formation, and open the **Piles** page.

5. Choose the **Resources** tab. The **Physical ID** of the **IDENTITY_POOL_ID** you require for this cross-service example is displayed.

6. Choose **Manage Identity Pools**.

7. Choose **Create new identity pool**.

8. In the **Identity pool name** field, give your identity pool a name.

9. Select the **Enable access to unauthenticated identities** checkbox.

8. Choose **Create Pool**.

9. Choose **Allow**.

10. Take note of the **Identity pool ID**, which is highlighted in red in the **Get AWS 

11.Choose **Edit identity pool**. 

12. Take note of the name of the role in the **Unauthenticated role** field.

13. Open [IAM in the AWS Management Console](https://aws.amazon.com/iam/), and open the *Roles* page.

14. Search for the unauthenticated role you just created.

15. Open the role. 

16. Click the down arrow beside the policy name.

17. Choose **Edit Policy**.

18. Choose the **JSON** tab.

19. Delete the existing content, and paste the code below into it.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": ["mobileanalytics:PutEvents", "cognito-sync:*"],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": "ses:SendEmail",
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": "transcribe:StartStreamTranscriptionWebSocket",
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": "comprehend:DetectDominantLanguage",
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": "comprehend:BatchDetectKeyPhrases",
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": "translate:TranslateText",
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
```

20. Choose **Review Policy**.
21. Choose **Save Changes**.

## Frontend

- nvm use
- npm install
- create .env file from the .env.example
- add REGION and IDENTITY_POOL_ID 
- npm run dev (for development)
- Open Amplify in AWS Console
- Create new web host application with the repository
- Add this configuration in the compilation yml:
```yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - nvm install
        - nvm use
        # Install pnpm
        - corepack enable
        - corepack prepare pnpm@latest --activate
        # Avoid memory issues
        - export NODE_OPTIONS=--max-old-space-size=8192
        # Ensure node_modules are correctly included in the build artifacts
        - pnpm install
    build:
      commands:
        - pnpm run build
  artifacts:
    # IMPORTANT - Please verify your build output directory
    baseDirectory: /apps/frontend/public
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```
-Deploy :)

## Descripción de la Solución

<img src="https://github.com/ada-lovelace-23/note-g/assets/23190882/0a8e62a8-3396-482a-b2e0-def19cc127b6" width="250"/>

note-g es una aplicación que mejora la experiencia del primer proceso de acogida a través de una solución innovadora que permite a los entrevistadores prestar atención completa al usuario sin tener que tomar notas en frente de él.

**Pros**

- Es sencilla de usar
- Es escalable y browser-based, con costes muy reducidos de mantenimiento 
- No requiere instalación y puede ser utilizada desde ordenador, móvil o tablet
- Transfiere en tiempo real de audio a texto hasta 4 horas 
- Traduce en tiempo real desde más de 5 idiomas diferentes
- Evita que el entrevistador tenga que tomar apuntes en frente del usuario durante la entrevista, permitiendo prestar más atención y contacto visual
- Agilizar la comunicación con usuarios que no hablan español gracias al traductor integrado
- Hace que el usuario se sienta mejor escuchado y acogido, más cómodo para compartir sus problemas 
- Garantiza que quede todo registrado, reduciendo así la cantidad de veces que un usuario tiene que volver a contar sus problemas.
- Y finalmente, para Cruz Roja permite reducir el tiempo que el personal tiene que dedicar a data entry para poder realizar más entrevistas y poder así ayudar a más personas 

**Contras**

- no poder atender usuarios con idiomas no soportados (ej. ucraino)
- necesidad de conexión a internet
- El transcriptor necesita de más entrenamiento para perfeccionarse, sobre todo para los casos de reconocer a más de una persona en la misma grabación (ej. voluntario y usuario)

## Instalación

**Servicios AWS**

![AWS note-g diagram](https://github.com/ada-lovelace-23/note-g/assets/23190882/a0f29f29-eae2-4b44-9be2-b2a8e4ca0c8b)

- Amplify
- S3
- JS SDK
- Api Gateway
- Cognito
- Amazon Translate
- Amazon Transcribe
- Comprehend
- Cloudformation


**Tecnologías**

- JS SDK
- GatsbyJS
- MaterialUI
- React

## Descripción Técnica

**Requisitos**

- Coste reducido
- Escalable
- De implementación sencilla
- Tomar en cuenta accesibilidad
- Protección de datos

**Propuesta**

Tomando en cuenta los requisitos, hemos decidido utilizar una arquitectura ServerLess. Creemos que es la mejor apuesta por su coste reducido, nuestro conocimiento técnico, escalabilidad y su fácil reproducción por parte de la Cruz Roja.

Para el frontal hemos utilizado el framework GatsbyJs que nos permite hacer integración continua con Amplify y así subir el contenido estáticos a un bucket de S3.

Desde el frontal se atacan a los servicios Translate, Transcribe y Comprehend mediante la AWS JS SDK, pasando por Cognito para permitir la conexión y en un futuro la autenticación de los usuarios.

Hemos trabajado tomando en cuenta la arquitectura de react-components.

Pensando en agilizar el proceso de desarrollo, hemos aprovechado los ejemplos del repositorio aws-doc-sdk-examples.

Con esta propuesta, logramos que los gastos iniciales sean muy poco y que puedan ir aumentando según la proporción de su uso.

Con la finalidad de no guardar información sensible, no se ha planteado el uso de ningún servicio de almacenamiento de datos de los usuarios. La idea es que en un futuro sea implementado algún servicio de mensajería para compartir la información solo con los usuarios pertinentes de la Cruz Roja. De esta forma logramos que la implementación se pueda dar de forma rápida por la Cruz Roja.

No hemos utilizado la región España ya que los servicios Amplify, Transcribe y Translate todavía no están disponibles. 

**Dependencias principales**

- React
- GatsbyJs
- MUI UI Kit
- Styled Components
- @aws-sdk/client-cognito-identity
- @aws-sdk/client-comprehend
- @aws-sdk/client-transcribe-streaming
- @aws-sdk/client-translate
- @aws-sdk/credential-provider-cognito-identity

**Reproducción**

La reproducción se puede lograr en pocos pasos

- Se puede llegar a reproducir el stack utilizando el setup.yml (plantilla de cloudformaton) para la creación de una pila en cloudformation. 
- Crear una identity pool
- Instalar dependencias y crear fichero .env con las credenciales del proyecto (ver .env.example)
- Integración entre amplify y repositorio
- Configurar amplify para integración continua

**Propuesta de funcionalidades futuras:**

- Servicio de mensajería
- Funcionalidad para que no sea fácil la copia de los textos traducidos por los voluntarios
- Transcribir el audio de más de un canal y separar las traducciones que se muestran según si es usuario o voluntario
- Cambiar regiones de los servicios a España cuando estén disponibles
- Deshabilitar el botón para empezar a grabar hasta que se apruebe el uso del micrófono en el dispositivo

## Demo Vídeo

//video url

## Team Members

- Pedro Salas -  be.pdro@gmail.com
- Jan Pozivil -  crs1138@me.com
- Agnese Miselli - agnese.miselli@gmail.com

