---
allowed-tools: Bash(git checkout --branch:*), Bash(git add:*), Bash(git status:*), Bash(git push:*), Bash(git commit:*), Bash(gh pr create:*)
description: Commit, push, and open a PR
---

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`

## Your task

You should be on dev branch. Never commit directly to main. If you are on dev, 
create a PR to main.

If there are no changes, create a pull request using `gh pr create`

Otherwise, based on the above changes:
1. Create a single commit with an appropriate message
2. Push the branch to origin
3. Create a pull request using `gh pr create`
4. You have the capability to call multiple tools in a single response. You MUST do all of the above in a single message. Do not use any other tools or do anything else. Do not send any other text or messages besides these tool calls.