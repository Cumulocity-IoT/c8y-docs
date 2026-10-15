{{- /*
  The skills overview as index.md: every skill with a link to its own index.md.

  Rendering it also publishes the skills download: every skill as
  skills/download/cumulocity-skills/<skill name>/SKILL.md (skills/skill.txt), a README.md,
  and skills/download/manifest.json, which lists these files for the download button on the
  overview page (static/js/skills-download.js zips them in the browser). Publish returns only
  an error, so each call sits in a `with`: in a plain-text template a bare call would print
  <nil> into this page.
*/ -}}
{{- $root := "cumulocity-skills/" -}}
{{- $files := slice -}}
{{- range .RegularPages.ByWeight -}}
  {{- $file := printf "%s/SKILL.md" (partial "skills/skill-name.html" .) -}}
  {{- with (resources.FromString (printf "skills/download/%s%s" $root $file) (partial "skills/skill.txt" .)).Publish }}{{ errorf "publishing %s: %s" $file . }}{{ end -}}
  {{- $files = $files | append $file -}}
{{- end -}}
{{- with (resources.FromString (printf "skills/download/%sREADME.md" $root) (partial "skills/skills-readme.txt" .)).Publish }}{{ errorf "publishing the skills README: %s" . }}{{ end -}}
{{- $files = $files | append "README.md" -}}
{{- with (resources.FromString "skills/download/manifest.json" (dict "name" "cumulocity-skills" "root" $root "files" $files | jsonify (dict "indent" "  "))).Publish }}{{ errorf "publishing the skills manifest: %s" . }}{{ end -}}
# {{ .Title }}

Source: {{ .Permalink }}

{{ partial "page-description.html" (dict "page" .) }}

{{ range .RegularPages.ByWeight -}}
{{- $url := .Permalink }}{{ with .OutputFormats.Get "markdown" }}{{ $url = .Permalink }}{{ end -}}
- [{{ .Title }}]({{ $url }}): {{ .Description }}
{{ end -}}
