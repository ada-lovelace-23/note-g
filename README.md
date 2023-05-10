# note-g

<img src="https://github.com/ada-lovelace-23/note-g/assets/23190882/0a8e62a8-3396-482a-b2e0-def19cc127b6" width="370"/>

note-g is an application the improves user experience during the initial interviews between Red Cross volunteers and users. It does so using innovative solution that enables interviewers to give the users their full attention with the need to take notes.

## Descripción del Proyecto

Reto: Cruz Roja


<img src="https://github.com/ada-lovelace-23/note-g/assets/23190882/d37605f3-c837-4740-8f38-1a51fd3477f9" width="150"/>

## The problem

La Cruz Roja trabaja con colectivos desfavorecidos y vulnerables a través de programas y servicios de ayuda humanitaria, asistencia social, salud y educación para mejorar su calidad de vida y promover la inclusión social.
Los procesos de acogida y valoración, que se realizan como primer contacto entre Cruz Roja y un usuario a través de una entrevista con formularios específicos puede tomar demasiado tiempo, lo que resulta en una desconexión visual con el usuario y puede crear un primer contacto frío. Este problema puede afectar negativamente la experiencia del usuario y reducir su participación en los programas y servicios de la ONG.

<img src="https://github.com/ada-lovelace-23/note-g/assets/23190882/2ec7c777-5924-4907-b689-e50bdd191298" width="850"/>

**Insights**

- Los usuarios tienen dificultad para abrirse y contar sus problemas cuando el entrevistador está registrando sus datos en un ordenador mientras hablan.
- Los usuarios no siempre saben hablar español
- Los entrevistadores tienen distintos niveles de conocimientos telemáticos y pueden tardar mucho en ingresar los datos manualmente.
- Las entrevistas no siempre se realizan en frente de un ordenador, a veces se recolectan los datos en papel.
- Si las informaciones brindadas por el entrevistado no se insertan de manera completa en la plataforma, los usuarios se encuentran a tener que repetir (y revivir) sus problemas más veces, cada vez que hablan con un voluntario o empleado. 

## Instalation

### Development Setup Overview

Take the following step to setup the app

- Clone the repository
- Reproduce the tech stack using the setup.yml Cloud Formation template.
- Create identity pool
- Create the .env file with project's credentials
- Install dependencies
- Set up the continuous integration between Amplify and the repository

### Clone the repository

Using terminal run `git clone git@github.com:ada-lovelace-23/note-g.git` to create a local copy of the repository.

### Set Up Amazon CloudFormation and Create Identity Pool

To run the stack using the AWS CLI:

1. Install and configure the AWS CLI following the instructions in the [AWS CLI User Guide](https://aws.amazon.com/cli/).
2. Open the AWS Command Console from the _./transcribe-streaming-app_ folder. **>>Where is this ./transcribe-streaming-app folder?<<**
3. Run the following command, replacing _STACK_NAME_ with a unique name for the stack and REGION-NAME with the region.\
`aws cloudformation create-stack --stack-name STACK_NAME --template-body file://setup.yaml --capabilities CAPABILITY_IAM --region REGION-NAME`\
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
19. Delete the existing content, and paste the code below into it.\
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

### Local Development Environment

- Install the required version of NodeJS\
`nvm install`\
`nvm use`
- Install dependencies\
`npm install`
- Create .env file from the .env.example
- Add GATSBY_REGION and GATSBY_IDENTITY_POOL_ID
- Start development environment\
`npm run dev (for development)`
- Open Amplify in AWS Console
- Create new web host application with the repository
- Set up the deployment branch
- Deploy :)

---

## Descripción de la Solución

note-g es una aplicación que mejora la experiencia del primer proceso de acogida a través de una solución innovadora que permite a los entrevistadores prestar atención completa al usuario sin tener que tomar notas en frente de él.

###Pros:

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

### Contras:

