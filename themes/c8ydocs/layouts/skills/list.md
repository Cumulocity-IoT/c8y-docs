{{- /*
  The index.md of the skills root (/skills/) and of each topic (/skills/<topic>/): every skill
  with a link to its own index.md, grouped by topic on the root.

  Rendering the root also publishes the skills download: every skill as
  skills/download/cumulocity-skills/<skill name>/SKILL.md (skills/skill.txt), a README.md, and
  skills/download/manifest.json. The manifest lists all files, and per topic the files of the
  topic's skills, the skills they build on (`requires`), and the README. The download buttons
  (partials/skills/download.html, static/js/skills-download.js) zip them in the browser.
  Publish returns only an error, so each call sits in a `with`: in a plain-text template a bare
  call would print <nil> into this page.
*/ -}}
{{- $isRoot := eq .Path "/skills" -}}
{{- if $isRoot -}}
  {{- $root := "cumulocity-skills/" -}}
  {{- $files := slice -}}
  {{- range (where site.RegularPages "Section" "skills").ByWeight -}}
    {{- $file := printf "%s/SKILL.md" (partial "skills/skill-name.html" .) -}}
    {{- with (resources.FromString (printf "skills/download/%s%s" $root $file) (partial "skills/skill.txt" .)).Publish }}{{ errorf "publishing %s: %s" $file . }}{{ end -}}
    {{- $files = $files | append $file -}}
  {{- end -}}
  {{- with (resources.FromString (printf "skills/download/%sREADME.md" $root) (partial "skills/skills-readme.txt" .)).Publish }}{{ errorf "publishing the skills README: %s" . }}{{ end -}}
  {{- $files = $files | append "README.md" -}}
  {{- $topics := dict -}}
  {{- range .Sections.ByWeight -}}
    {{- $names := slice -}}
    {{- range .RegularPages.ByWeight -}}
      {{- $names = $names | append (partial "skills/skill-name.html" .) -}}
      {{- range partial "skills/requires.html" . -}}
        {{- $names = $names | append (partial "skills/skill-name.html" .) -}}
        {{- range partial "skills/requires.html" . }}{{ $names = $names | append (partial "skills/skill-name.html" .) }}{{ end -}}
      {{- end -}}
    {{- end -}}
    {{- $topicFiles := slice -}}
    {{- range uniq $names }}{{ $topicFiles = $topicFiles | append (printf "%s/SKILL.md" .) }}{{ end -}}
    {{- $topics = merge $topics (dict (path.Base .Path) (dict "title" .Title "files" ($topicFiles | append "README.md"))) -}}
  {{- end -}}
  {{- with (resources.FromString "skills/download/manifest.json" (dict "name" "cumulocity-skills" "root" $root "files" $files "topics" $topics | jsonify (dict "indent" "  "))).Publish }}{{ errorf "publishing the skills manifest: %s" . }}{{ end -}}
{{- end -}}
# {{ .Title }}

Source: {{ .Permalink }}

{{ partial "page-description.html" (dict "page" .) }}
{{ if $isRoot -}}
{{ range .Sections.ByWeight }}
## {{ .Title }}

{{ range .RegularPages.ByWeight -}}
{{- $url := .Permalink }}{{ with .OutputFormats.Get "markdown" }}{{ $url = .Permalink }}{{ end -}}
- [{{ .Title }}]({{ $url }}): {{ .Description }}
{{ end -}}
{{ end -}}
{{- else }}
{{ range .RegularPages.ByWeight -}}
{{- $url := .Permalink }}{{ with .OutputFormats.Get "markdown" }}{{ $url = .Permalink }}{{ end -}}
- [{{ .Title }}]({{ $url }}): {{ .Description }}
{{ end -}}
{{- end -}}
