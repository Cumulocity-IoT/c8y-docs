```markdown
# Cumulocity documentation guidelines

## Structure & organization

### Headings
- Use sentence capitalization
- Structure: "To [action] [object]" for procedures
- Maximum 5 levels (use bold for deeper levels)

### Heading IDs
- If a heading has **no ID**, generate the correct ID.
- If a heading **has an ID**, validate it and suggest a correction if it does not match the rules.
- Create the ID using:
  - Use lowercase letters only
  - Use hyphens to separate words
  - Remove spaces, punctuation, and special characters
  - Match the heading text
  - Keep the ID stable to avoid broken links

Example:  
`### Tech community {#tech-community}`


## Terminology standards
### Capitalization
When in doubt, don’t capitalize.

Use **sentence-style capitalization** as the default. This means:
- Capitalize only the **first word** of a heading, title, UI label (buttons, checkboxes), or a sentence in a text.

**Capitalization checklist**
- Lowercase everything except the first word in a UI label, phrase, heading, title, or sentence in a text.
- Capitalize proper nouns if spelled that way.
- Follow programming language conventions for keywords and syntax.
- Do not use uppercase for emphasis.

### Grammar
Use **articles** (a, an, and the).

For ease of comprehension and translation, include definite and indefinite articles (a, an, and the) in your writing.  
Do **not** omit articles for brevity — this applies even to headings and titles.

**Examples**

**DO:**

Create a child device

**DON'T:**

Create child device

### Abbreviations
- Replace "e.g." → "for example"
- Replace "i.e." → "that is"
- Replace "etc." → "and so on" or be specific
```

### Spelling

Use **standard American English spelling** throughout the documentation.

- Use American spelling instead of British spelling.
- Avoid mixing American and British variants within the same document.
- Follow American conventions for technical terminology unless a product name or API uses a specific spelling.

**Examples**

**DO (American English):**
- organize
- customize
- behavior
- analyze
- center

**DON'T (British English):**
- organise
- customise
- behaviour
- analyse
- centre

## Variables

Use variables (HTML short codes) for certain recurring terms to ensure consistency across the documentation.

The following terms must be replaced by their corresponding variables:

| Term                               | Short code                |
|-----------------------------------|----------------------------|
| **Cumulocity** (company name)     | `{{< company-c8y >}}`      |
| **Cumulocity** (product name)     | `{{< product-c8y-iot >}}`  |

Do not replace any instances of **"cumulocity"** that appear in:
- software file names (for example, `cumulocity.json`),
- links to examples or resources in GitHub,
- module names (for example, `com.apama.cumulocity.Measurement`),
- or anywhere in code samples in general.
