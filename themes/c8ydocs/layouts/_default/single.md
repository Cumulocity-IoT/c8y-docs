{{- /* A page's index.md: the same Markdown as its entry in llms-full.txt. Pages that are not
     exportable render nothing, and Hugo writes no file for empty output. */ -}}
{{- if partialCached "llms-exportable.txt" . .Path }}{{ partial "llms-page.txt" . }}{{ end -}}
