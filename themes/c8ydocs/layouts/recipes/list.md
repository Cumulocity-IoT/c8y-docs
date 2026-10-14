{{- /*
  The recipes overview as index.md: every recipe with a link to its own index.md.

  Rendering it also publishes the skills download: every recipe as
  recipes/skills/cumulocity-skills/<skill name>/SKILL.md (recipes/skill.txt), a README.md,
  and recipes/skills/manifest.json, which lists these files for the download button on the
  overview page (static/js/recipes-download.js zips them in the browser).
*/ -}}
{{- $root := "cumulocity-skills/" -}}
{{- $files := slice -}}
{{- range .RegularPages.ByWeight -}}
  {{- $file := printf "%s/SKILL.md" (partial "recipes/skill-name.html" .) -}}
  {{- (resources.FromString (printf "recipes/skills/%s%s" $root $file) (partial "recipes/skill.txt" .)).Publish -}}
  {{- $files = $files | append $file -}}
{{- end -}}
{{- (resources.FromString (printf "recipes/skills/%sREADME.md" $root) (partial "recipes/skills-readme.txt" .)).Publish -}}
{{- $files = $files | append "README.md" -}}
{{- (resources.FromString "recipes/skills/manifest.json" (dict "name" "cumulocity-skills" "root" $root "files" $files | jsonify (dict "indent" "  "))).Publish -}}
# {{ .Title }}

Source: {{ .Permalink }}

{{ partial "page-description.html" (dict "page" .) }}

{{ range .RegularPages.ByWeight -}}
{{- $url := .Permalink }}{{ with .OutputFormats.Get "markdown" }}{{ $url = .Permalink }}{{ end -}}
- [{{ .Title }}]({{ $url }}): {{ .Description }}
{{ end -}}
