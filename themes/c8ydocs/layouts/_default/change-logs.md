{{- /*
  The change logs as Markdown (change-logs/index.md), for the llms.txt Release notes spoke.
  Selects entries the way partials/change-logs-list.html does: the headless bundles of each
  product area (plus Edge on yearly releases), newest first, from date_settings.date on.
  On CD builds the HTML hides "Fix" entries by default, so they are left out here too.
*/ -}}
{{- $settings := site.Data.date_settings -}}
{{- $areas := slice "analytics" "application-enablement" "device-management" "platform-services" -}}
{{- if $settings.yearly_release }}{{ $areas = $areas | append "edge" }}{{ end -}}
{{- $entries := slice -}}
{{- range $areas }}{{ with site.GetPage (printf "/change-logs/%s" .) }}{{ $entries = $entries | union (.Resources.ByType "page") }}{{ end }}{{ end -}}
{{- $permalink := .Permalink -}}
# {{ .Title }}

Source: {{ .Permalink }}
Release: {{ $settings.version | default "Latest" }}
Description: Changes to the Cumulocity platform, newest first{{ if not $settings.yearly_release }}, excluding fixes{{ end }}, since {{ $settings.date.Format "January 2, 2006" }}.
{{ range where (sort $entries ".Date" "desc") "Date" "ge" $settings.date }}
  {{- $type := (index .Params.change_type 0).label -}}
  {{- if and (not $settings.yearly_release) (eq $type "Fix") }}{{ continue }}{{ end -}}
  {{- $facts := slice (printf "Date: %s" (.Date.Format "2006-01-02")) -}}
  {{- with .Params.product_area }}{{ $facts = $facts | append (printf "Product area: %s" .) }}{{ end -}}
  {{- $facts = $facts | append (printf "Change type: %s" $type) -}}
  {{- with .Params.component }}{{ $facts = $facts | append (printf "Component: %s" (index . 0).label) }}{{ end -}}
  {{- with .Params.build_artifact }}{{ $facts = $facts | append (printf "Build artifact: %s" (index . 0).label) }}{{ end -}}
  {{- with .Params.version }}{{ $facts = $facts | append (printf "Version: %s" .) }}{{ end -}}
  {{- with .Params.environment_availability }}{{ $envs := slice }}{{ range . }}{{ $envs = $envs | append .label }}{{ end }}{{ $facts = $facts | append (printf "Availability: %s" (delimit $envs ", ")) }}{{ end -}}
  {{- $body := partial "llms-absolute-links.txt" (dict "text" (string .RenderShortcodes) "permalink" $permalink) }}

## {{ replace .Title "var-product-c8y-iot" site.Params.product_c8y_iot }}

{{ delimit $facts " · " }}
Link: {{ $permalink }}#{{ replace .Name ".md" "" | urlize }}

{{ strings.Trim $body " \t\r\n" }}
{{ end -}}
