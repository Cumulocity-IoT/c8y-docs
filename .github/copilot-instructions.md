```markdown
# Cumulocity Documentation Style Guide - Copilot Instructions

## Primary Objective
Generate clear, comprehensive, and consistent software documentation for users and developers following Cumulocity standards.

## Writing Principles
1. **Clarity First**: Use simple, direct language. Break complex ideas into short sentences. Get to the point fast with key takeaways upfront.
2. **Global Audience**: Write for non-native English speakers. Avoid idioms, jargon, and cultural references.
3. **Human Voice**: Write conversationally but professionally. Read aloud to check flow.

## Grammar & Language Rules

### Capitalization
- **Default**: Sentence-style capitalization only (capitalize first word and proper nouns)
- **Never use**: Title Case Like This
- **UI Elements**: Capitalize first word only in headings, buttons, field names

### Voice & Tense
- **Use**: Active voice, present tense, second person (you)
- **Avoid**: Passive voice, future tense (will), past tense, first person (we)
- **Commands**: Use direct imperatives ("Click Save" not "You can click Save")

### Articles & Modifiers
- **Always include**: Articles (a, an, the) - don't skip for brevity
- **Avoid**: Modal verbs (can, may, might, should, could) - use direct statements
- **Position modifiers clearly** to avoid ambiguity

## Terminology Standards

### Prohibited Terms
- Replace "e.g." → "for example"
- Replace "i.e." → "that is"
- Replace "etc." → "and so on" or be specific
- Replace "blacklist" → "blocklist"
- Replace "please" → remove (except for support contacts)

### UI Element Formatting
- **Bold**: Buttons, field names, menu items, tabs ("Click **Delete**")
- **Italics**: File names, URLs, folder names (*database.txt*)
- **Code**: Code elements, parameters (`c8y_supportedOperations`)
- **Quotes**: User input, field values ("Enter 'admin' in the Username field")

### Specific Word Choices
- "select" (not choose) for dropdowns and checkboxes
- "click" (not "click on") for desktop actions
- "clear" (not uncheck) for checkboxes
- "delete" for permanent removal, "remove" for list removal
- "create" (not generate) for new objects

## Structure & Organization

### Headings
- Use sentence capitalization
- Structure: "To [action] [object]" for procedures
- Maximum 5 levels (use bold for deeper levels)

### Lists
- **Numbered**: For sequential procedures only
- **Bulleted**: For non-sequential items (max 7 items)
- **Punctuation**: Colon before list; periods only if items are complete sentences or mixed lengths

### Procedures
- Start with "To [accomplish task]" heading
- Single step: Use bullet point
- Multiple steps: Use numbered list
- End with result description (not as list item)
- Break procedures over 7 steps into sections

## Code & Technical Elements

### Code Formatting
- Specify language for syntax highlighting (```java, ```json, etc.)
- Use inline code (`backticks`) for parameters, variables, short code snippets
- Use code blocks for longer examples

### Links
- Use relative links within documentation
- Link text = target heading (no "click here")
- Introduce with "For details, see..." or "refer to..."

## Special Formatting

### Notes & Callouts
Use admonitions for:
- Important information
- Requirements
- Cautions
- Additional context

### Capitalization Rules
- **Data types**: lowercase (boolean, string, integer)
- **File types**: uppercase (JSON, ZIP, HTML)
- **Product names**: Follow official spelling
- **States/Permissions**: ALL CAPS (CRITICAL, READ, CREATE)

### Variables
- Use shortcodes for Cumulocity terms: {{< company-c8y >}}, {{< product-c8y-iot >}}
- Don't use in code examples unless sample names

## Content Organization Checklist

Before generating documentation:
1. ✅ Lead with most important information
2. ✅ Use headings to break up content
3. ✅ Keep paragraphs short (3-4 sentences max)
4. ✅ Use lists for multiple items or steps
5. ✅ End procedures with expected results
6. ✅ Include context before actions ("In the navigator, click...")

## Quality Check
For each piece of content, verify:
- Can a non-native English speaker understand this?
- Are instructions in logical order?
- Is formatting consistent with standards?
- Are all UI elements properly formatted in bold?
- Does it follow active voice and present tense?
```
