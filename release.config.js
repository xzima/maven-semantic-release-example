/*
 * Copyright © 2022 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
        ['@semantic-release/commit-analyzer', {
            preset: "conventionalcommits",
            releaseRules: [
                {breaking: true, release: 'major'},
                {revert: true, release: 'patch'},
                // Conventional Commits
                {type: 'feat', release: 'minor'},
                {type: 'fix', release: 'patch'},
                {type: 'perf', release: 'patch'},
                {type: 'docs', release: 'patch'},
                {type: 'build', release: 'patch'},
                {type: 'ci', release: 'patch'},
            ]
        }],
        ['@semantic-release/release-notes-generator', {
            preset: "conventionalcommits",
            presetConfig: {
                "types": [
                    {type: 'feat', section: '⭐ New Features'},
                    {type: 'fix', section: '🐞 Bug Fixes'},
                    {type: 'perf', section: '📈 Performance Improvements'},
                    {type: 'revert', section: '🔙 Reverts'},
                    {type: 'docs', section: '📔 Documentation'},
                    {type: 'style', section: 'Styles', hidden: true},
                    {type: 'chore', section: 'Miscellaneous Chores', hidden: true},
                    {type: 'refactor', section: 'Code Refactoring', hidden: true},
                    {type: 'test', section: 'Tests', hidden: true},
                    {type: 'build', section: '🔨 Build System'},
                    {type: 'ci', section: '⚙️ Continuous Integration'}
                ]
            }
        }],
        '@semantic-release/changelog',
        ['@semantic-release/exec', {prepareCmd, publishCmd, successCmd}],
        ['@semantic-release/git', {assets: '.'}],
        '@semantic-release/github',
    ]
}
