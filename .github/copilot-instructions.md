# GitHub Copilot Documentation Review Instructions

## CONTEXT: CUMULOCITY IOT DOCUMENTATION STANDARDS

When reviewing documentation, check against these Cumulocity IoT style guidelines and flag deviations.

## REVIEW TRIGGER PATTERNS

Respond to these comment patterns:
```javascript
// @review-doc → Review entire document against style guide
// @review-grammar → Focus on grammar and language rules
// @review-format → Focus on formatting and structure
// @review-terminology → Check word usage and spelling
```

## CORE WRITING PRINCIPLES TO VERIFY

### Voice and Tone Compliance
- ✅ **Second person** ("you") used to address reader
- ✅ **Present tense** and **active voice** consistently used
- ✅ **Short, simple sentences** (avoid complex punctuation)
- ✅ **Conversational tone** - sounds natural when read aloud
- ✅ **Direct approach** - key information presented first

### Language Standards Compliance
- ✅ **American English** spelling (not British)
- ✅ **Articles included** (a, an, the) - not omitted for brevity
- ✅ **Simple tenses** used (avoid "will", "was", "-ed" endings)
- ✅ **Direct verbs** used (avoid "can", "may", "might", "should", "could")
- ✅ **"For example"** used instead of "e.g."
- ✅ **"That is"** used instead of "i.e."

## FORMATTING COMPLIANCE CHECKLIST

### Text Formatting Standards
| Element | Required Format | Flag If Different |
|---------|----------------|-------------------|
| UI buttons/fields | **Bold** | Any other formatting |
| File names/URLs | *Italics* | Bold or code formatting |
| Code elements | `Inline code` | Italics or bold |
| User input values | "Quotes" | Any other formatting |
| Menu items | **Bold** | Plain text or other |
| Icons | Plain text + "icon" | Bold or other emphasis |

### Capitalization Compliance
- ✅ **Sentence case for headings** - only first word capitalized
- ❌ Flag Title Case Like This
- ✅ **UI elements in sentence case** - **User management** not **User Management**
- ✅ **List items start with capital** unless command/code

## TERMINOLOGY COMPLIANCE

### Required Terms (Flag If Different)
- ✅ "username" ❌ "user name"
- ✅ "email" ❌ "e-mail"
- ✅ "log in" (verb) / "login" (noun) ❌ Mixed usage
- ✅ "set up" (verb) / "setup" (noun) ❌ Mixed usage
- ✅ "checkbox" ❌ "check box"
- ✅ "dropdown" ❌ "drop-down"
- ✅ "blocklist" ❌ "blacklist"

### Prohibited Terms (Always Flag)
- ❌ "please" in instructions
- ❌ "click here" (be specific about destinations)
- ❌ "e.g." and "i.e."
- ❌ "abort" (use "stop", "cancel", "end")
- ❌ Modal verbs in direct instructions

### Cumulocity-Specific Terms
- ✅ "Device Management application" ❌ "Device Management app"
- ✅ "Management tenant" ❌ "management tenant"
- ✅ Use shortcodes like `{{< product-c8y-iot >}}` when available

## PROCEDURE STRUCTURE COMPLIANCE

### Single-Step Procedures
- ✅ Use bullet point, not numbered list
- ✅ Start with "To [action]" heading

### Multi-Step Procedures  
- ✅ Use numbered lists for 2+ steps
- ✅ Location specified before action ("In the **Navigator**, click...")
- ✅ Result statement after procedure (not numbered)
- ✅ Split procedures over 7 steps into sections

### Form Instructions
- ✅ Don't repeat obvious field names
- ✅ Use tables for complex parameter lists

## PUNCTUATION COMPLIANCE

### General Rules
- ✅ **Serial commas** used ("A, B, and C")
- ✅ **No end punctuation** on headings, short list items
- ✅ **Periods on sentences**, even if only two words

### List Punctuation
- ✅ **Colon before lists**
- ✅ **No periods** if all items are short phrases (≤3 words)
- ✅ **Periods on all items** if any item is complete sentence

## GRAMMAR COMPLIANCE

### Voice and Person
- ✅ **Active voice**: "Click **Save**" ❌ "**Save** should be clicked"
- ✅ **Second person**: "You can configure..." ❌ "Users can configure..."
- ✅ **Present tense**: "The system displays..." ❌ "The system will display..."

### Common Issues to Flag
- ❌ Misplaced modifiers ("Only the selected device" not "The selected device only")
- ❌ Ambiguous -ing words
- ❌ Gendered pronouns in generic references
- ❌ First person plural ("we") - keep focus on user

## STRUCTURAL COMPLIANCE

### Organization Standards
- ✅ **Heading hierarchy** properly structured (no skipped levels)
- ✅ **Lists under 7 items** or broken into sections
- ✅ **Tables for complex data** presentation
- ✅ **Code blocks** properly language-tagged

### Link Standards
- ✅ **Descriptive link text** (not "click here")
- ✅ **Relative links** for internal documentation
- ✅ **Link text matches target heading**

## REVIEW OUTPUT FORMAT

When reviewing, provide feedback in this structure:

```markdown
## Documentation Review Results

### ✅ Compliant Areas
- [List what follows guidelines correctly]

### ❌ Issues Found
- [Specific violations with line references]
- [Suggested corrections]

### 💡 Improvement Suggestions
- [Optional enhancements for clarity]

### 📋 Quick Fixes Needed
- [ ] Fix capitalization in headings
- [ ] Replace "e.g." with "for example"
- [ ] Add missing articles (a, an, the)
- [ ] Format UI elements in bold
```

## SEVERITY LEVELS

- 🔴 **Critical**: Violates core principles (wrong voice, tense, formatting)
- 🟡 **Important**: Terminology or style inconsistencies  
- 🟢 **Minor**: Suggestions for improvement

Focus reviews on critical and important issues first.
