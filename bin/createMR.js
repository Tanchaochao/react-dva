#!/usr/bin/env node --harmony
const got = require('got');
const commandLineArgs = require('command-line-args');
const { execSync } = require('child_process');

const projectID = 8902234;
// eslint-disable-next-line
const approver_ids = [2303495, 2351126, 249888, 2572805, 2990907];
// eslint-disable-next-line
const approvals_before_merge = 1;

(async () => {
  const API_URL = 'https://gitlab.com/api/v4/';
  const optionDefinitions = [
    { name: 'token', alias: 'a', type: String }, // From user profile
    { name: 'from', alias: 'f', type: String }, // Feature branch name`
    { name: 'to', alias: 't', type: String }, // Release branch name
    { name: 'message', alias: 'm', type: String }, // Release branch name
  ];

  let sourceBranch = execSync('git rev-parse --abbrev-ref HEAD').toString();
  sourceBranch = sourceBranch.replace(/(\r\n\t|\n|\r\t)/gm, '');

  const options = commandLineArgs(optionDefinitions);

  if (options.from === undefined) {
    options.from = sourceBranch;
  }

  if (options.to === undefined) {
    options.to = 'master';
  }

  if (options.message === undefined) {
    options.message = `# 请求合并分支${options.from} 到 ${options.to} ${(new Date()).toLocaleTimeString()} #`;
  }
  const token = (options.token !== undefined) ? options.token
    : '7XJkPYUV8S3jLjcW6S6q';

  if (token === undefined) throw Error('Token undefined');

  // eslint-disable-next-line no-console
  console.log(options.message);

  const result = await got.post(`${API_URL}projects/${projectID}/merge_requests`, {
    headers: {
      'PRIVATE-TOKEN': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: projectID,
      source_branch: options.from,
      target_branch: options.to,
      title: options.message,
      remove_source_branch: true,
      target_project_id: projectID,
      source_project_id: projectID,
      approver_ids,
      approvals_before_merge,
    }),
  });

  if (result.statusCode === 201) {
    // eslint-disable-next-line no-console
    console.log('Created');
  } else {
    throw new Error(`${result.statusCode}: ${result.statusMessage}`);
  }
})();
