const cdk = require('aws-cdk-lib')
const lex = require('aws-cdk-lib/aws-lex')
const iam = require('aws-cdk-lib/aws-iam')
const { Construct } = require('constructs')




const lexRoleprops = {
    assumedBy: new iam.ServicePrincipal('lexv2.amazonaws.com'),
    description: " Role created by CDK to for Lexbot",
    roleName: 'CDKWorkshopRole',
    inlinePolicies: {
        Lexv2RunTimePolicy: new iam.PolicyDocument({
            statements: [new iam.PolicyStatement({
                actions: ['polly:SynthesizeSpeech', 'comprehend:DetectSentiment'],
                effect: iam.Effect.ALLOW,
                resources: ['*']

            }),
            new iam.PolicyStatement({
                actions: ["logs:GetLogEvents", "logs:PutLogEvents"],
                effect: iam.Effect.ALLOW,
                resources: ['*']

            }),



            ]

        }

        )
    }


}



const botLocaleprops = {
    botLocales: [{


    }],
    description: "Added by CDK",


}


class lexbot extends Construct {

    mylexrole;
    mylexbot;
    myBotLocale;

    constructor(scope, id, props) {
        super(scope, id)
        this.mylexrole = new iam.Role(this, id, lexRoleprops)

        this.mylexbot = new lex.CfnBot(this, 'MylexBot', {

            dataPrivacy: { ChildDirected: false },
            idleSessionTtlInSeconds: 300,
            name: 'LexbotCDK',
            roleArn: this.mylexrole.roleArn,
            botLocales: [{
                localeId: "en_US",
                nluConfidenceThreshold: 0.60,
                intents: [
                    {
                        name: 'FirstIntent',
                        description: 'description',
                        dialogCodeHook: { enabled: true },
                        fulfillmentCodeHook: { enabled: false, }
                    },
                    {

                        name: "FallbackIntent",
                        description: "Default intent when no other intent matches",
                        parentIntentSignature: "AMAZON.FallbackIntent",



                    }


                ] // end of intents

            }]

        }







        )
    }




}




module.exports = { lexbot }