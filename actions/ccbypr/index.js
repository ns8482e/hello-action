const core = require("@actions/core");
const github = require("@actions/github");
import { validatePR } from "./ccc";

try {

  const contextPullRequest = github.context.payload.pull_request;
  
  const title = contextPullRequest.title;
  const body = contextPullRequest.body;

  const prTitleRegexPattern = core.getInput("pr-title-regex");
  const prBodyRegexPattern = core.getInput("pr-body-regex");

  const client = new github.GitHub(process.env.GITHUB_TOKEN);

  const owner = contextPullRequest.base.user.login;
  const repo = contextPullRequest.base.repo.name;

  let result = null;
  let error = null;
  try{
    result = validatePR({
      title,
      body,
      prTitleRegexPattern,
      prBodyRegexPattern,
    });
  
  }catch(err){
    error = err;
  }
  
  console.log(result.message);

  let state = 'success';
  if(result && result.status === "success"){
    core.setOutput('success',true);
    state = 'success';
  }
  else{
    core.setOutput('success',false);
    state = 'failure';
  }
  
  await client.request(
    'POST /repos/:owner/:repo/statuses/:sha',
    {
      owner,
      repo,
      state,
      description,
      sha: contextPullRequest.head.sha,
      target_url: 'https://github.com/ns8482e/hello-action',
      context: contextName,
    },
  );

  if (error) {
    throw error;
  } else {
    console.log(`${state}: ${description}`);
  }

} catch (error) {
  core.setFailed(error.message);
}