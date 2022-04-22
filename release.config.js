// original https://github.com/semantic-release/semantic-release/issues/1231#issuecomment-1063671157
// const DOCKERHUB_REPO = process.env.DOCKERHUB_REPO
// const HEROKU_APP_NAME = process.env.HEROKU_APP_NAME

//----------------------------------------------------------------------------------------------------------------------

// see https://www.mojohaus.org/license-maven-plugin/
const prepareCmd = `
./mvnw -B com.mycila:license-maven-plugin:4.1:format org.codehaus.mojo:license-maven-plugin:2.0.0:add-third-party
`
const publishCmd = `
./mvnw -B clean license:check package
`
const successCmd = `
echo "::set-output name=new_release_published::true"
echo "::set-output name=new_release_version::\${nextRelease.version}"
echo "::set-output name=branch_type::\${branch.type}"
echo "::set-output name=branch_name::\${branch.name}"
`

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    debug: true,
    branches: [
        'master',
        {
            name: 'rc',
            prerelease: true,
        },
    ],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        ['@semantic-release/exec', {prepareCmd, publishCmd, successCmd}],
        ['@semantic-release/git', {assets: '.'}],
        '@semantic-release/github',
    ]
}
