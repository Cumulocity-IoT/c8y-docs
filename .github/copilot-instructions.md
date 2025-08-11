# Introduction {#introduction}

This **Documentation style guide** provides guidelines for writing clear, comprehensive, and consistent software documentation for users and developers.

These guidelines are not written in stone, as there is always more than one truth. Changes or deviations may be required if this improves your content.

## Third-party references {#third-party-references}

If this Documentation style guide does not provide explicit guidance, follow these 3rd-party references:

* For non-technical language and grammar guidance:  [The Chicago Manual of Style](https://www.chicagomanualofstyle.org/home.html)   
* For technical style guidance:  
  * the [Google developer documentation style guide](https://developers.google.com/style)  
  * the [Microsoft Writing Style Guide](https://docs.microsoft.com/style-guide/welcome/)

Note that Google and Microsoft guidelines are specific to their products and doe not always match our needs.


# Major principles {#major-principles}

Use these checklists for high-level guidance at a glance. For detailed guidance, see the related articles.

## Writing & content {#writing-&-content}

**Write simple and keep it clear**

* **Simpler is better.** Everyone likes clarity and getting to the point. Break it up. Layer. Short sentences and fragments are easier to scan and read. Prune every excess word.  
* **Get to the point fast.** Start with the key takeaway. Put the most important thing in the most noticeable spot. Make choices and next steps obvious. Give people just enough information to make decisions confidently.

**Stay human**

* **Write like you speak.** Read your text aloud. Avoid jargon and overly complex or technical language. It should sound like a friendly conversation.   
* **Be helpful.** Cumulocity is a big place. It might be easy for people to get confused on some occasions. We show customers we’re on their side. We anticipate their real needs and offer great information at just the right time.

**Write global**

* Even if you are writing in English, remember that our customers are global. It's safe to assume your content will be read in many countries and by readers whose primary language isn't English.  
* Consider the worldwide implications of what you write.

## Language & grammar {#language-&-grammar}

**When in doubt, don’t capitalize**  
Default to sentence-style capitalization \- capitalize only the first word of a heading or phrase and any proper nouns or names. Never Use Title Capitalization (Like This). Never Ever.

**Use articles (a, an, and the)**  
For ease of comprehension and translation, include definite and indefinite articles (a, an, and the) in your writing. Don't skip articles for brevity, including in headings and titles. [Learn more](#articles-(a,-an,-the)).

**Use simple tenses**  
Use present-tense verbs \- verbs that indicate the action is happening now, like *is* and *open*. Avoid *will*, *was*, and verbs ending in *\-ed*, which indicate that text isn't in the present tense. [Learn more](#tense-of-verbs).

**Use direct verbs**  
For most content, write simple statements of facts. Use direct commands for procedures and instructions. Avoid expressing wishes, hypotheses, and suggestions by using modal verbs (*can*, *may*, *might*, *should*, *could*). [Learn more](#mood-of-verbs).

**Use active voice**  
Use active voice (where the subject performs the action) whenever you can. In passive voice, the receiver of the action is the subject. [Learn more](#voice-of-verbs).

**Use second person**  
Use second person most of the time. Second person often uses the pronoun you, as though you're speaking to the customer. [Learn more](#person).

## Spelling & terminology {#spelling-&-terminology}

**Use standard American spelling**  
Use American English (as opposed to British English). Use the standard spelling for American English. If the term that you're looking for isn't on the word list, check our preferred resource for standard American English:  [Merriam-Webster](https://www.merriam-webster.com/).

**Check the word list**  
For usage and spelling of specific words, see the [Word list](#word-list).

**Proper nouns**  
Consider the correct and consistent spelling of proper nouns. If you are unsure about the spelling, refer to the respective manufacturer's website. See [Proper nouns](#proper-nouns) for the spelling of frequently used proper nouns.

**Avoid unfamiliar abbreviations**  
Do not use the abbreviations  *e.g.* and  *i.e.*, which might not be familiar to non-native speakers and are often mixed up. Use *for example* and *that is*, respectively instead. [Learn more](#abbreviations).

**Avoid unfamiliar acronyms**  
Although some acronyms are widely understood and preferred to the spelled-out term, others aren’t well known or are familiar only to a specific audience. [Learn more](#acronyms).

**Use shortcodes**   
Support white-labeling by using variables (so-called short codes) for Cumulocity-specific terms such as the company name and product names wherever possible. [Learn more](#variables).


## Organization & formatting {#organization-&-formatting}

**Keep the sentence structure simple**  
Stick to short, simple sentences. Sentences that contain lots of punctuation tend to be complex and hard to read. Try to rewrite such sentences as multiple sentences or break them into lists.

**Remember the last comma**  
Include commas after every item in a series, including the last one.

**Skip periods (and : \! ?)**  
Skip end punctuation on titles, headings, subheadings, UI titles, and items in a list that are three or fewer words.

**Structure content with lists & tables**

* Use [numbered lists](#numbered-lists) for procedures.   
* Use [bulleted lists](#bulleted-list) for most other lists.   
* Use [tables](#tables) for presenting more complex data.

**Use consistent formatting**

* Use [bold formatting](#bold) for all UI elements that have labels, such as buttons, fields, or views. Sparely use bold formatting for pure emphasis.   
* Use [italics](#italics) for file and folder names, and URLs. Do not use code formatting instead.  
* Use [code](#code) formatting to highlight code snippets either in separate code blocks or as inline text.

# Grammar {#grammar}

This section lists a collection of grammar rules that we follow in the Cumulocity documentation. For general information on English grammar, refer to [The Chicago Manual of Style](https://www.chicagomanualofstyle.org/home.html).

## Ambiguity {#ambiguity}

### Words ending in \-ing {#words-ending-in--ing}

A word ending in –ing can be a verb, a noun, or an adjective. Use –ing words with care. The sentence should make it clear which role the word plays.

For example, in the phrase *meeting requirements*, make sure it's clear whether this is a discussion about requirements for a meeting or how to meet requirements.

### Misplaced modifiers {#misplaced-modifiers}

Modifiers are single words or phrases that modify other words or phrases. Position a modifier to make it clear what it modifies.

If you keep sentences short and simple and use active voice, you probably won’t run into dangling or misplaced modifiers.

**Examples**  
DO:  
*Only the selected device is removed.*  
DON´T:  
*The selected device only is removed.*

*Only* could modify *is removed* or *text*. This sentence could mean one of two things:

* The selected parent device isn´t deleted.  
* The device is removed but not deleted.

## Articles (a, an, the) {#articles-(a,-an,-the)}

For ease of comprehension and translation, include definite and indefinite articles (*a*, *an*, and *the*) in your writing. Don't skip articles for brevity, including in headings and titles.

**Examples**  
DO:  
*Create a child cevice*  
DON´T:  
*Create child device*

## Capitalization {#capitalization}

Use sentence-style capitalization as default. That means: Capitalize the first word of a sentence, heading, title, UI label (such as the name of a button or checkbox), or standalone phrase.

### Capitalization checklist {#capitalization-checklist}

* Lowercase everything except the first word in a sentence, UI label, phrase, heading, or title (including the titles of blogs, articles, and press releases).  
* Capitalize proper nouns if spelled that way.  
* Don’t capitalize the spelled-out form of an acronym unless it's a proper noun.  
* In programming languages, follow the traditional capitalization of keywords and other special terms.  
* Don't use all uppercase for emphasis.  
* Don't use all lowercase as a design choice.

## Person {#person}

In grammar, person refers to the point of view represented by a statement and determines which pronoun to use.

### Use the second person {#use-the-second-person}

To directly address the reader, use the second-person pronoun (*you*/*yours*). In the second person, you write as if you're speaking to the reader.

**Examples**

* *Check if you have the required permission.*  
* *Depending on your choice, some features may be turned off by default.*

### Avoid the first person {#avoid-the-first-person}

First-person plural, which often uses the pronoun *we*, can feel like a daunting corporate presence. Try to keep the focus on the customer, not Cumulocity.

It's OK to use phrasing like *we recommend* if it helps you avoid awkward phrasing like *it's recommended*, but write around it if you can.

## Pronouns and gender {#pronouns-and-gender}

Don't use gendered pronouns in generic references. Instead, rewrite \- for example, use the second person (*you*).

Or refer to a person's role (*customer, user,* or *administrator*).

*They* can be used as a non-binary pronoun for a singular person instead of a binary pronoun (*she* or *he*).

## Verbs {#verbs}

### Tense of verbs {#tense-of-verbs}

In the present tense, the action is happening now. The present tense is often easier to read and understand than the past or future tense. It’s the best choice for most content.

Avoid will, was, and verbs ending in \-ed, which indicate that text isn't in the present tense.

**Examples**  
DO:  
*The new device shows up in the device list.*  
DON´T:  
*The new device will show up in the device list.*

### Mood of verbs {#mood-of-verbs}

Use direct verbs and avoid the usage of modal verbs (may, might, should, could) whenever possible.

* For most content, write simple statements of facts.  
* Use direct commands for procedures and instructions.   
* Avoid expressing wishes, hypotheses, and suggestions by using modal verbs (*can*, *may*, *might*, *should*, *could*).

**Examples**  
DO:  
*Do not use hyphens.*  
DON´T:  
*Hyphens should not be used.*

### Voice of verbs {#voice-of-verbs}

Voice is either active or passive. Keep it active whenever you can.

* In active voice, the subject of the sentence performs the action.  
* In passive voice, the subject is the receiver of the action.

Use active voice whenever possible. Avoid using passive voice when it is not necessary.

**Examples**  
DO:  
*Click **OK** to save your changes.*

DON´T:  
*Changes will be saved by clicking **OK**.*

Exceptional cases where you can use passive voice are:

* to prevent condescending text or blaming of the reader,  
* to avoid awkward sentence constructions, or  
* to emphasize the receiver of the action


# Punctuation  {#punctuation}

## Simple sentence structure {#simple-sentence-structure}

* Stick to short, simple sentences. Sentences that contain lots of punctuation tend to be complex and hard to read.  
* A sentence that contains a semicolon might be complex. Try to rewrite the sentence as multiple sentences or break it into a list.   
* End all sentences with a period, even if they're only two words.  
* Use exclamation points sparingly. Save them for when they count.  
* Use question marks sparingly. Customers expect us to give them answers.

## Serial commas {#serial-commas}

In a series of three or more items, use a comma before the final and or or to avoid potentially changing the meaning of the sentence. This comma is called a serial comma or an Oxford comma.

**Examples**  
DO:  
*Widgets can display maps, images, graphs, tables, and other graphic representations of data.*   
DON´T:  
*Widgets can display maps, images, graphs, tables and other graphic representations of data.*

## Punctuation in bulleted lists {#punctuation-in-bulleted-lists}

* Include a colon at the end of a phrase that directly introduces a list.  
* If all list elements are short phrases (three words or fewer), don’t end them with periods.   
* If one or more list elements are complete sentences, use a period after every element, even if a list element contains three or fewer words.

[Learn more](#punctuation-in-bulleted-lists).

## End punctuation {#end-punctuation}

Skip end punctuation on titles, headings, subheadings, UI titles, and items in a list that are three or fewer words. Save the periods for paragraphs and text bodies.

# Terminology & spelling {#terminology-&-spelling}

This section comprises a collection of terminology and spelling standards that are used in Cumulocity documentation. There may be variations to these rules; however, for Cumulocity documentation, the rules listed in this section should be followed.

## Abbreviations {#abbreviations}

Be careful with the following abbreviations, which might not be familiar to non-native speakers and are often mixed up.

Instead of *e.g.,* use

* *for example \-* This phrase is always followed by a comma. If the phrase is not at the beginning of a sentence or preceded by a bracket or a hyphen, it is also preceded by a comma.  
* *such as* \- This phrase is an alternative to "for example". There is no comma after this phrase.

Instead of *i.e.*, use

* *that is*, *that means \-* This phrase is always followed by a comma.

Instead of *etc.*, use

* *and so on* \- This phrase is preceded by a comma. Do not combine this phrase with "for example", but choose either one.

## Acronyms {#acronyms}

Although some acronyms are widely understood and preferred to the spelled-out term, others aren’t well known or are familiar only to a specific group of customers. These tips will help you use acronyms and abbreviations in a way that’s clear and meaningful.

* Always spell out Cumulocity product and feature names.  
* Only use acronyms that your audience is familiar with. If you’re sure your audience is familiar with an acronym, it’s OK to use it without spelling it out.  
* For most acronyms, spell out the term first and include the acronym in parentheses. On subsequent mentions, you can use the acronym without spelling it out.  
* Lowercase all words in the spelled-out form of an acronym except for proper nouns.

## Data types {#data-types}

In general, data types are not capitalized:

* string  
* integer  
* float  
* varchar  
* double  
* timestamp  
* enum  
* date  
* number

Only exception:

* Boolean \- which is always capitalized.

Within code blocks, the spelling is not so strict, depending on programming languages that are not case-sensitive.

## File types {#file-types}

When referring to file types, the file type is always capitalized.

**Examples**

* JSON  
* ZIP  
* HTML

Alternatively, use a wildcard (asterisk).

**Examples**

* \*.json  
* \*.zip  
* \*.html

## Proper nouns {#proper-nouns}

Consider the correct and consistent spelling of proper nouns. If you are unsure about the spelling, refer to the respective manufacturer's website.

For the following items, follow this spelling:

* Actility LoRa  
* Bootstrap  
* Docker  
* Dockerfile  
* Docker container  
* Karaf  
* LoRa  
* LWM2M  
* MQTT  
* OPC UA  
* SCADA  
* SELinux  
* SmartREST  
* WebSocket

## Variables {#variables}

In the Cumulocity documentation, we use variables (html short codes) for certain terms (for example, product names and company names).

The following terms, for example,  are replaced by variables throughout the documentation:

| Term | Short code |
| :---- | :---- |
| **Cumulocity** (company name) | {{\< company-c8y \>}} |
| **Cumulocity** (product name) | {{\< product-c8y-iot \>}} |
| **Cumulocity OpenAPI Specification** | {{\< openapi \>}} |

Follow the exact notation of the short code. The complete list of shortcodes can be found in the repository:

[https://github.com/Cumulocity-IoT/c8y-docs/tree/develop/themes/c8ydocs/layouts/shortcodes](https://github.com/Cumulocity-IoT/c8y-docs/tree/develop/themes/c8ydocs/layouts/shortcodes)

We do not replace any instances of "cumulocity" in software file names like *cumulocity.json*, in links to examples or resources in GitHub, in module names like *com.apama.cumulocity.Measurement*, and in general in the code if it is not simply a sample name (or an example for a domain name).

**Note:** For technical reasons, variables cannot be used in titles and in the help content in the frontmatter of several Markdown files.

## Word list {#word-list}

**abort**  
Avoid in general usage. Instead, use words like stop, exit, cancel, or end.

**add**  
Used for creating a new object of a specific type and adding it to a list or object.  
In the Cumulocity UI *add* usually refer to the process of *creating* and then *adding* in one combined step. For clear first-create-then-add mechanisms use *create*, followed by *add*.

**application, app**  
In general, when referring to applications in the documentation, use the full form “application” and do not shorten it to "app".  
When referring to the Cumulocity default applications, only the application name is capitalized:

* Administration application  
* Cockpit application  
* Device Management application

If "app" is part of the product name, it must not be modified. We recommend that you follow the spelling of the product name.  
Examples:

* Sensor App  
* EPL App

**application switcher**  
UI element. Area where you can switch between all available applications. Not capitalized or highlighted in bold.

**back end, back-end**  
Don't use if you can substitute a more specific term, such as server, operating system, database, or network.  
Two words as a noun. Hyphenate as an adjective.

**blacklist**  
Never use *blacklist*. Use *blocklist* instead.

**Boolean**  
Always capitalize. See also [Data types](#data-types).

**cancel**  
To halt an operation or process and return to the prior state.  
*Cancel all pending operations.*  
Use *cancel the selection* instead of *deselect* or *unmark*. Use *clear* to refer to checkboxes.  
Spell *canceled* and *canceling* with one “l”, but spell cancellation with two “l's”.

**chapter**  
Since the Cumulocity documentation isn't in the form of a book, don't use the term *chapter*. Instead, refer to *section* or *documentation*. See also *guide*.

**checkbox**  
Use *checkbox*, not *box* or *check box*, to refer to a *checkbox* in UI.   
Use *select* and *clear* with checkboxes, not *turn on* and *turn off*, or *check* and *uncheck*.

**choose**  
For UI elements, use *select* instead.

**clear**  
To remove content from a "container" (such as a file or field) without deleting the container itself.   
*Clear log file*  
Not to be mixed up with *delete* or *remove*.  
Do not use clear, if from a user perspective an object is deleted.  
Use *clear* when referring to “unselecting” checkboxes*.*

**click**  
When the environment is a desktop with a mouse, use click for most targets, such as buttons, links, list items, and radio buttons. Don't use *click on*.  
DO: Click OK.  
DON´T: Click on OK.

**click here**  
Do not use. Avoid vague link texts. Refer to the heading of the link target instead.

**clone**  
Do not use. Use *duplicate* instead.  
Exception: *Clone a repository*

**complete**  
To finalize a process:   
*Could not complete the operation*  
Do not use *finish* instead.

**context menu**  
UI element. Used for menus with additional commands that show up when you click the menu icon.

**create**  
Used to refer to the process of creating an object from scratch.  
*Application has been created*  
This term is often used synonymous to *add*, since the object is usually created and added in one step.  
Do not use *generate*.

**data broker**  
Cumulocity component. Don´t capitalize.

**data point**  
Cumulocity component. To words. Don´t capitalize.

**data point library**  
Cumulocity component. Don´t capitalize.

**delete**  
To remove an object permanently and remove it from a list.  
*User has been deleted*

**dialog or dialog box (dialog window)**  
UI element. Secondary window showing up to retrieve user input. For dialog boxes use the following notation:  
*In the resulting dialog box…*

If the dialog box has a name, add the name:  
*In the **Edit user** dialog box.*

**double-click**  
To press and release a mouse button twice in rapid succession.  
*Double-click to add points and set the area*  
Always spelled with a hyphen.

**dropdown list, box, field**  
UI element. Refers to fields with selection lists.  
Note the spelling of "dropdown" without a hyphen.

**duplicate**  
To create a second instance of an object to be used as a "template" for a new instance.  
*Duplicate smart rule*  
Do not use *clone*.

**e.g.**  
Don't use. Use *for example* or *such as* as appropriate. See also [Abbreviations](#abbreviations).

**email**  
In Cumulocity software and documentation, use email without a hyphen.  
*email address, email settings*

**enter**  
For example, typing something into a text box.  
*Enter your password*

**etc.**  
Don't use. Instead be specific. When space is limited, use *such as* or *lik*e followed by an example or two.

**execute**  
Verb commonly used to refer to function calls, SQL queries, and other processes. When the meaning is the same, use the simpler word *run* instead. If you need to use a more precise term for your context, use that term.

**finish**  
Do not use. Use *complete* instead.

**generate**  
Do not use. Use *create* instead.

**guide**  
Don't use. Instead, refer to *documentation* or *section*. See also *chapter*.

**icon**  
UI element. Refers to a comprehensible symbol, representing an object or a command. Icons are spelled in small letters. When referring to a specific icon, write the icon name followed by *icon*, for example, *menu icon*. Do **not** use "symbol" instead.

**ID**  
Always capitalize if not used in code.

**index**  
When referring to *index* in the plural, use the plural *indexes* (as opposed to *indices*) as *indexes* is widely accepted.

**lifecycle**  
One word. Not *life cycle* or *life-cycle*.

**login/log in**  
Two words as a verb, one word as an adjective and a noun. Don't hyphenate.  
*Log in to the platform*

**Login screen**  
Via the Login screen, you access the Cumulocity platform. *Login screen* is always spelled with a capitalized "L" and not formatted or highlighted in any way:  
*On the Login screen, enter your username (case-sensitive) and password.*

**menu**  
UI element. Refers to the main sections in the navigator, or to context menus.

**menu item**  
UI element. Subentry of a menu. Always highlighted in bold.  
<i>**Alarms** menu item</i>

**must**  
Use *must* in instructions if it is mandatory to provide a value or use certain characters.  
*The name must be unique.*  
Do not use *should* for anything that is mandatory.

**navigator**  
UI element. Refers to the main menu on the left in the Cumulocity platform UI. Do not capitalize.

**page**  
UI element. Refers to what is displayed on the right, that is, actually the main area of the application.

**please**  
Do not use *please* in instructions, even if you explain a difficult task.  
Use *configure the settings,* and not *please configure the settings*.  
Don't use the phrase *please note*.  
Exception: When the instruction is directly addressing the user and referring to their account. *Please contact the Support team.*

**pre (prefix)**  
Words with the prefix *pre* do not use a hyphen.  
Examples:

* *predefined*  
* *prefilled*  
* *preset*

Exceptions:

* If *pre* is followed by numbers: *pre-10.11.0*  
* If *pre* is followed by a word with a capital letter: *pre-Cumulocity*

**press**  
To press and release a keyboard key.  
*Press CTRL/CMD+C to copy*

**real time, real-time (and realtime)**  
Two words as a noun. Hyphenate as an adjective.  
In the Cumulocity UI *realtime* is used instead of *real-time*. Must be discussed.

**recommend**  
If you want to give recommendations to the reader, use the phrase “We recommend you to".  
*We recommend you to enter a description.*

However, do not use "you" in recommendations when there is a direct object instead of a verb.  
*We recommend the usage of OAuth authentication.*

**release**  
When referring to the different release types, the release type is capitalized, while "release" itself is spelled with small letters.

* *Yearly release*  
* *Maintenance release*  
* *GA release*

**remove**  
Remove an object from a list without deleting it permanently.  
*Device removed from group*

**right drawer**  
UI element. Refers to the area at the right which is hidden per default.  
Clicking the **User** button at the very right of the top bar unhides the right drawer.

**runtime**  
As a noun, spelled in one word as opposed to compile time, build time.

**save**  
To store data that has been provided through adding or editing objects.  
Prefer *save* to *store* in the UI.  
*Inventory role saved*

**select**  
Use in the context of selecting an entry from a dropdown list, menu of choice in the UI.  
*Select a device type*  
Use in the context of selecting a checkbox. Do not use *check* when referring to selecting a checkbox.  
Prefer *select* to *choose* in the UI.

**setup, set up**  
Use as a verb to describe the process of preparing hardware and installed apps for initial use. Two words as a verb, one word as an adjective and a noun. Don't hyphenate.

**should**  
Use *should* if an instruction is just a recommendation rather than referring to mandatory input. Otherwise, avoid and use *must* instead.

**slider**  
UI element. Used to switch seamlessly between multiple values. Do not use interchangeably with "toggle", as they describe two different screen elements.

**state/status**  
Use *state* to describe an ongoing process or one step in a process.   
Use *status* to describe the result of an operation.

**sub (prefix)**  
Nouns with the prefix *sub* do not use a hyphen.  
Examples:

* *subasset*  
* *subtenant*  
* *subgroup*

The only exception is the noun *sub-user*, which is spelled with a hyphen for better readability.

**successfully**  
Avoid using *successfully* in messages like *Created/updated/deleted successfully* where it is usually redundant.  
*Device connected*  
*Application deleted*  
On some occasions, it might be meaningful though, that is, in a bulk process which might have been completed successfully or with some errors.

**tab**  
UI element. Some pages, for example, the page of any particular device,  
are divided into several tabs, either displayed vertically or horizontally.

**tenants**  
When referring to tenant types, the tenant type is capitalized, while "tenant" itself is spelled with small letters.

* *Standard tenant*  
* *Enterprise tenant*  
* *Management tenant*

**Thin Edge**  
Cumulocity component. Capitalied. No hyphen.

**toggle**  
UI element. Used to switch between two values. Usually these values are "on" and "off":  
*Activate/deactivate the auto-scroll functionality by switching the **Auto-scroll** toggle on/off.*  
Note that a slider in contrast, allows you to switch seamlessly between multiple values, see above.

**top bar**  
UI element. Area at the top where the page title and several buttons are displayed.

**top menu bar**  
UI element. Area below the top bar where additional commands are displayed, if any.

**username**  
Spelled in one word. Do not use *user name*.

**website**  
Spelled in one word. Do not use *web site*.\</td\>


# Organization {#organization}

Structural elements are an important means for visually organizing documentation. The following section gives an overview of the most common elements used in Cumulocity documentation.

## Headings {#headings}

Headings are used to structure documents into meaningful units.

In the Cumulocity documentation, we distinguish up to five structural levels:

* Level 1 and 2 \- refer to major sectors and sections, reflected as tiles on the website, and are not used within the markdown files.  
* Level 3 \- refers to major paragraphs in a document.   
* Level 4, 5 \- reflect subsections within paragraphs.

Heading levels 3 to 5 are indicated by hashtags (for example, \#\#\#)  in the markdown document.

If you need a deeper structuring level, use bold formatting instead.

## Tables {#tables}

Tables help to present several items and their description or other parameters clearly, especially if you want to provide longer descriptions, present more than two items, or several additional parameters per item. Be aware that tables are usually not mobile-friendly due to the small display.

In tables, we use bold formatting for the header only.  
 (see section on \[Formatting \> Bold\](/styleguide/formatting/\#bold)).

![][image1]

### Workaround for Markdown {#workaround-for-markdown}

Setting the column width in Markdown tables does not reliably work, which might result in bad line breaks. In such cases, tables need to be formatted using HTML.

When formatting tables in HTML, the columns can be individually adjusted to fit the displayed text. To adjust the width, change the percentage of the respective column. The total of all percentages must always be 100%.

For tables with only two columns, the recommended width division is 20:80.

## Bulleted list {#bulleted-list}

Bulleted lists, in contrast to [tables](https://docs.google.com/document/d/1OoH9glh-qen4PtH80tCGeAtrYrT85V4c/edit?pli=1#heading=h.6hv1dn1bn6fn), can be used to present a list of items with no or only short explanations.

Avoid using more than seven items in a list, since this leads to an overload of information. Better use a table instead, then.

Include a colon at the end of a phrase that directly introduces a list.

**Examples**

The following information is shown for each device:

* Device name specified in the registration process  
* Status of the device  
* Creation date  
* Tenant from which the device was registered

### Capitalization in bulleted lists {#capitalization-in-bulleted-lists}

Begin each item in a list with a capital letter, see example above.

Exception: If the item is always lowercase, like a command.

**Examples**

* \`error\` is the error message.  
* \`exception\` specifies the exception that was raised.  
* \`message\` is a description of the exception message.

### Punctuation in bulleted lists {#punctuation-in-bulleted-lists-1}

* Include a colon at the end of a phrase that directly introduces a list.  
* If one or more list elements complete the introductory phrase preceding the colon, use a period after every list element.   
* If all list elements are short phrases (three words or fewer), don’t end them with periods, even if they form a complete sentence together with the list introduction.   
* If one or more list elements are complete sentences, use a period after every element, even if a list element contains three or fewer words.

If possible, phrase the introductory sentence as a complete sentence, as in the first example below.

**Examples**

You can select one of the following options for the customization of the home dashboard:

* It is reflected throughout the entire tenant (the default).  
* It is only reflected in the current custom application.  
* It is only reflected in the current user. Note that this user then needs CREATE permission for the permission type "Inventory".

The following sections describe:

* How to link SIMs and mobile devices.  
* Which information is shown in the **Connectivity** tab.  
* How to manage connectivity from the Device Management application.

### Hyphens in bulleted lists {#hyphens-in-bulleted-lists}

Hyphens within bulleted lists may be used to add definitions to terms or fields. The first word after the hyphen should always be lowercase unless it is a proper noun.

Punctuation rules for bulleted lists apply here as well.

**Example**

The following parameters can be specified:

* Title \- cookie banner title  
* Text \- cookie banner text with a general statement on the cookie usage and the use cases for it  
* Link to privacy policy \- a link to the page with the privacy policy

## Numbered lists {#numbered-lists}

Numbered lists are used to present several steps the user needs to follow to perform a specific task, see [Procedures and instructions](#procedures-and-instructions).

## Code blocks {#code-blocks}

In the developer documentation, many programming code examples are used. These examples are represented by code blocks. For details, see [Code](#code).


# Procedures and instructions {#procedures-and-instructions}

This section describes how procedures and instructions are written in the Cumulocity documentation.

Follow these guidelines to create clear, easy-to-follow instructions, whether you're writing simple, single-step procedures or complex procedures consisting of multiple steps.

## Heading {#heading}

In general, procedure descriptions start with a heading of the form "To do xyz".

**Examples**

* To create a subgroup  
* To add a widget  
* To delete a device type

## Single-step procedures {#single-step-procedures}

Do **not** use a number if the procedure has just one step. Use a bullet instead.

**Examples**

* To edit a device protocol, click on the protocol or click the menu icon at the right of the row and then click **Edit**.

## Multi-step procedures {#multi-step-procedures}

Procedures are presented in numbered lists if they consist of more than one step.

**Examples**

1\. In the navigator, click a group to open it.  
2\. Click **Add group** at the top-right.  
3\. In the resulting dialog box, enter a name for the subgroup and click **Add**.

If a procedure consists of more than seven steps, split it into meaningful units.

## Results {#results}

Ideally, procedures end with a short description of the result. The result itself is not part of a list of instruction steps and must be written below.

**Examples**

1\. Select a device from the device list and open it.  
2\. In the **Info** tab, scroll down to the **Groups assignment** card.

You can now see the different groups assigned to your device.

## Location {#location}

Make sure the user knows where the action should take place before you describe the action.

If there’s a chance of confusion, provide an introductory step.

## Instructions for filling in forms {#instructions-for-filling-in-forms}

Instructions for filling in forms are also provided as numbered lists.

**Examples**

1. Click **Add configuration snapshot** at the right of the top menu bar.   
2. In the resulting dialog box, enter a unique name and an optional description for the configuration.   
3. Enter a device type. The device type can be found in the **Info** tab of the target device.   
4. Specify the configuration snapshot file by either uploading it from the file system, specifying a URL from where the firmware can be obtained or choosing a file.  
5. Click **Add** to add your configuration.

If the label of a field is self-explaining, you don´t have to explicitly mention  
it:

**Examples**

DO:  
In the resulting dialog box, enter a unique name and an optional description for the configuration.

DON´T:  
In the resulting dialog box, enter a unique name in the **Name** field. In the **Description** field, enter an optional description for the configuration.

If the user must configure a larger number of parameters, and you have to provide detailed explanations on each parameter, we recommend that you use a table instead of a numbered list, starting with a phrase such as "Complete the following fields:".


# Formatting {#formatting}

Practically anything that is different from regular body text can function as an emphasis technique, for example, italics, bold, caps, different size type, alternate fonts, color and more. Used in excess though, any emphasis technique or combination of emphasis techniques can lose their ability to emphasize and become busy and distracting.

The standards below aim at using as much highlighting as necessary but as little as possible. Avoid double-highlighting a term with two or more techniques.

**Examples**  
DO:  
SHARED  
DON´T:  
**SHARED**  
“SHARED”  
or even **“SHARED”**

The following section introduces the main formatting components used in the Cumulocity documentation. Following these instructions helps to make documentation easy to read and to understand.


## Quick reference of formatting standards in the Cumulocity documentation {#quick-reference-of-formatting-standards-in-the-cumulocity-documentation}

| Item | Formatting | Example |
| :---- | :---- | :---- |
| Buttons with label | Bold, **not** followed by “button” | Click **Delete** |
| Buttons without label (icons-only) | Bold, followed by “button” | **Search** button |
| Code elements | Inline code | \`c8y\_supportedOperations\` |
| Field names | Bold | **Device ID** field |
| File names | Italics | These parameters are configured in the file *database.txt*. |
| Icons (not represented as buttons) | No special formatting, but often followed by the icon as image, see [Icons](https://docs.google.com/document/d/1OoH9glh-qen4PtH80tCGeAtrYrT85V4c/edit?pli=1#heading=h.yy5xvalleedt). | menu icon |
| Menu items (in the navigator or in a context menu) | Bold | **Audit logs New group** |
| Menu names | Bold | **Ecosystem** menu |
| Tab/page names | Bold | **Info** tab |
| URLs | Italics | *https://cumulocity.com/docs* |
| User input | Double quotes | Enter "measurements" in the **Menu label** field. |
| Values in fields | Double quotes | If you increase the time range the value in the **Aggregation** field will automatically switch to "hourly" or "daily". |

## Headings {#headings-1}

### Heading levels {#heading-levels}

In the Cumulocity documentation 5 heading levels are distinguished, see [Structural elements \> Headings](https://docs.google.com/document/d/1OoH9glh-qen4PtH80tCGeAtrYrT85V4c/edit?pli=1#heading=h.e165p5yiefcy).

The actual formatting of headings, such as different fonts, large type sizes, or even color is automatically assigned through a CSS stylesheet and is therefore not subject here.

### Capitalization in headings {#capitalization-in-headings}

In headings we use sentence capitalization, that is, only the first word is capitalized.

**Examples**  
DO:  
*To add a device*  
DON´T:  
*To Add a Device*

## Bold {#bold}

Bold is used in the following cases:

| Use case | Description | Example |
| :---- | :---- | :---- |
| UI labels for fields, menus, pages, tabs | Used for all field, page or tab names, or similar labels. | In the **Group assignment** section of the **Info** tab, select a group from the dropdown list and click **Add to group**. |
| Buttons | Used for buttons that initiate commands. | Click **Delete** to delete the item from the list. |
| Context menu items | Used for menu items that initiate commands or open screens/windows. | In the dropdown menu, click **Execute for whole group**. |
| Menu names, menu items | Used for menus, menu items in the navigator. | **Ecosystem Data explorer** |
| Column headings | Used for the header row of a table. |  |
| Simple emphasis | Use for simple emphasis within a sentence only if you feel that this is really required. | Do **not** turn off the computer before shutting it down. |

## Italics {#italics}

Italics is used in the following cases:

| Use case | Description | Example |
| :---- | :---- | :---- |
| File names, folder names | When referencing a file or a folder.  | These parameters are configured in the file *database.txt*. |
| URLs | When referencing a URL in a document | *https://cumulocity.com/docs* |
| Document titles | As used in references to certain guides | For details, see the *Apama user guide*. |

## Quotes {#quotes}

Quotes are used in the following cases:

| Use case | Example |
| :---- | :---- |
| Values in fields | If you increase the time range the value in the **Aggregation** field will automatically switch to "hourly" or "daily". |
| User input | If you enter "Users", only lines including the term "Users" will appear in the returned log information.  |
| Screen and error messages | The following message will appear: "Truncated data. Change aggregation or select shorter date range." |
| Non-literal usage | The tooltip will "snap" to the closest measurement. |

## All caps {#all-caps}

All caps is used in the following cases:

| Use case | Example |
| :---- | :---- |
| Alarms | CRITICAL, MAJOR, MINOR, WARNING |
| Permissions | READ, CREATE, UPDATE |
| States | SUCCESSFUL, FAILED, EXECUTING, PENDING |

There might be more similar cases, not explicitly listed here.

## Notes {#notes}

Special notes are used to emphasize information that is of special interest. This can be additional information that needs to be emphasized or important information. In Markdown, special notes are implemented by using admonitions.

Throughout the Cumulocity documentation, we frequently use  **Info**, **Important**, and **Requirements**. The special note **Caution** may also be used on occasion.

**Examples**

Notation for an info admonition:

{{ \<c8y-admon-info \>}}  
When you apply a snapshot configuration from one device to another, the configuration may contain data that is device-specific.  
{{ \</c8y-admon-info \>}}

## Code {#code}

In the developer documentation, many programming code examples are shown, represented by code blocks. These code blocks may visualize various programming languages.

To ensure that the highlighting follows the rules of the related language, specify the language code to be used for highlighting.

This is done by adding 3 back ticks before and after each code block, for example:

  \`\`\`java  
  String str \= "Hello World";  
  System.out.println(str);

  if(\!false) {  
      return true;  
  }    
  \`\`\`

The following language codes might be useful:

| Language | Code |
| :---- | :---- |
| Bash scripts | bash |
| CSS | css |
| CSV | text |
| C\# | cs |
| C/C++ | cpp |
| Docker | docker |
| Docker compose | yaml |
| HTTP, REST request/response | http |
| HTML | html |
| Java | java |
| Javascript | js |
| JSON | json |
| LUA | lua |
| Markdown | markdown |
| Nginx | nginx |
| Properties file i.e. pairs as \`key=value\` | properties |
| Python | python |
| Rust | rust |
| Sass, Less | sass |
| Shell commands and terminal outputs | shell |
| SQL dialects | sql |
| TypeScript | ts |
| XML | xml |
| YAML | yaml |

If no language code is specified, the plugin will make a "best guess" which  
highlighting has to be applied.

### Inline code {#inline-code}

Code formatting can also be used within a text. This is often the case for code elements (parameters, variables), especially when explaining a code example shown in a code block following or preceding the text.

To use inline code formatting, bracket the code text with "\`".

**Examples**  
The \\\`create()\\\` method returns a managed object.

## Workaround for Markdown limitations {#workaround-for-markdown-limitations}

If you want to use particular special characters in Markdown it might be required to mask them with the respective HTML code or entity to avoid weird layout behavior. You may also mask HTML code in plain text using a backslash.

## Links {#links}

Links are an important means in online documentation, as they navigate the user straightforward to the necessary information at any point in the documentation. In Markdown, links can be built using Markdown or HTML notation, see below.

In general, the link text just consists of the target heading it points to. It is not required to add the whole path, as this is indicated by breadcrumbs on the target page.

To introduce a reference link, use one of:

*  "For details", or "For more information"  
*  "see", "see also", "refer to"

We are not too strict here, but try to keep it simple.

### Building links {#building-links}

Links consist of two parts:

\- The text that is visible to the user in the documentation.  
\- The URL where the link points to.

**Examples**

Markdown format:  
\[Working with reports\](/cockpit/working-with-reports/).

HTML format:  
\<a href="/cockpit/working-with-reports/"\>Working with reports\</a\>

Links within the documentation are always relative links.  Do not use absolute links preceeded by the base URL "https://cumulocity.com/docs". Relative links allow versioning. The version information will automatically be added from the *config.toml*.

If you link to a URL outside of the Cumulocity documentation you must of course add the entire URL.

### Building links for images {#building-links-for-images}

Links for images in Markdown consist of two parts. The first part, in square brackets, is visible to the user in case the image is not shown correctly. It is also used as a description of the image for visually impaired users.

The second part is the actual link to the image in the repository which is written in regular brackets. The link must include the image format.   
\!\[Metatext\](/images/guide-name/image-name.png)

Links for images in HTML also consist of two parts. Here, the first part contains the actual link to the image in the repository while the second part shows the metatext.

To build image links in HTML use the following notation:

\<img src="/images/guide-name/image-name.png" alt="Metatext"\>

Use the HTML notation to integrate images in HTML tables.

## Icons {#icons}

Icons are small UI components representing different UI functionalities, that are shown throughout the documentation as small images. Different than buttons, icons do not have a visible name in the UI, the name only becomes clear through hovering over the icon. When referencing icons in the documentation, they must always be preceded by the name of the icon

There are two types of icon libraries available for the documentation website:

* The Delite c8y icon library (only supports a single color) – the prefix is “dlt-c8y-icon”.  
* The c8y-icon library (supports two colors) – the prefix is “c8y-icon”.

Each icon has a specific CSS class name that must be applied to make the icon visible, for example:

* \<i class="dlt-c8y-icon-settings"\>\</i\> for the settings icon  
* \<i class="c8y-icon c8y-icon-cockpit""\>\</i\> for the cockpit icon

All icons are available in the [Cumulocity Codex](https://styleguide.cumulocity.com/apps/codex/#/icons/icons/overview#search-icons). Here you can filter and search through different categories of icons to find their respective name. For the icons on the "Platform" category, you must add “c8y-icon-” as a prefix, for all other categories, use “dlt-c8y-icon-”.

### Color {#color}

To change the color of an icon, you must add one more class:

* text-danger \- will make it red, for example:   
  \<i class="dlt-c8y-icon-refresh text-danger"\>\</i\>  
* text-warning \- will make it orange, for example:  
  \<i class="dlt-c8y-icon-refresh text-warning"  
* text-success \- will make it green, for example:   
  \<i class="dlt-c8y-icon-refresh text-success"\>\</i\>  
* text-info \- will make it blue, for example:   
  \<i class="dlt-c8y-icon-refresh text-info"\>\</i\>  
* text-primary \- will make it teal like the brand color, for example:   
  \<i class="dlt-c8y-icon-refresh text-primary"\>\</i\>  
* text-muted \- will make it gray, for example:   
  \<i class="dlt-c8y-icon-refresh text-muted"\>\</i\>

### Size {#size}

By default, icons inherit the font size of the text where it is contained. To make it larger, you must use one more class, for example:

\<i class="dlt-c8y-icon-refresh icon-20"\>\</i\> \<\!-- icon size 20px \--\>  
\<i class="dlt-c8y-icon-refresh icon-32"\>\</i\> \<\!-- icon size 32px \--\>

For details, see the [Cumulocity Codex](https://styleguide.cumulocity.com/apps/codex/#/icons/icons/overview#search-icons).

### Example {#example}

To put it all together, the following example shows how to put together the specific CSS class names for the delete icon. The delete icon needs:

* Icon name \- \`dlt-c8y-icon-editing-trash\`  
* Color \- \`text-danger\`  
*  Size \- \`icon-20\`

Final result:

\<i class="dlt-c8y-icon-editing-trash text-danger icon-20"\>\</i\>

### Most commonly used icons throughout the documentation {#most-commonly-used-icons-throughout-the-documentation}

| Icon name | HTML code | Preview |
| :---- | :---- | :---- |
| Delete | \<i class="dlt-c8y-icon-editing-trash text-danger icon-20"\>\</i\> |  |
| Edit | \<i class="dlt-c8y-icon-edit1 text-primary icon-20"\>\</i\> |  |
| Filter | \<i class="dlt-c8y-icon-filter icon-20"\>\</i\> |  |
| Menu | \<i class="dlt-c8y-icon-menu-vertical text-muted icon-20"\>\</i\> |  |
| Remove | \<i class="dlt-c8y-icon-minus-circle text-danger icon-20"\>\</i\> |  |
| Search | \<i class="dlt-c8y-icon-search icon-20"\>\</i\> |  |
| Sort | \<i class="dlt-c8y-icon-sort-arrow icon-20"\>\</i\> |  |
| Switcher | \<i class="dlt-c8y-icon-app-switcher icon-20"\>\</i\> |  |
| Warning | \<i class="dlt-c8y-icon-warning text-warning icon-20"\>\</i\> |  |
