{{- /*
  A recipe's index.md, in agent skill format: front matter with `name` (the file name) and
  `description`, then the recipe as in llms-full.txt, then the API operations it uses and the
  documentation that links to it. Saved as <name>/SKILL.md, the file is a skill.
*/ -}}
{{- $usedIn := index (partialCached "recipes/index.html" site) .File.ContentBaseName -}}
---
name: {{ .File.ContentBaseName }}
description: {{ .Description | jsonify }}
---

{{ partial "llms-page.txt" . }}
{{- with partial "recipes/requires.html" . }}
## Before you start

Follow these recipes first:

{{ range . }}- [{{ .Title }}]({{ with .OutputFormats.Get "markdown" }}{{ .Permalink }}{{ end }})
{{ end }}
{{- end }}
{{- with partial "recipes/api-groups.html" . }}
## API reference
{{ range . }}
### {{ .title }}

Reference: {{ .root }}

{{ range .entries }}- [{{ .method }} {{ .path }}]({{ .url }}): {{ .title }}
{{ end }}
{{- end }}
{{- end }}
{{- with $usedIn }}
## Related documentation

{{ range . }}- [{{ replace .page.Title "var-product-c8y-iot" site.Params.product_c8y_iot }}{{ with .from }} > {{ replace . "var-product-c8y-iot" site.Params.product_c8y_iot }}{{ end }}]({{ .page.Permalink }}{{ with .anchor }}#{{ . }}{{ end }})
{{ end }}
{{- end }}
