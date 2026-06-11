---
weight: 9
title: Smart function editor
layout: bundle
outputs:
  - html
  - json
sector:
  - device_management
---

The smart function editor allows you to view and edit the smart function for the current rule. For a full reference on writing smart functions, including the API and examples, see [Smart functions](/data-preparation/smart-functions/).

### Smart function editor visibility {#code-editor-visibility}

The code editor is minimized by default when a rule is first created. It opens automatically when the AI assistant creates your smart function. 

Alternatively, the layout of the editor can be manually adjusted to suit your workflow:

- Click the **Maximize code editor** icon to expand the code editor to full height, covering the test data panel.
- Click the **Show input** icon to reveal the test data panel again.
- Drag the resize handle at the top edge of the code editor to adjust its height.

### Editing code {#editing-code}

The AI assistant automatically updates the code in the editor each time it edits or refines the smart function. You can also edit the code directly in the editor at any time. 

Use the **Undo** or **Redo** buttons above the code editor to step backward or forward through your recent edits.

Click the **Save draft** or **Save and deploy** button to save your code. See [To save or deploy a rule](/data-preparation/rule-creation-management/#save-deploy-rule) for more information.

To get an explanation of the current code, click **Explain code**. The AI assistant responds in the chat with a description of what the smart function does.
