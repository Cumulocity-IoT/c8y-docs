{{- /* The recipes overview as index.md: every recipe with a link to its own index.md. */ -}}
# {{ .Title }}

Source: {{ .Permalink }}

{{ partial "page-description.html" (dict "page" .) }}

{{ range .RegularPages.ByWeight -}}
{{- $url := .Permalink }}{{ with .OutputFormats.Get "markdown" }}{{ $url = .Permalink }}{{ end -}}
- [{{ .Title }}]({{ $url }}): {{ .Description }}
{{ end -}}
