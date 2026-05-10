---
name: multi-model-branch-review
description: "Use when: reviewing branch changes, running a multi-model or ensemble code review, checking the current branch for breaking changes, security risks, bugs, design fit, and code quality. Fetches the latest base branch, asks the user to choose at least two reviewer models, launches independent parallel reviews, then deduplicates results into a severity-ranked report."
argument-hint: "[base branch]"
---

# Multi-Model Branch Review

Review the current branch against a base branch using independent model reviewers, then consolidate the results into one deduplicated report.

## Workflow

### Step 1: Select The Models

Ask the user to pick reviewer models one at a time. Continue until the user chooses to start the review.

Use this first prompt:

```text
Select the first model for the review ensemble.
```

Suggested choices:

- claude-opus-4.6 (recommended)
- claude-opus-4.5
- claude-sonnet-4.6
- claude-sonnet-4.5
- claude-sonnet-4
- claude-haiku-4.5
- gpt-5.3-codex
- gpt-5.2-codex
- gpt-5.2
- gpt-5.1-codex-max
- gpt-5.1-codex
- gpt-5.1
- gpt-5.1-codex-mini
- gpt-5-mini
- gpt-4.1
- gemini-3-pro-preview

For each later prompt, show the selected models and only offer models that have not already been selected, plus a "Done - start review" option.

Require at least two models. If the user tries to start with only one model, explain that at least two reviewers are needed for cross-validation and ask again.

### Step 2: Prepare The Base Branch

Use the argument as the base branch when one is provided. Otherwise, use the repository default branch when it is known. If the default branch is unknown, try `origin/main`, then `origin/master`.

Fetch the latest base branch before reviewing:

```bash
git fetch origin <base-branch>
```

If the user wants the review to include the latest base changes, merge the fetched base into the current branch:

```bash
git --no-pager merge <base-ref> --no-edit
```

If merge conflicts occur, stop and report the conflicted files before continuing.

### Step 3: Collect The Diff

Collect a quick stat and the full review diff:

```bash
git --no-pager diff <base-ref> --stat
git --no-pager diff <base-ref> -- . ':!*.md'
```

Save the full diff to a temporary file for reviewer access. Summarize the key changes, including new files, modified files, and the overall change theme.

### Step 4: Launch Parallel Reviewers

Launch one independent code-review agent per selected model. Give every reviewer the same prompt so the outputs can be compared fairly.

Each reviewer prompt should include:

- Branch name
- Base branch or base ref
- Path to the saved diff file
- Summary of key changes
- Instruction to inspect the full diff and read key files directly
- Instruction to produce findings only when there is concrete evidence

Ask every reviewer to inspect the same dimensions:

1. Breaking changes: API contract changes, data format changes, backward compatibility
2. Security: input validation, predictability, credential handling, data exposure
3. Bugs and edge cases: logic errors, race conditions, missing guards, test gaps
4. Design fit: architecture, migration approach, local patterns, maintainability
5. Code quality: implementation correctness, error handling, readability, unnecessary complexity

### Step 5: Wait For Results

Wait for every reviewer to finish. If a reviewer times out, retry once with a longer wait. If it still fails, include the timeout in the final report and continue with the completed reviews.

### Step 6: Consolidate Findings

Produce a single report with this table:

| Severity | Finding | Models | Evidence | Suggested fix |
|---|---|---|---|---|

Group findings by severity:

- Critical / High: breaking changes, data loss, security vulnerabilities, disabled validations
- Medium: race conditions, edge cases, missing guards, low confidence behavior
- Low / Positive: minor suggestions, good patterns, things done well

Deduplicate aggressively:

- If two or more models report the same issue with the same root cause, merge it into one row and list all models.
- If only one model reports an issue, include it and mark the model that found it.
- If reviewers disagree, present both perspectives with a short note about the conflict.

### Step 7: Recommend Actions

End with a prioritized action list ordered by severity, confidence, and number of models that flagged each issue.

Keep the report focused. Do not include long model transcripts unless the user asks for them.
