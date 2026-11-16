{{- printf "\n**%s**\n\n%s\n" (.Get "title" | default "Details") (strings.Trim .Inner " \t\r\n") | safeHTML -}}
