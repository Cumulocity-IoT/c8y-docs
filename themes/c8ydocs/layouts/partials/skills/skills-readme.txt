{{- /* Returns the README.md of the skills download (skills/list.md). Call with the skills section page. */ -}}
{{- $release := site.Data.date_settings.version | default "Latest" -}}
{{- $skills := slice -}}
{{- $landing := (site.GetPage "/sector/skills").Permalink -}}
{{- range (where site.RegularPages "Section" "skills").ByWeight -}}
  {{- $skills = $skills | append (printf "- `%s`: %s" (partial "skills/skill-name.html" .) .Description) -}}
{{- end -}}
{{- $auth := "" -}}
{{- with index (partialCached "skills/by-name.html" site) "authentication" }}{{ $auth = printf "`%s`" (partial "skills/skill-name.html" .) }}{{ else }}{{ errorf "the skills README refers to the skill authentication, which does not exist" }}{{ end -}}
{{- $text := printf `# Cumulocity skills

Agent skills from the Cumulocity documentation.

- Documentation release: %s
- Generated: %s
- Source: %s

## Skills

%s

## Install

Each folder that starts with %s is one skill with a SKILL.md file. Copy these folders to the skills directory of your AI agent:

- Codex, GitHub Copilot, Cursor, and Gemini CLI: %s for all your projects, or %s in a project.
- Claude Code: %s for all your projects, or %s in a project.
- Other agents that support the Agent Skills format: see the documentation of the agent.

## Credentials

The skills send requests to the Cumulocity REST API. Before you use them, set the following environment variables for your agent: %s (the URL of your tenant, without a trailing slash), %s, %s, and %s. The %s skill describes how the requests are authenticated.

## Updates

The skills reflect the documentation at the time of the download. To update them, download them again from %s.
` $release (now.Format "2006-01-02") $landing (delimit $skills "\n") "`cumulocity-`" "`~/.agents/skills/`" "`.agents/skills/`" "`~/.claude/skills/`" "`.claude/skills/`" "`C8Y_BASEURL`" "`C8Y_TENANT`" "`C8Y_USER`" "`C8Y_PASSWORD`" $auth $landing -}}
{{- return $text -}}
