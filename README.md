## Descripción del Proyecto

Reto: Cruz Roja

El problema

La Cruz Roja trabaja con colectivos desfavorecidos y vulnerables a través de programas y servicios de ayuda humanitaria, asistencia social, salud y educación para mejorar su calidad de vida y promover la inclusión social.
Los procesos de acogida y valoración, que se realizan como primer contacto entre Cruz Roja y un usuario a través de una entrevista con formularios específicos puede tomar demasiado tiempo, lo que resulta en una desconexión visual con el usuario y puede crear un primer contacto frío. Este problema puede afectar negativamente la experiencia del usuario y reducir su participación en los programas y servicios de la ONG.




## Create the resources

You can create the AWS resources required for this cross-service example using either of the following:

- [The Amazon CloudFormation](#create-the-resources-using-amazon-cloudformation)
- [The AWS Management Console](#create-the-resources-using-the-aws-management-console)

### Create the resources using Amazon CloudFormation

To run the stack using the AWS CLI:

1. Install and configure the AWS CLI following the instructions in the AWS CLI User Guide.

2. Open the AWS Command Console from the _./transcribe-streaming-app_ folder.

3. Run the following command, replacing _STACK_NAME_ with a unique name for the stack.

```
aws cloudformation create-stack --stack-name STACK_NAME --template-body file://setup.yaml --capabilities CAPABILITY_IAM
```

**Important**: The stack name must be unique within an AWS Region and AWS account. You can specify up to 128 characters, and numbers and hyphens are allowed.

4. Open [AWS CloudFormation in the AWS Management Console](https://aws.amazon.com/cloudformation/), and open the **Stacks** page.

![ ](images/cloud_formation_stacks.png)

5. Choose the **Resources** tab. The **Physical ID** of the **IDENTITY_POOL_ID** you require for this cross-service example is displayed.

![ ](images/cloud_formation_resources_tab.png)

For more information on the create-stack command parameters, see the [AWS CLI Command Reference guide](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/create-stack.html), and the [AWS CloudFormation User Guide](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-cli-creating-stack.html).

### Create the resources using the AWS Management Console

####Create an unauthenticated user role 4. Open [AWS Cognito in the AWS Management Console](https://aws.amazon.com/cloudformation/), and open the _Stacks_ page. 5. Choose **Manage Identity Pools**. 6. Choose **Create new identity pool**. 7. In the **Identity pool name** field, give your identity pool a name. 7. Select the **Enable access to unauthenticated identities** checkbox. 8. Choose **Create Pool**. 9. Choose **Allow**. 10. Take note of the **Identity pool ID**, which is highlighted in red in the **Get AWS Credentials** section.

![ ](images/identity_pool_ids.png)

11.Choose **Edit identity pool**. 12. Take note of the name of the role in the **Unauthenticated role** field.

####Adding permissions to an unauthenticated user role 13. Open [IAM in the AWS Management Console](https://aws.amazon.com/iam/), and open the _Roles_ page. 14. Search for the unauthenticated role you just created. 15. Open the role. 16. Click the down arrow beside the policy name. 17. Choose **Edit Policy**. 18. Choose the **JSON** tab. 18. Delete the existing content, and paste the code below into it.

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

19. Choose **Review Policy**.
20. Choose **Save Changes**.

### Verify an email address on Amazon SES

Create and verify an email address in Amazon SES. For more information, see [Creating and verifying identities in Amazon SES](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html).
