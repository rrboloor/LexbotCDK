const { Stack, Duration } = require('aws-cdk-lib');
const lexbotconsturct =require('./lex-constructs/lex-bot.js')

class CdkworkshopStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkworkshopQueue', {
    //   visibilityTimeout: Duration.seconds(300)
    // });
   const LexBot = new lexbotconsturct.lexbot(this,id,props)
  }
}

module.exports = { CdkworkshopStack }
