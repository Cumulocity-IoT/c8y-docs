```markdown# Cumulocity documentation style guide - Copilot instructions

## Primary objective
Generate clear, comprehensive, and consistent software documentation for users and developers following Cumulocity standards.

## Writing principles
1. **Clarity First**: Use simple, direct language. Break complex ideas into short sentences. Get to the point fast with key takeaways upfront.
2. **Global Audience**: Write for non-native English speakers. Avoid idioms, jargon, and cultural references.
3. **Human Voice**: Write conversationally but professionally. Read aloud to check flow.

## Grammar & language rules

### Capitalization
- **Default**: Sentence-style capitalization only (capitalize first word and proper nouns)
- **Never use**: Title Case Like This
- **UI Elements**: Capitalize first word only in headings, buttons, field names

### Voice & tense
- **Use**: Active voice, present tense, second person (you)
- **Avoid**: Passive voice, future tense (will), past tense, first person (we)
- **Commands**: Use direct imperatives ("Click Save" not "You can click Save")

### Articles & modifiers
- **Always include**: Articles (a, an, the) - don't skip for brevity
- **Avoid**: Modal verbs (may, might, should, could) - use direct statements
- **Position modifiers clearly** to avoid ambiguity

## Structure & organization

### Headings
- Use sentence capitalization
- Structure: "To [action] [object]" for procedures
- Maximum 5 levels (use bold for deeper levels)

### Heading IDs
- If a heading has **no ID**, generate the correct ID.
- Create the ID using:
  - Use lowercase letters only
  - Use hyphens to separate words
  - Remove spaces, punctuation, and special characters
  - Match the heading text
  - Keep the ID stable to avoid broken links
Example:  
`### Tech community {#tech-community}`

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

### Sentence structure
- **Keep sentences short and simple** - avoid complex punctuation
- **End all sentences with periods**, even two-word sentences
- **Avoid semicolons** - rewrite as multiple sentences or lists instead
- **Use exclamation points sparingly** - only when truly emphasizing
- **Use question marks sparingly** - provide answers, don't ask questions


## Punctuation rules

### Serial (Oxford) commas
- **Always use** commas before final "and" or "or" in series of 3+ items
- ✅ "maps, images, graphs, tables, and other representations"
- ❌ "maps, images, graphs, tables and other representations"


### End punctuation - Skip when appropriate
**No periods on:**
- Titles and headings
- Subheadings  
- UI titles
- List items with 3 or fewer words
- Button names
- Field labels

### List punctuation
**Bulleted Lists:**
- **Colon** at end of introductory phrase
- **No periods** if all items are short phrases (≤3 words)
- **Periods after every item** if any item is a complete sentence
- **Periods after every item** if items complete the introductory phrase

Examples:

Select one of the following options:
• Default setting
• Current application  
• Current user

The system performs the following actions:
• It validates the input data.
• It processes the request.
• It returns the result.

## Terminology standards

### American English

Use American English (as opposed to British English). Use the standard spelling for American English.

### Abbreviations

Do not use the following abbreviations, which might not be familiar to non-native speakers and are often mixed up.

- Instead of **e.g.**, use
**for example** - This phrase is always followed by a comma.
**such as** - This phrase is an alternative to "for example". There is no comma after this phrase.

- Instead of **i.e.**, use
**that is**, **that means** - This phrase is always followed by a comma.

- Instead of **etc.**, use
**and so on** - This phrase is preceded by a comma. Do not combine this phrase with "for example", but choose either one.


### Prohibited terms

- Replace "blacklist" → "blocklist"
- Replace "clone" → "duplicate"
- Replace "please" → remove (except for support contacts)

### Specific word choices
- "select" (not choose) for dropdowns and checkboxes
- "click" (not "click on") for desktop actions
- "clear" (not uncheck) for checkboxes
- "delete" for permanent removal, "remove" for list removal
- "create" (not generate) for new objects

### Spelling of proper names

Always spell these proper names like this:

- Actility LoRa
- LoRa
- LWM2M
- MQTT
- OPC UA
- REST API
- SCADA
- SmartREST
- thin-edge.io
- WebSocket

Always spell these Cumulocity-specific proper names like this:

- Analytics Builder
- DataHub
- data broker
- data point
- data point library
- Digital Twin Manager
- managed object
- Private Preview
- Public Preview
- SmartREST
- smart rules
- Streaming Analytics


## Formatting standards

### Bold formatting
Use bold formatting for:
- UI elements: Buttons, field names, menu items, tabs ("Click **Delete**")
- Important terms on first use

### Italics formatting
Use italics for:
- File names, URLs, folder names (*database.txt*)

### Quotes
Use double quotes for:
- User input, messages, notifications, dialog text ("Operation completed successfully")
- Values in fields

### Code formatting
- Specify language for syntax highlighting (```java, ```json, etc.)
- Use inline code (`backticks`) for parameters, variables, short code snippets
- Use code blocks for longer examples

### Links
- Use relative links within documentation
- Link text = target heading (no "click here")
- Introduce with "For details, see..." or "refer to..."

## Special formatting

### Notes & callouts
Use admonitions for:
- Important information
- Requirements
- Cautions
- Additional context

### Capitalization rules
- **Data types**: lowercase (boolean, string, integer)
- **File types**: uppercase (JSON, ZIP, HTML)
- **Product names**: Follow official spelling
- **States/Permissions**: ALL CAPS (CRITICAL, READ, CREATE)

### Variables
- Use shortcodes for Cumulocity terms:
- Cumulocity (used as company name): {{< company-c8y >}}
- Cumulocity (used as product name): {{< product-c8y-iot >}}
- Cumulocity OpenAPI Specification: {{< openapi >}}
- Don't use shortcodes for Cumulocity in code examples unless sample names

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