- no poder atender usuarios con idiomas no soportados (ej. ucraino)
- necesidad de conexión a internet
- El transcriptor necesita de más entrenamiento para perfeccionarse, sobre todo para los casos de reconocer a más de una persona en la misma grabación (ej. voluntario y usuario)

## Technical Overview

### AWS Services

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

### Tech stack

- JS SDK
- GatsbyJS
- MaterialUI
- React

### Dependencies

- React
- GatsbyJs
- @aws-sdk/client-cognito-identity
- @aws-sdk/client-comprehend
- @aws-sdk/client-transcribe-streaming
- @aws-sdk/client-translate
- @aws-sdk/credential-provider-cognito-identity
- MUI UI Kit
- Styled Components

## Proposal

### Main Benefits

- Reduce costs
- Scalable
- Easy implementation
- Takes in account accessibility
- Protección de datos

Tomando en cuenta los requisitos, hemos decidido utilizar una arquitectura ServerLess. Creemos que es la mejor apuesta por su coste reducido, nuestro conocimiento técnico, escalabilidad y su fácil reproducción por parte de la Cruz Roja.

Para el frontal hemos utilizado el framework GatsbyJs que nos permite hacer integración continua con Amplify y así subir el contenido estáticos a un bucket de S3.

Desde el frontal se atacan a los servicios Translate, Transcribe y Comprehend mediante la AWS JS SDK, pasando por Cognito para permitir la conexión y en un futuro la autenticación de los usuarios.

Hemos trabajado tomando en cuenta la arquitectura de react-components.

Pensando en agilizar el proceso de desarrollo, hemos aprovechado los ejemplos del repositorio aws-doc-sdk-examples.

Con esta propuesta, logramos que los gastos iniciales sean muy poco y que puedan ir aumentando según la proporción de su uso.

Con la finalidad de no guardar información sensible, no se ha planteado el uso de ningún servicio de almacenamiento de datos de los usuarios. La idea es que en un futuro sea implementado algún servicio de mensajería para compartir la información solo con los usuarios pertinentes de la Cruz Roja. De esta forma logramos que la implementación se pueda dar de forma rápida por la Cruz Roja.

No hemos utilizado la región España ya que los servicios Amplify, Transcribe y Translate todavía no están disponibles. 

## Possible Future Improvements

- Transcription of the audio in multiple channels to separate translations of the dialog between users and volunteer.
- Integration with Red Cross' IMAP platform.
- Creating custom language model to improve the transcription of domain-specific audio.
- Adding vocabulary filtering that would enable to remove or obscure personal details from the transcription.
- Employ real-time and post call analytics to provide insights such as sentiment, detected issues and category events. [Example](https://www.youtube.com/watch?v=2_ivTP-KlmI)
- Delivering and sharing the translation via email and disabling copy&paste to prevent leaking of the private data (depending on the needs of the organization).
- Deploy the service to different regions, ie. `eu-south2` when these AWS services become available in the region.

## Demo Video

[//Video Hackathon for Good (Iberia) 2023 - Note-g | Reto Cruz Roja](https://www.youtube.com/watch?v=KcD3vcG1Qms)

### Demo live

[https://www.note-g.online/](https://www.note-g.online/)

## Team Members

<table>
  <tr>
    <td>
![Agnese](https://github.com/ada-lovelace-23/note-g/assets/1313681/1d527be7-2af9-47c5-a6d4-140cd0a1ae21)
</td>
    <td>
![Honza](https://github.com/ada-lovelace-23/note-g/assets/1313681/23b4cc81-c2b7-4fed-a2c3-05a1a4e781f5)
</td>
    <td>
![Pedro](https://github.com/ada-lovelace-23/note-g/assets/1313681/b5f54eab-b0f2-45cb-81b9-883797f53ccf)

</td>
  </tr>
  <tr>
    <td>Agnese Miselli<br>agnese.miselli@gmail.com</td>
    <td>Jan Honza Pozivil<br>crs1138@me.com</td>
    <td>Pedro Salas<br>be.pdro@gmail.com</td>
  </tr>
</table>
