const core = require('@actions/core')
const { execSync } = require('child_process')

// Support Functions
const createCatFile = ({ email, api_key }) => `cat >~/.netrc <<EOF
machine api.heroku.com
    login ${email}
    password ${api_key}
machine git.heroku.com
    login ${email}
    password ${api_key}
EOF`

// Input Variables
let heroku = {}
heroku.api_key = core.getInput('api_key')
heroku.email = core.getInput('email')
heroku.app_name = core.getInput('app_name')
heroku.process_type = core.getInput('process_type')
heroku.new_scale = core.getInput('new_scale')

// Program logic
try {
  execSync(createCatFile(heroku))
  console.log('Created and wrote to ~./netrc')

  execSync('heroku login')
  console.log('Successfully logged into heroku')

  execSync(`heroku ps:scale ${heroku.process_type}=${heroku.new_scale} -a ${heroku.app_name}`)

  core.setOutput(
    'status',
    `Successfully scaled to ${heroku.process_type}=${heroku.new_scale} in ${heroku.app_name}`,
  )
} catch (err) {
  core.setFailed(err.toString())
}